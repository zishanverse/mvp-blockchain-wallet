import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import {neucron} from '$lib/neucron';

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
        const { recipientAddress, Note, amount } = Object.fromEntries(await request.formData()) as { recipientAddress: string, Note: string,amount: string   };

        const options = {
            outputs: [
              {
                address: recipientAddress || 'sales@timechainlabs.io',
                note: Note || 'gurudakshina',
                amount: parseInt(amount) || 1
              }
            ]
          };
          console.log(options);
        
        const payResponse = await neucron.pay.txSpend(options);

        return new Response(JSON.stringify({ transactionId: payResponse.data.txid}), {status: 200});
    }
    catch (error){
        return new Response(JSON.stringify({message:`pay request failed!, error: ${error}`}), { status: 500 });
    }
}   