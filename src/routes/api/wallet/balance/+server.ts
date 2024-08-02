import type { RequestHandler } from '@sveltejs/kit';
import {walletModule} from '$lib/neucron';
import jwt from 'jsonwebtoken';

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
        const { walletId } = Object.fromEntries(await request.formData()) as { walletId: string };

        const DefaultWalletBalance = await walletModule.getWalletBalance({});

        const walletHistory1 = await walletModule.getWalletHistory();
        

        return new Response(JSON.stringify({ balance: DefaultWalletBalance.data.balance.confirmed, transactions: walletHistory1 }), {status: 200});
    }
    catch (error){  
        return new Response(JSON.stringify({message:`balance fetching failed!, error: ${error}`}), { status: 500 });
    }
}