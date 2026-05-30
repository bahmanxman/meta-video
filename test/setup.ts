import fs from 'node:fs';
import path from 'node:path';

import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';

const testDbPath = path.join(process.cwd(), 'test', '.tmp', 'videos.json');

process.env.MOCK_DB_PATH = testDbPath;

beforeEach(() => {
  fs.mkdirSync(path.dirname(testDbPath), { recursive: true });

  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});

afterEach(() => {
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/app/actions', async () => {
  const { submitMediaPackageForm } = await import('@/lib/schemas');

  return {
    createMediaPackage: submitMediaPackageForm,
  };
});
