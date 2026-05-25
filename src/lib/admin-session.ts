export const ADMIN_SESSION_COOKIE = 'admin_session';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    'dev-admin-secret-change-in-production'
  );
}

async function signPayload(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function createAdminSessionValue(): Promise<string> {
  const exp = String(Date.now() + SESSION_TTL_MS);
  const signature = await signPayload(exp);
  return `${exp}.${signature}`;
}

export async function isAdminSessionValid(
  value: string | undefined,
): Promise<boolean> {
  if (!value) {
    return false;
  }

  const [expStr, signature] = value.split('.');

  if (!expStr || !signature) {
    return false;
  }

  const exp = Number(expStr);

  if (Number.isNaN(exp) || exp < Date.now()) {
    return false;
  }

  const expectedSignature = await signPayload(expStr);
  return signature === expectedSignature;
}
