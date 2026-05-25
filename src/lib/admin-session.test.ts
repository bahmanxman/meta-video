import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  isAdminSessionValid,
} from './admin-session';

describe('admin-session', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-24T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('exports the admin session cookie name', () => {
    expect(ADMIN_SESSION_COOKIE).toBe('admin_session');
  });

  describe('createAdminSessionValue', () => {
    it('creates a signed token that passes validation', async () => {
      const token = await createAdminSessionValue();

      expect(token.split('.')).toHaveLength(2);
      expect(await isAdminSessionValid(token)).toBe(true);
    });
  });

  describe('isAdminSessionValid', () => {
    it('returns false for undefined, empty, or malformed values', async () => {
      expect(await isAdminSessionValid(undefined)).toBe(false);
      expect(await isAdminSessionValid('')).toBe(false);
      expect(await isAdminSessionValid('not-a-valid-token')).toBe(false);
      expect(await isAdminSessionValid('12345')).toBe(false);
    });

    it('returns false when the session has expired', async () => {
      const token = await createAdminSessionValue();

      vi.setSystemTime(new Date('2026-05-26T12:00:00Z'));

      expect(await isAdminSessionValid(token)).toBe(false);
    });

    it('returns false when the signature is tampered with', async () => {
      const token = await createAdminSessionValue();
      const [exp, signature] = token.split('.');
      const tampered = `${exp}.${signature?.slice(0, -1)}0`;

      expect(await isAdminSessionValid(tampered)).toBe(false);
    });
  });
});
