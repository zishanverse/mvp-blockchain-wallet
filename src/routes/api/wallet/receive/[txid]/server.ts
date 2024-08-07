// import type { RequestHandler } from '@sveltejs/kit';
// import jwt from 'jsonwebtoken';
// import { neucron } from '$lib/neucron';

// export const GET: RequestHandler = async ({ request, params }) => {
//     try {
//         console.log('Params:', params); // Log the parameters

//         const authHeader = request.headers.get('Authorization');
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return new Response('Unauthorized', { status: 401 });
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
//         const userId = (decoded as any).userId;

//         if (!userId) {
//             return new Response('Unauthorized', { status: 401 });
//         }

//         const { txid } = params;

//         if (!txid) {
//             return new Response(JSON.stringify({ message: 'Transaction ID is required' }), { status: 400 });
//         }

//         // Fetch transaction details from neucron or your database
//         const transactionDetails = await neucron.getTransactionDetails(txid);

//         if (!transactionDetails) {
//             return new Response(JSON.stringify({ message: 'Transaction not found' }), { status: 404 });
//         }

//         // Fetch data from the URL if needed
//         const url = `https://whatsonchain.com/tx/${txid}`;
//         const externalResponse = await fetch(url);
//         const externalData = await externalResponse.json();

//         // Combine internal and external data if needed
//         const combinedData = {
//             ...transactionDetails,
//             externalData
//         };

//         return new Response(JSON.stringify(combinedData), { status: 200, headers: { 'Content-Type': 'application/json' } });
//     } catch (error) {
//         console.error('Transaction details fetch error:', error);
//         return new Response(JSON.stringify({ message: `Fetch request failed! Error: ${error.message}` }), { status: 500 });
//     }
// };
