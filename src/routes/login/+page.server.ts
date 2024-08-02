import { db } from '$lib/database'; // Ensure the correct path to your database module
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fail, redirect } from '@sveltejs/kit';
import {neucron, authModule} from '$lib/neucron'

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      return fail(400, { email, incorrect: true });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return fail(400, { email, incorrect: true });
    }
    const loginResponse = await authModule.login({ email: email, password: password });
    console.log(loginResponse);

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
