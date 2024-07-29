import { db } from '$lib/database'; // Ensure the correct path to your database module
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      return fail(400, { email, incorrect: true });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return fail(400, { email, incorrect: true });
    }

    // Redirect the user to the dashboard after successful login
    throw redirect(303, '/dashboard');
  }
};
