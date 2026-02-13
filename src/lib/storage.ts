/**
 * Supabase Storage helpers – upload images and return public URLs.
 *
 * Requires a public bucket called "portfolio-images" in your Supabase project.
 * See supabase-storage.sql for the bucket + policy setup.
 */
import { supabase } from './supabase';

const BUCKET = 'portfolio-images';

/**
 * Upload a file to Supabase Storage and return its public URL.
 * @param file  The File object from an <input type="file">
 * @param folder  Sub-folder inside the bucket (e.g. "experience", "education")
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'png';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage by its public URL.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  // Extract path from the public URL
  // URL format: https://<project>.supabase.co/storage/v1/object/public/portfolio-images/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // Not a storage URL, skip

  const filePath = publicUrl.slice(idx + marker.length);
  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
  if (error) console.warn('Failed to delete image:', error.message);
}
