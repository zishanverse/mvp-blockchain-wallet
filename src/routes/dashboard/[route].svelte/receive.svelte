<!-- <script lang="ts">
  import { onMount } from 'svelte';

  let transactionId: string = '';
  let transactionDetails: any = null;
  let loading: boolean = false;
  let error: string | null = null;

  async function fetchTransactionDetails() {
    loading = true;
    error = null;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/wallet/receive/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      transactionDetails = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleFetch() {
    if (transactionId) {
      fetchTransactionDetails();
    } else {
      error = 'Please enter a transaction ID';
    }
  }
</script>

<div class="receive-crypto">
  <h2>Receive Cryptocurrency</h2>
  <div class="form-group">
    <label for="transactionId">Transaction ID:</label>
    <input id="transactionId" type="text" bind:value={transactionId} />
    <button class="fetch-button" on:click={handleFetch} disabled={loading}>
      {#if loading} Fetching... {:else} Fetch {/if}
    </button>
  </div>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if transactionDetails}
    <div class="transaction-details">
      <h3>Transaction Details</h3>
      <p><strong>ID:</strong> {transactionDetails.txid}</p>
      <p><strong>Address:</strong> {transactionDetails.address}</p>
      <p><strong>Note:</strong> {transactionDetails.note}</p>
      <p><strong>Amount:</strong> {transactionDetails.amount}</p>
      <p><strong>Status:</strong> {transactionDetails.status}</p>
    </div>
  {/if}
</div>

<style>
  .receive-crypto {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  .receive-crypto h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 5px;
    color: #666;
  }

  .form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .fetch-button {
    margin-top: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .fetch-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .fetch-button:hover:not(:disabled) {
    background-color: #45a049;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }

  .transaction-details {
    margin-top: 20px;
    background-color: #e0ffe0;
    padding: 15px;
    border-radius: 8px;
  }

  .transaction-details p {
    margin: 5px 0;
  }

  .transaction-details h3 {
    margin-bottom: 10px;
  }
</style> -->
