// src/routes/login/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => { // 'default' instead of 'login' to match POST method
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    // Implement your login logic here. For example, you can verify the email and password
    // against your database or an authentication service.
    const isAuthenticated = email === 'user@example.com' && password === 'password123';

    if (isAuthenticated) {
      // If authentication is successful, redirect to the dashboard or another protected route.
      throw redirect(303, '/dashboard');
    } else {
      // If authentication fails, return an error response.
      return fail(400, {
        message: 'Invalid email or password'
      });
    }
  }
};
