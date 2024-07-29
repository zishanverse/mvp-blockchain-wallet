// src/routes/api/user/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const user = {
    email: 'user@example.com',
    token: 'your-token-here'
  };

  return new Response(JSON.stringify({ user }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
