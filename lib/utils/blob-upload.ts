import { put, del } from '@vercel/blob';

const BLOB_URL_PREFIX = 'blob.vercel-storage.com';

export async function uploadBlob(
  file: File,
  folder: 'events' | 'members' | 'agm-reports'
): Promise<string> {
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const extension = originalName.split('.').pop() || 'jpg';
  const pathname = `${folder}/${timestamp}-${originalName}`;

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function uploadMultipleBlobs(
  files: File[],
  folder: 'events'
): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const url = await uploadBlob(file, folder);
    urls.push(url);
  }
  return urls;
}

export function isBlobUrl(urlOrPath: string): boolean {
  return urlOrPath.includes(BLOB_URL_PREFIX);
}

export async function deleteBlob(urlOrPath: string): Promise<void> {
  if (!urlOrPath || !isBlobUrl(urlOrPath)) {
    return;
  }
  try {
    await del(urlOrPath);
  } catch (error) {
    console.error(`Failed to delete blob ${urlOrPath}:`, error);
  }
}
