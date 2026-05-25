'use server';

import {
  submitMediaPackageForm,
  type MediaPackageFormState,
} from '@/lib/schemas';

export async function createMediaPackage(
  prevState: MediaPackageFormState,
  formData: FormData,
): Promise<MediaPackageFormState> {
  return submitMediaPackageForm(prevState, formData);
}
