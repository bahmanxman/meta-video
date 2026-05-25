import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@/app/actions', async () => {
  const { submitMediaPackageForm } = await import('@/lib/schemas');

  return {
    createMediaPackage: submitMediaPackageForm,
  };
});
