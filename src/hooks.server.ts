// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('session');
  
  if (sessionToken) {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE session_token = $1', [sessionToken]);
      const user = rows[0];
      if (user) {
        event.locals.user = user;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const response = await resolve(event);
  return response;
};
