export default {
    forgotPassword: async function ({ email }: { email: string }) {
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Forgot Password Error:', error);
        throw error;
      }
    },
  };
  