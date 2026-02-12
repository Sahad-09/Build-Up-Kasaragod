/**
 * Migration script to migrate hardcoded events to MongoDB
 * Run with: npx tsx scripts/migrate-events.ts
 * Or: npm run migrate:events (if script is added to package.json)
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
    console.error('Please set MONGODB_URI in your .env file');
    process.exit(1);
}

// Extract database name from URI or use default
const DB_NAME = 'build-up-kasaragod';
const COLLECTION_NAME = 'events';

// Hardcoded events data (matching the structure from the codebase)
const hardcodedEvents = [
    {
        title: "Paddy cultivation done under BUK Agricultural Division to promote organic farming.",
        date: new Date(2023, 5, 15), // June 15, 2023
        location: "BUK Agricultural Division",
        description: "Promoting organic farming through paddy cultivation under the BUK Agricultural Division.",
        category: "Agriculture" as const,
        image: "/id-0.jpg",
        additionalImages: ["/id-0_02.jpg"],
    },
    {
        title: "BUK Help Desk activities during Covid",
        date: new Date(2023, 8, 22), // September 22, 2023
        location: "BUK Help Desk",
        description: "During Covid, the Help Desk provided various services such as oxygen cylinders, PPE & medical kits, food kits, etc.",
        category: "Community" as const,
        image: "/id-1.jpg",
        additionalImages: [],
    },
    {
        title: "Paper Seed Pen Project for Endosulfan affected Victims in Enmakaje Panchayath",
        date: new Date(2023, 9, 22), // October 22, 2023
        location: "Enmakaje Panchayath",
        description: "A project to support Endosulfan affected victims in Enmakaje Panchayath through Paper Seed Pens.",
        category: "Community" as const,
        image: "/id-2.jpeg",
        additionalImages: [],
    },
    {
        title: "Free Medical Camps in Bela Kumbale & Manjeshwar",
        date: new Date(2023, 10, 5), // November 5, 2023
        location: "Bela Kumbale & Manjeshwar",
        description: "Free medical camps conducted to provide health services in Bela Kumbale and Manjeshwar.",
        category: "Health" as const,
        image: "/id-3.jpg",
        additionalImages: [],
    },
    {
        title: "Seminar on 'Effects of Drug Abuse on Youths' with Narcotics Control Bureau",
        date: new Date(2022, 5, 26), // June 26, 2022
        location: "Kasaragod Government College",
        description: "A seminar on drug abuse effects on youths, with an essay writing competition for students.",
        category: "Education" as const,
        image: "/id-4.jpeg",
        additionalImages: ["/id-4_02.jpg"],
    },
    {
        title: "BUK Karshaka Puraskaram 2022",
        date: new Date(2022, 8, 25), // September 25, 2022
        location: "Majibail Bank Hall, Manjeshwar",
        description: "A felicitation ceremony for 25 farmers of Kasaragod District.",
        category: "Agriculture" as const,
        image: "/id-5.jpg",
        additionalImages: ["/id-5_02.jpeg", "/id-5_03.jpeg", "/id-5_04.jpeg"],
    },
    {
        title: "World Environment Day Plantation",
        date: new Date(2023, 5, 5), // June 5, 2023
        location: "Various Locations",
        description: "Participated in World Environment Day with plantation activities.",
        category: "Community" as const,
        image: "/id-6.jpeg",
        additionalImages: [],
    },
    {
        title: "Various Seminars & Workshops",
        date: new Date(2023, 6, 1), // July 1, 2023
        location: "Various Locations",
        description: "A series of seminars and workshops conducted both virtually and physically, including topics such as Nano Enterprises, Financial Literacy, and AI tools for education.",
        category: "Education" as const,
        image: "/id-7.png",
        additionalImages: [],
    },
    {
        title: "Seminar on Scope of Household Enterprises without License",
        date: new Date(2024, 1, 18), // February 18, 2024
        location: "Kasaragod",
        description: "Seminar focusing on the scope of household enterprises without a license.",
        category: "Community" as const,
        image: "/id-8.jpg",
        additionalImages: [],
    },
];

async function migrateEvents() {
    let client: MongoClient | null = null;

    try {
        console.log('Connecting to MongoDB...');
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('✓ Connected to MongoDB');

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Check if events already exist
        const existingCount = await collection.countDocuments();
        console.log(`Found ${existingCount} existing events in database`);

        if (existingCount > 0) {
            console.log('\n⚠️  Warning: Database already contains events.');
            console.log('This migration will add new events but may create duplicates.');
            console.log('Consider clearing the collection first if you want a fresh start.\n');
        }

        console.log(`\nMigrating ${hardcodedEvents.length} events...\n`);

        const now = new Date();
        let successCount = 0;
        let skipCount = 0;

        for (const event of hardcodedEvents) {
            // Check if event with same title and date already exists
            const existing = await collection.findOne({
                title: event.title,
                date: event.date,
            });

            if (existing) {
                console.log(`⊘ Skipped: "${event.title}" (already exists)`);
                skipCount++;
                continue;
            }

            // Prepare event document
            const eventDoc = {
                ...event,
                createdAt: now,
                updatedAt: now,
            };

            // Insert event
            await collection.insertOne(eventDoc);
            console.log(`✓ Migrated: "${event.title}"`);
            successCount++;
        }

        console.log('\n' + '='.repeat(50));
        console.log('Migration Summary:');
        console.log(`  ✓ Successfully migrated: ${successCount}`);
        console.log(`  ⊘ Skipped (duplicates): ${skipCount}`);
        console.log(`  Total events in database: ${await collection.countDocuments()}`);
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
migrateEvents().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
