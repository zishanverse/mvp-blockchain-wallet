import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import NeucronSDK from 'neucron-sdk';

const neucron = new NeucronSDK();
const authModule = neucron.authentication;

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email } = await request.json();

    // Using Neucron SDK to handle forgot password functionality
    const forgotPasswordResponse = await authModule.forgotPassword({ email });

    console.log(`Forgot password request received for email: ${email}`);
    console.log('Neucron response:', forgotPasswordResponse);

    return json({ message: 'Password reset instructions have been sent to your email.' });
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    return json({ error: 'Failed to process forgot password request.' }, { status: 500 });
  }
};
