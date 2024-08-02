
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
        const { walletName } = Object.fromEntries(await request.formData()) as { walletName: string };

        
        const walletCreation1 = await walletModule.createWallet({ walletName: walletName });
        
        

        const addresses = await walletModule.getAddressesByWalletId({ walletId: walletCreation1.walletID });
        

        const mnemonic = await walletModule.getMnemonic({ walletId: walletCreation1.walletID });
       
        return new Response(JSON.stringify({ walletId:walletCreation1.walletID,  walletAddress: addresses.data.addresses, seedPhrase: mnemonic.data.mnemonic }), {status: 200});
    }
    catch (error){
        return new Response(JSON.stringify({message:`wallet creation failed!, error: ${error}`}), { status: 500 });
    }
}   
