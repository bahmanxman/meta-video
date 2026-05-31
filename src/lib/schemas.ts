import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { databaseActions } from '@/lib/mockDatabase';
import type { VideoAsset } from '@/lib/types';

const matchEventTypeSchema = z.enum([
  'GOAL',
  'YELLOW_CARD',
  'RED_CARD',
  'SUBSTITUTION',
  'HIGHLIGHT',
]);

const timecodeEventSchema = z.object({
  id: z.string(),
  timestampSeconds: z.number(),
  formattedTimecode: z.string(),
  type: matchEventTypeSchema,
  description: z.string(),
  team: z.string().optional(),
});

export const mediaPackageSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters'),
  matchName: z.string().min(1, 'Match name is required'),
  price: z.coerce.number().min(1, 'Price must be at least €1'),
  videoUrl: z.string().min(1, 'A video preview is required'),
  events: z.array(timecodeEventSchema).default([]),
});

export type MediaPackageInput = z.infer<typeof mediaPackageSchema>;

export type MediaPackageFormState = {
  success: boolean;
  errors?: Partial<Record<keyof MediaPackageInput, string[]>>;
};

function parseEventsFromFormData(
  value: FormDataEntryValue | null,
): unknown {
  if (typeof value !== 'string' || value.trim() === '') {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function parseMediaPackageFormData(formData: FormData) {
  return mediaPackageSchema.safeParse({
    title: formData.get('title'),
    matchName: formData.get('matchName'),
    price: formData.get('price'),
    videoUrl: formData.get('videoUrl'),
    events: parseEventsFromFormData(formData.get('events')),
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
    thumbnailUrl: '/thumbnails/bundesliga-placeholer.png',
    events: parsed.data.events,
  };

  databaseActions.insert(asset);
  revalidatePath('/');

  return { success: true };
}
