/**
 * One-off migration: upload existing event/member images from public/ to Vercel Blob
 * and update MongoDB with the new blob URLs.
 *
 * Prerequisites: BLOB_READ_WRITE_TOKEN and MONGODB_URI in .env
 * Run: npm run migrate:blob
 */

import { config } from 'dotenv';
import { resolve, join } from 'path';

// Load .env from project root BEFORE any lib imports that read process.env
config({ path: resolve(process.cwd(), '.env') });

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { put } from '@vercel/blob';
import { ObjectId } from 'mongodb';

const BLOB_URL_MARKER = 'blob.vercel-storage.com';

function isBlobUrl(url: string): boolean {
  return url.includes(BLOB_URL_MARKER);
}

function toPublicPath(pathOrUrl: string): string {
  const relative = pathOrUrl.replace(/^\//, '');
  return join(process.cwd(), 'public', relative);
}

async function migrateImageToBlob(
  localPath: string,
  blobPathname: string
): Promise<string> {
  const buffer = await readFile(localPath);
  const blob = await put(blobPathname, buffer, {
    access: 'public',
    addRandomSuffix: true,
  });
  return blob.url;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Missing BLOB_READ_WRITE_TOKEN in .env');
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  const { connectToDatabase } = await import('../lib/mongodb');
  const { db } = await connectToDatabase();
  const eventsCollection = db.collection('events');
  const membersCollection = db.collection('members');

  const events = await eventsCollection.find({}).toArray();
  let eventsUpdated = 0;
  let eventsSkipped = 0;
  let eventsFailed = 0;

  for (const event of events) {
    const id = (event._id as ObjectId).toString();
    let image = event.image as string | undefined;
    let additionalImages = (event.additionalImages as string[] | undefined) || [];
    let changed = false;

    if (image && !isBlobUrl(image)) {
      const filePath = toPublicPath(image);
      if (existsSync(filePath)) {
        try {
          const pathname = `events/migrated/${id}-main-${image.split('/').pop() || 'image.jpg'}`;
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

    const newAdditional: string[] = [];
    for (let i = 0; i < additionalImages.length; i++) {
      const url = additionalImages[i];
      if (isBlobUrl(url)) {
        newAdditional.push(url);
        continue;
      }
      const filePath = toPublicPath(url);
      if (existsSync(filePath)) {
        try {
          const pathname = `events/migrated/${id}-${i}-${url.split('/').pop() || 'image.jpg'}`;
          const blobUrl = await migrateImageToBlob(filePath, pathname);
          newAdditional.push(blobUrl);
          changed = true;
        } catch (err) {
          console.error(`Event ${id} additional image ${i} failed:`, err);
          eventsFailed++;
        }
      } else {
        console.warn(`Event ${id} additional ${i}: file not found ${filePath}`);
        newAdditional.push(url);
      }
    }
    additionalImages = newAdditional;

    if (changed) {
      await eventsCollection.updateOne(
        { _id: event._id },
        { $set: { image, additionalImages, updatedAt: new Date() } }
      );
      eventsUpdated++;
    }
  }

  console.log(`Events: ${eventsUpdated} updated, ${eventsSkipped} skipped (file not found), ${eventsFailed} failed.`);

  const members = await membersCollection.find({}).toArray();
  let membersUpdated = 0;
  let membersSkipped = 0;
  let membersFailed = 0;

  for (const member of members) {
    const id = (member._id as ObjectId).toString();
    let image = member.image as string;

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
      const pathname = `members/migrated/${id}-${image.split('/').pop() || 'image.jpg'}`;
      const blobUrl = await migrateImageToBlob(filePath, pathname);
      await membersCollection.updateOne(
        { _id: member._id },
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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
