import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/app/actions', async () => {
  const { submitMediaPackageForm } = await import('@/lib/schemas');

  return {
    createMediaPackage: submitMediaPackageForm,
  };
});
