/**
 * One-off migration (JS version): upload existing event/member images from public/ to Vercel Blob
 * and update MongoDB with the new blob URLs.
 *
 * Prerequisites: BLOB_READ_WRITE_TOKEN and MONGODB_URI in .env
 * Run: node scripts/migrate-images-to-blob.js
 */

const { config } = require('dotenv');
const path = require('path');

// Load .env from project root
config({ path: path.resolve(process.cwd(), '.env') });

const { readFile } = require('fs/promises');
const { existsSync } = require('fs');
const { join } = require('path');
const { put } = require('@vercel/blob');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../lib/mongodb');

const BLOB_URL_MARKER = 'blob.vercel-storage.com';

function isBlobUrl(url) {
  return typeof url === 'string' && url.includes(BLOB_URL_MARKER);
}

function toPublicPath(pathOrUrl) {
  const relative = (pathOrUrl || '').replace(/^\//, '');
  return join(process.cwd(), 'public', relative);
}

async function migrateImageToBlob(localPath, blobPathname) {
  const buffer = await readFile(localPath);
  // Buffer is accepted by @vercel/blob as body
  const blob = await put(blobPathname, buffer, {
    access: 'public',
    addRandomSuffix: true,
  });
  return blob.url;
}

async function run() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Missing BLOB_READ_WRITE_TOKEN in .env');
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  const { db } = await connectToDatabase();
  const eventsCollection = db.collection('events');
  const membersCollection = db.collection('members');

  // Events
  const events = await eventsCollection.find({}).toArray();
  let eventsUpdated = 0;
  let eventsSkipped = 0;
  let eventsFailed = 0;

  for (const event of events) {
    const id = String(event._id || '');
    let image = event.image;
    let additionalImages = Array.isArray(event.additionalImages) ? event.additionalImages.slice() : [];
    let changed = false;

    if (image && !isBlobUrl(image)) {
      const filePath = toPublicPath(image);
      if (existsSync(filePath)) {
        try {
          const base = image.split('/').pop() || 'image.jpg';
          const pathname = `events/migrated/${id}-main-${base}`;
          image = await migrateImageToBlob(filePath, pathname);
          changed = true;
        } catch (err) {
          console.error(`Event ${id} main image failed:`, err);
          eventsFailed++;
        }
      } else {
        console.warn(`Event ${id}: file not found ${filePath}`);
        eventsSkipped++;
      }
    }

    const newAdditional = [];
    for (let i = 0; i < additionalImages.length; i++) {
      const url = additionalImages[i];
      if (isBlobUrl(url)) {
        newAdditional.push(url);
        continue;
      }
      const filePath = toPublicPath(url);
      if (existsSync(filePath)) {
        try {
          const base = url.split('/').pop() || 'image.jpg';
          const pathname = `events/migrated/${id}-${i}-${base}`;
          const blobUrl = await migrateImageToBlob(filePath, pathname);
          newAdditional.push(blobUrl);
          changed = true;
        } catch (err) {
          console.error(`Event ${id} additional image ${i} failed:`, err);
          eventsFailed++;
          newAdditional.push(url);
        }
      } else {
        console.warn(`Event ${id} additional ${i}: file not found ${filePath}`);
        newAdditional.push(url);
      }
    }

    additionalImages = newAdditional;

    if (changed) {
      await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { image, additionalImages, updatedAt: new Date() } }
      );
      eventsUpdated++;
    }
  }

  console.log(`Events: ${eventsUpdated} updated, ${eventsSkipped} skipped (file not found), ${eventsFailed} failed.`);

  // Members
  const members = await membersCollection.find({}).toArray();
  let membersUpdated = 0;
  let membersSkipped = 0;
  let membersFailed = 0;

  for (const member of members) {
    const id = String(member._id || '');
    let image = member.image;

    if (!image || image.startsWith('/placeholder') || isBlobUrl(image)) {
      continue;
    }

    const filePath = toPublicPath(image);
    if (!existsSync(filePath)) {
      console.warn(`Member ${id}: file not found ${filePath}`);
      membersSkipped++;
      continue;
    }

    try {
      const base = image.split('/').pop() || 'image.jpg';
      const pathname = `members/migrated/${id}-${base}`;
      const blobUrl = await migrateImageToBlob(filePath, pathname);
      await membersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { image: blobUrl, updatedAt: new Date() } }
      );
      membersUpdated++;
    } catch (err) {
      console.error(`Member ${id} image failed:`, err);
      membersFailed++;
    }
  }

  console.log(`Members: ${membersUpdated} updated, ${membersSkipped} skipped (file not found), ${membersFailed} failed.`);
  console.log('Migration finished.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

