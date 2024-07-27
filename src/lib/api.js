// @ts-check

const api = {
    /**
     * @param {string} email
     * @param {string} password
     */
    register: async (email, password) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return response.json();
    },
  
    /**
     * @param {string} email
     * @param {string} password
     */
    login: async (email, password) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return response.json();
    },
  
    getBalance: async () => {
      const response = await fetch('/api/wallet/balance');
      return response.json();
    },
  
    getTransactions: async () => {
      const response = await fetch('/api/wallet/transactions');
      return response.json();
    },
  
    /**
     * @param {string} walletAddress
     * @param {string} recipientAddress
     * @param {number} amount
     */
    sendCrypto: async (walletAddress, recipientAddress, amount) => {
      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, recipientAddress, amount })
      });
      return response.json();
    },
  
    /**
     * @param {string} walletAddress
     */
    receiveCrypto: async (walletAddress) => {
      const response = await fetch('/api/wallet/receive', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    }
  };
  
  export default api;
  