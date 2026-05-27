'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
} from '@/lib/admin-session';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

export type LoginFormState = {
  success: boolean;
  errors?: string[];
};

export async function loginAdmin(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return {
      success: false,
      errors: ['Invalid username or password.'],
    };
  }

  const sessionValue = await createAdminSessionValue();
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect('/admin');

  return { success: true };
}
