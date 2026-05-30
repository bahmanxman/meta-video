import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { databaseActions } from '@/lib/mockDatabase';
import type { VideoAsset } from '@/lib/types';

export const mediaPackageSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters'),
  matchName: z.string().min(1, 'Match name is required'),
  price: z.coerce.number().min(1, 'Price must be at least €1'),
  videoUrl: z.string().min(1, 'A video preview is required'),
});

export type MediaPackageInput = z.infer<typeof mediaPackageSchema>;

export type MediaPackageFormState = {
  success: boolean;
  errors?: Partial<Record<keyof MediaPackageInput, string[]>>;
};

export function parseMediaPackageFormData(formData: FormData) {
  return mediaPackageSchema.safeParse({
    title: formData.get('title'),
    matchName: formData.get('matchName'),
    price: formData.get('price'),
    videoUrl: formData.get('videoUrl'),
  });
}

export async function submitMediaPackageForm(
  _prevState: MediaPackageFormState,
  formData: FormData,
): Promise<MediaPackageFormState> {
  const parsed = parseMediaPackageFormData(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const asset: VideoAsset = {
    id: crypto.randomUUID(),
    title: parsed.data.title,
    matchName: parsed.data.matchName,
    price: parsed.data.price,
    videoUrl: parsed.data.videoUrl,
    date: new Date().toISOString().slice(0, 10),
    thumbnailUrl: '/thumbnails/placeholder.jpg',
    events: [],
  };

  databaseActions.insert(asset);
  revalidatePath('/');

  return { success: true };
}
