// src/hooks.server.ts

import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';
import { createSession, getSession } from '$lib/session';

export const handle: Handle = async ({ event, resolve }) => {
  // Declare and initialize `session` before using it
  const session = getSession(event.request.headers.get('cookie'));

  if (session && session.userId) {
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [session.userId]);

    if (userResult.rowCount > 0) {
      event.locals.user = userResult.rows[0];
    }
  }

  const response = await resolve(event);

  if (session) {
    response.headers.append('Set-Cookie', createSession(session));
  }

  return response;
};
