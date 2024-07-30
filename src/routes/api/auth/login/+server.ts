import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/database';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email or password is missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    throw redirect(303, '/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
