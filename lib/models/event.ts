import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../mongodb';

export interface EventDocument {
  _id?: ObjectId;
  title: string;
  date: Date;
  location: string;
  description: string;
  image?: string;
  additionalImages?: string[];
  category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
  additionalLink?: {
    url: string;
    text: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  image?: string;
  additionalImages?: string[];
  category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
  additionalLink?: {
    url: string;
    text: string;
  };
}

const COLLECTION_NAME = 'events';

export async function getEventsCollection() {
  const { db } = await connectToDatabase();
  return db.collection<EventDocument>(COLLECTION_NAME);
}

export function eventDocumentToEvent(doc: EventDocument): Event {
  // Ensure date is a Date object
  let eventDate = doc.date;
  if (!(eventDate instanceof Date)) {
    eventDate = new Date(eventDate);
  }
  
  return {
    id: doc._id?.toString() || '',
    title: doc.title,
    date: eventDate,
    location: doc.location,
    description: doc.description,
    image: doc.image,
    additionalImages: doc.additionalImages,
    category: doc.category,
    additionalLink: doc.additionalLink,
  };
}

export function eventToEventDocument(event: Omit<Event, 'id'>): Omit<EventDocument, '_id' | 'createdAt' | 'updatedAt'> {
  return {
    title: event.title,
    date: event.date,
    location: event.location,
    description: event.description,
    image: event.image,
    additionalImages: event.additionalImages,
    category: event.category,
    additionalLink: event.additionalLink,
  };
}
