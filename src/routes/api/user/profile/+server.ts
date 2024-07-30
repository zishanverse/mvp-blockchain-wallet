// src/routes/api/user/profile/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/database';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    const userId = locals.user?.id;

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = rows[0];

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
