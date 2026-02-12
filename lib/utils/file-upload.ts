import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const EVENTS_IMAGE_DIR = join(process.cwd(), 'public', 'events');

export async function ensureEventsDirectory(): Promise<void> {
  if (!existsSync(EVENTS_IMAGE_DIR)) {
    await mkdir(EVENTS_IMAGE_DIR, { recursive: true });
  }
}

export async function saveEventImage(file: File): Promise<string> {
  await ensureEventsDirectory();
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const extension = originalName.split('.').pop() || 'jpg';
  const filename = `${timestamp}-${originalName}`;
  
  const filepath = join(EVENTS_IMAGE_DIR, filename);
  await writeFile(filepath, buffer);
  
  // Return relative path for database storage
  return `/events/${filename}`;
}

export async function deleteEventImage(imagePath: string): Promise<void> {
  if (!imagePath || !imagePath.startsWith('/events/')) {
    return; // Safety check
  }
  
  const filename = imagePath.replace('/events/', '');
  const filepath = join(EVENTS_IMAGE_DIR, filename);
  
  if (existsSync(filepath)) {
    try {
      await unlink(filepath);
    } catch (error) {
      console.error(`Failed to delete image ${filepath}:`, error);
    }
  }
}

export async function saveMultipleEventImages(files: File[]): Promise<string[]> {
  const paths: string[] = [];
  for (const file of files) {
    const path = await saveEventImage(file);
    paths.push(path);
  }
  return paths;
}
