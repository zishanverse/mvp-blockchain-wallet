import { parse, serialize } from 'cookie';

const secret = 'my_super_secret'; // Use a strong, secure secret

export function createSession(data: Record<string, any>) {
  const serializedData = JSON.stringify(data);
  const base64Data = Buffer.from(serializedData).toString('base64');
  const signedData = `${base64Data}.${sign(base64Data)}`;
  return serialize('session', signedData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export function getSession(cookieHeader: string | null) {
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  const sessionCookie = cookies['session'];
  if (!sessionCookie) return null;

  const [base64Data, signature] = sessionCookie.split('.');
  if (signature !== sign(base64Data)) return null;

  const data = Buffer.from(base64Data, 'base64').toString('utf-8');
  return JSON.parse(data);
}

function sign(data: string) {
  // Simple HMAC-like signing function
  return Buffer.from(data + secret).toString('base64');
}
