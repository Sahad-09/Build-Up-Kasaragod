'use server';

import { getEventsCollection, eventDocumentToEvent } from '../models/event';

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

export async function getPublicEvents(): Promise<Event[]> {
  try {
    const collection = await getEventsCollection();
    const events = await collection.find({}).sort({ date: -1 }).toArray();
    return events.map(eventDocumentToEvent);
  } catch (error) {
    console.error('Error fetching public events:', error);
    return [];
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const collection = await getEventsCollection();
    const events = await collection
      .find({ date: { $gte: now } })
      .sort({ date: 1 })
      .toArray();
    
    return events.map(eventDocumentToEvent);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

export async function getPastEvents(): Promise<Event[]> {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const collection = await getEventsCollection();
    const events = await collection
      .find({ date: { $lt: now } })
      .sort({ date: -1 })
      .toArray();
    
    return events.map(eventDocumentToEvent);
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
}
