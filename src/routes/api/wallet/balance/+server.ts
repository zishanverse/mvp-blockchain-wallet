import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Neucron from 'neucron-sdk';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' from the start of the token

    // Initialize the Neucron SDK with the token
    const neucron = new Neucron(token);

    // Debug: Inspect the neucron instance
    console.dir(neucron, { depth: null }); // Log the instance with more detail

    // Check if there are any other methods or properties that can help us fetch the wallet balance
    const walletMethods = Object.keys(neucron).filter((key) => typeof neucron[key] === 'function');
    console.log('Available wallet methods:', walletMethods);

    // Check if there are any other properties that can help us fetch the wallet balance
    const walletProperties = Object.keys(neucron).filter((key) => typeof neucron[key] !== 'function');
    console.log('Available wallet properties:', walletProperties);

    // If you find a suitable property, use it to fetch the wallet balance
    // For example, if there's a `balance` property:
    const balance = neucron.balance; // Use the property to fetch the balance

    return json({ balance }, { status: 200 });
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    return json({ error: error.message }, { status: 500 });
  }
};