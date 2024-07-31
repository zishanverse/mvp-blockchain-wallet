import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '$lib/database';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = Object.fromEntries(await request.formData()) as { email: string, password: string };

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET || 'default_secret', // Provide a default or handle the case where it's undefined
      { expiresIn: '1h' }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
