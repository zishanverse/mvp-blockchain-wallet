// src/routes/api/wallet/balance/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  // Extract the token from the request headers (optional for verification)
  const token = request.headers.get('Authorization')?.split(' ')[1];

  // Simulated balance data
  const balance = 1.234;

  return new Response(JSON.stringify({ balance }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
