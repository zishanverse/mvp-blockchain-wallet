import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Neucron from 'neucron-sdk'; // Assuming Neucron is a default export

export const POST: RequestHandler = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' from the start of the token

    const neucron = new Neucron(token); // Create an instance of Neucron

    console.dir(neucron, { depth: null }); // Log the instance with more detail

    // Assuming 'createWallet' is the correct method (replace with the actual method name)
    //  const wallet = await neucron.createWallet(); // Replace with the correct method
    //  const walletAddress = wallet.getAddress();
    //  const seedPhrase = wallet.getSeedPhrase();

    // // For now, let's just return a success response
    // return json({ walletAddress, seedPhrase }, { status: 200 });
    return json({ message: 'Neucron instance created' }, { status: 200 });
    
  } catch (error) {
    console.error('Error creating wallet:', error);
    return json({ error: error.message }, { status: 500 });
  }
};