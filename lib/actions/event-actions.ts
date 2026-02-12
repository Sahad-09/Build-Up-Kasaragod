'use server';

import { ObjectId } from 'mongodb';
import { getEventsCollection, eventDocumentToEvent, eventToEventDocument } from '../models/event';
import { requireAuth } from '../auth';
import { saveEventImage, saveMultipleEventImages, deleteEventImage } from '../utils/file-upload';
import { revalidatePath } from 'next/cache';

export interface CreateEventData {
  title: string;
  date: string; // ISO date string
  location: string;
  description: string;
  category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
  image?: File | null;
  additionalImages?: File[];
  additionalLink?: {
    url: string;
    text: string;
  };
}

export async function createEvent(formData: FormData): Promise<{ success: boolean; error?: string; eventId?: string }> {
  try {
    await requireAuth();

    const title = formData.get('title') as string;
    const dateStr = formData.get('date') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
    const imageFile = formData.get('image') as File | null;
    const additionalLinkUrl = formData.get('additionalLinkUrl') as string | null;
    const additionalLinkText = formData.get('additionalLinkText') as string | null;

    // Validation
    if (!title || !dateStr || !location || !description || !category) {
      return { success: false, error: 'All required fields must be filled' };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid date' };
    }

    // Handle image upload (optional; fails on serverless/production where filesystem is read-only)
    let imagePath: string | undefined;
    if (imageFile && imageFile.size > 0) {
      try {
        imagePath = await saveEventImage(imageFile);
      } catch (imageError) {
        console.error('Image upload failed (event will be saved without image):', imageError);
        // Continue without image so event creation still succeeds
      }
    }

    // Handle additional images (same: optional in production)
    let additionalImagesPaths: string[] | undefined;
    const additionalImagesFiles: File[] = [];
    let index = 0;
    while (true) {
      const file = formData.get(`additionalImage${index}`) as File | null;
      if (!file || file.size === 0) break;
      additionalImagesFiles.push(file);
      index++;
    }
    if (additionalImagesFiles.length > 0) {
      try {
        additionalImagesPaths = await saveMultipleEventImages(additionalImagesFiles);
      } catch (imageError) {
        console.error('Additional images upload failed:', imageError);
      }
    }

    // Prepare event data
    const eventData = {
      title,
      date,
      location,
      description,
      category,
      image: imagePath,
      additionalImages: additionalImagesPaths,
      additionalLink: additionalLinkUrl && additionalLinkText
        ? { url: additionalLinkUrl, text: additionalLinkText }
        : undefined,
    };

    const collection = await getEventsCollection();
    const now = new Date();
    const result = await collection.insertOne({
      ...eventToEventDocument(eventData),
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath('/events');
    revalidatePath('/admin');

    return { success: true, eventId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating event:', error);
    const message = error instanceof Error ? error.message : 'Failed to create event';
    // In development, surface the real error; in production keep it generic
    const userMessage = process.env.NODE_ENV === 'development'
      ? `Failed to create event: ${message}`
      : 'Failed to create event. Check server logs and ensure MONGODB_URI is set in production.';
    return { success: false, error: userMessage };
  }
}

export async function updateEvent(
  eventId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(eventId)) {
      return { success: false, error: 'Invalid event ID' };
    }

    const title = formData.get('title') as string;
    const dateStr = formData.get('date') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
    const imageFile = formData.get('image') as File | null;
    const deleteExistingImage = formData.get('deleteExistingImage') === 'true';
    const additionalLinkUrl = formData.get('additionalLinkUrl') as string | null;
    const additionalLinkText = formData.get('additionalLinkText') as string | null;

    // Validation
    if (!title || !dateStr || !location || !description || !category) {
      return { success: false, error: 'All required fields must be filled' };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid date' };
    }

    const collection = await getEventsCollection();
    const existingEvent = await collection.findOne({ _id: new ObjectId(eventId) });

    if (!existingEvent) {
      return { success: false, error: 'Event not found' };
    }

    // Handle image upload (optional in production; filesystem may be read-only)
    let imagePath: string | undefined = existingEvent.image;

    try {
      if (deleteExistingImage && existingEvent.image) {
        await deleteEventImage(existingEvent.image);
        imagePath = undefined;
      }

      if (imageFile && imageFile.size > 0) {
        if (existingEvent.image) await deleteEventImage(existingEvent.image);
        imagePath = await saveEventImage(imageFile);
      }
    } catch (imageError) {
      console.error('Event image update failed (keeping existing):', imageError);
    }

    const additionalImagesFiles: File[] = [];
    let index = 0;
    while (true) {
      const file = formData.get(`additionalImage${index}`) as File | null;
      if (!file || file.size === 0) break;
      additionalImagesFiles.push(file);
      index++;
    }

    let additionalImagesPaths = existingEvent.additionalImages || [];
    if (additionalImagesFiles.length > 0) {
      try {
        if (existingEvent.additionalImages) {
          for (const oldImage of existingEvent.additionalImages) {
            await deleteEventImage(oldImage);
          }
        }
        additionalImagesPaths = await saveMultipleEventImages(additionalImagesFiles);
      } catch (imageError) {
        console.error('Additional images update failed:', imageError);
      }
    }

    // Prepare update data
    const updateData = {
      title,
      date,
      location,
      description,
      category,
      image: imagePath,
      additionalImages: additionalImagesPaths.length > 0 ? additionalImagesPaths : undefined,
      additionalLink: additionalLinkUrl && additionalLinkText
        ? { url: additionalLinkUrl, text: additionalLinkText }
        : undefined,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    );

    revalidatePath('/events');
    revalidatePath(`/events/${eventId}`);
    revalidatePath('/admin');

    return { success: true };
  } catch (error) {
    console.error('Error updating event:', error);
    return { success: false, error: 'Failed to update event' };
  }
}

export async function deleteEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(eventId)) {
      return { success: false, error: 'Invalid event ID' };
    }

    const collection = await getEventsCollection();
    const event = await collection.findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    // Delete associated images (best-effort; fails on serverless read-only FS)
    try {
      if (event.image) await deleteEventImage(event.image);
      if (event.additionalImages) {
        for (const image of event.additionalImages) await deleteEventImage(image);
      }
    } catch (imageError) {
      console.error('Event image delete failed (event will still be removed):', imageError);
    }

    await collection.deleteOne({ _id: new ObjectId(eventId) });

    revalidatePath('/events');
    revalidatePath('/admin');

    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: 'Failed to delete event' };
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    await requireAuth();

    const collection = await getEventsCollection();
    const events = await collection.find({}).sort({ date: -1 }).toArray();
    return events.map(eventDocumentToEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    if (!ObjectId.isValid(eventId)) {
      return null;
    }

    const collection = await getEventsCollection();
    const event = await collection.findOne({ _id: new ObjectId(eventId) });
    
    return event ? eventDocumentToEvent(event) : null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Import Event type for return type
import type { Event } from '../models/event';
