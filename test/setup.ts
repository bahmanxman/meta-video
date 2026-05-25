import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@/src/app/actions', async () => {
  const { submitMediaPackageForm } = await import('../src/lib/schemas');

  return {
    createMediaPackage: submitMediaPackageForm,
  };
});
