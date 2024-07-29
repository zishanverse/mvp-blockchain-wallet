// src/routes/api/wallet/transactions/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  // Extract the token from the request headers (optional for verification)
  const token = request.headers.get('Authorization')?.split(' ')[1];

  // Simulated transactions data
  const transactions = [
    {
      transactionId: '1',
      date: new Date().toISOString(),
      amount: 0.5,
      senderAddress: 'sender1',
      recipientAddress: 'recipient1',
      status: 'completed'
    }
    // Add more transactions as needed
  ];

  return new Response(JSON.stringify({ transactions }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
