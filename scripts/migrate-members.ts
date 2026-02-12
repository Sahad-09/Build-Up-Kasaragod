/**
 * Migration script to migrate hardcoded members to MongoDB
 * Run with: npx tsx scripts/migrate-members.ts
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env') });

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('✗ Error: MONGODB_URI is not set in environment variables');
    process.exit(1);
}

const DB_NAME = 'build-up-kasaragod';
const COLLECTION_NAME = 'members';

// Hardcoded members data
const hardcodedMembers = [
    // Patrons
    {
        name: "Mr. Abdul Khader Saleem",
        position: "Chief Patron",
        image: "/chiefPatron.jpeg",
        fallback: "AKS",
        category: "Patron" as const,
        order: 0,
    },
    {
        name: "Shri KV Madhusudanan",
        position: "Patron",
        image: "/patron-01.jpg",
        fallback: "MA",
        category: "Patron" as const,
        order: 1,
    },
    {
        name: "Mr. M T P Mohammed Kunhi",
        position: "Patron",
        image: "/patron-02.jpg",
        fallback: "KM",
        category: "Patron" as const,
        order: 2,
    },
    // Core Team
    {
        name: "Dr. Sheikh Bava",
        position: "President",
        image: "/president.png",
        fallback: "SB",
        category: "Core Team" as const,
        order: 0,
    },
    {
        name: "Dr. Rashmi Prakash",
        position: "General Secretary",
        image: "/generalSecretary.png",
        fallback: "RP",
        category: "Core Team" as const,
        order: 1,
    },
    {
        name: "Mr. Anoop K",
        position: "Treasurer",
        image: "/treasurer.jpeg",
        fallback: "AK",
        category: "Core Team" as const,
        order: 2,
    },
    // Vice Presidents
    {
        name: "Mrs. C. K. Zulekha Mahin",
        position: "Vice President",
        image: "/vicePresident-01.jpeg",
        fallback: "ZM",
        category: "Vice President" as const,
        order: 0,
    },
    {
        name: "Mr. Dayakara R. K.",
        position: "Vice President",
        image: "/vicePresident-02.png",
        fallback: "DRK",
        category: "Vice President" as const,
        order: 1,
    },
    {
        name: "Mr. Abdul Nassir N. A.",
        position: "Vice President",
        image: "/vicePresident-03.png",
        fallback: "AN",
        category: "Vice President" as const,
        order: 2,
    },
    {
        name: "Mr. Rafeek",
        position: "Vice President",
        image: "/vicePresident-04.png",
        fallback: "R",
        category: "Vice President" as const,
        order: 3,
    },
];

async function migrateMembers() {
    let client: MongoClient | null = null;

    try {
        console.log('Connecting to MongoDB...');
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('✓ Connected to MongoDB');

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Check if members already exist
        const existingCount = await collection.countDocuments();
        console.log(`Found ${existingCount} existing members in database`);

        if (existingCount > 0) {
            console.log('\n⚠️  Warning: Database already contains members.');
            console.log('This migration will add new members but may create duplicates.');
            console.log('Consider clearing the collection first if you want a fresh start.\n');
        }

        console.log(`\nMigrating ${hardcodedMembers.length} members...\n`);

        const now = new Date();
        let successCount = 0;
        let skipCount = 0;

        for (const member of hardcodedMembers) {
            // Check if member with same name already exists
            const existing = await collection.findOne({
                name: member.name,
            });

            if (existing) {
                console.log(`⊘ Skipped: "${member.name}" (already exists)`);
                skipCount++;
                continue;
            }

            // Prepare member document
            const memberDoc = {
                ...member,
                createdAt: now,
                updatedAt: now,
            };

            // Insert member
            await collection.insertOne(memberDoc);
            console.log(`✓ Migrated: "${member.name}" (${member.category})`);
            successCount++;
        }

        console.log('\n' + '='.repeat(50));
        console.log('Migration Summary:');
        console.log(`  ✓ Successfully migrated: ${successCount}`);
        console.log(`  ⊘ Skipped (duplicates): ${skipCount}`);
        console.log(`  Total members in database: ${await collection.countDocuments()}`);
        console.log('='.repeat(50));

        console.log('\n✓ Migration completed successfully!');

    } catch (error) {
        console.error('\n✗ Migration failed:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('\n✓ Database connection closed');
        }
    }
}

// Run migration
migrateMembers().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
