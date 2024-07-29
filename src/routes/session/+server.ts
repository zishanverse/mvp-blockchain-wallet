import { db } from '$lib/database';
import bcrypt from 'bcrypt';
import { createSession } from '$lib/session';

export const POST = async ({ request }) => {
  const { email, password } = await request.json();

  const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (userResult.rowCount === 0 || !(await bcrypt.compare(password, userResult.rows[0].password))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const sessionData = { userId: userResult.rows[0].id };
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });

  response.headers.append('Set-Cookie', createSession(sessionData));

  return response;
};
