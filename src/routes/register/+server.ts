import { db } from '$lib/database'; // Ensure the correct path to your database module
import bcrypt from 'bcrypt';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    return new Response('User registered', { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response('User registration failed', { status: 500 });
  }
}
