import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { neucron } from '$lib/neucron';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response('Unauthorized', { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        const userId = (decoded as any).userId;

        if (!userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { recipientAddress, Note, amount } = await request.json();

        if (!recipientAddress || !amount) {
            return new Response(JSON.stringify({ message: 'recipientAddress and amount are required fields' }), { status: 400 });
        }

        const options = {
            outputs: [
                {
                    address: recipientAddress,
                    note: Note || 'gurudakshina',
                    amount: parseInt(amount, 10)
                }
            ]
        };

        const payResponse = await neucron.pay.txSpend(options);

        if (payResponse.data && payResponse.data.txid) {
            return new Response(JSON.stringify({ transactionId: payResponse.data.txid }), { status: 200 });
        } else {
            throw new Error('Unexpected response from neucron pay API');
        }
    } catch (error) {
        console.error('Payment request error:', error);

        if (error.response && error.response.status === 409) {
            return new Response(JSON.stringify({ message: 'Conflict: Transaction already exists or is in progress' }), { status: 409 });
        }

        return new Response(JSON.stringify({ message: `Pay request failed! Error: ${error.message}` }), { status: 500 });
    }
};
