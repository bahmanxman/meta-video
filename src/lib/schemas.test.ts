import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseActions } from './mockDatabase';
import {
  mediaPackageSchema,
  parseMediaPackageFormData,
  submitMediaPackageForm,
} from './schemas';

function buildValidFormData(
  overrides: Partial<Record<string, FormDataEntryValue>> = {},
): FormData {
  const formData = new FormData();

  formData.set('title', 'Der Klassiker — Extended Highlights');
  formData.set('matchName', 'Bayern München vs Borussia Dortmund');
  formData.set('price', '525.5');
  formData.set('videoUrl', 'blob:http://localhost/preview-123');

  for (const [key, value] of Object.entries(overrides)) {
    if (value === null) {
      formData.delete(key);
    } else {
      formData.set(key, value);
    }
  }

  return formData;
}

describe('mediaPackageSchema', () => {
  it('accepts valid package input', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Der Klassiker — Extended Highlights',
      matchName: 'Bayern München vs Borussia Dortmund',
      price: '525.5',
      videoUrl: 'blob:http://localhost/preview-123',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(525.5);
      expect(result.data.title).toContain('Klassiker');
    }
  });

  it('rejects a title shorter than five characters', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Der',
      matchName: 'Bayern vs Dortmund',
      price: '10',
      videoUrl: 'blob:preview',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title?.[0]).toMatch(
        /title must be at least 5 characters/i,
      );
    }
  });

  it('rejects an empty match name', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Valid Title Here',
      matchName: '',
      price: '10',
      videoUrl: 'blob:preview',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.matchName?.[0]).toMatch(
        /match name is required/i,
      );
    }
  });

  it('rejects prices below one euro', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Valid Title Here',
      matchName: 'Bayern vs Dortmund',
      price: '0',
      videoUrl: 'blob:preview',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.price?.[0]).toMatch(
        /price must be at least/i,
      );
    }
  });

  it('rejects missing video preview handles', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Valid Title Here',
      matchName: 'Bayern vs Dortmund',
      price: '25',
      videoUrl: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.videoUrl?.[0]).toMatch(
        /video preview is required/i,
      );
    }
  });

  it('coerces non-numeric price strings into validation failures', () => {
    const result = mediaPackageSchema.safeParse({
      title: 'Valid Title Here',
      matchName: 'Bayern vs Dortmund',
      price: 'not-a-number',
      videoUrl: 'blob:preview',
    });

    expect(result.success).toBe(false);
  });
});

describe('parseMediaPackageFormData', () => {
  it('parses valid FormData entries', () => {
    const parsed = parseMediaPackageFormData(buildValidFormData());

    expect(parsed.success).toBe(true);
  });

  it('returns field errors for invalid FormData entries', () => {
    const parsed = parseMediaPackageFormData(
      buildValidFormData({ title: 'Bad' }),
    );

    expect(parsed.success).toBe(false);
  });

  it('treats missing FormData keys as validation failures', () => {
    const formData = new FormData();
    const parsed = parseMediaPackageFormData(formData);

    expect(parsed.success).toBe(false);
  });
});

describe('submitMediaPackageForm', () => {
  beforeEach(() => {
    databaseActions.reset();
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('new-asset-uuid');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns flattened field errors when validation fails', async () => {
    const result = await submitMediaPackageForm(
      { success: false },
      buildValidFormData({ title: 'Bad' }),
    );

    expect(result.success).toBe(false);
    expect(result.errors?.title?.[0]).toMatch(/title must be at least 5 characters/i);
  });

  it('inserts a valid asset and returns success', async () => {
    const initialCount = databaseActions.getAll().length;

    const result = await submitMediaPackageForm(
      { success: false },
      buildValidFormData(),
    );

    expect(result.success).toBe(true);
    expect(databaseActions.getAll()).toHaveLength(initialCount + 1);

    const inserted = databaseActions.getById('new-asset-uuid');
    expect(inserted).toMatchObject({
      id: 'new-asset-uuid',
      title: 'Der Klassiker — Extended Highlights',
      matchName: 'Bayern München vs Borussia Dortmund',
      price: 525.5,
      videoUrl: 'blob:http://localhost/preview-123',
      thumbnailUrl: '/thumbnails/bundesliga-placeholer.png',
      events: [],
    });
    expect(inserted?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
