// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/auth'; // Ensure this path is correct

export const handle: Handle = async ({ event, resolve }) => {
  const authHeader = event.request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const user = await verifyToken(token); // Your token verification logic
      event.locals.user = user; // Populate locals.user with user info
    } catch (err) {
      console.error('Invalid token', err);
    }
  }

  return resolve(event);
};
