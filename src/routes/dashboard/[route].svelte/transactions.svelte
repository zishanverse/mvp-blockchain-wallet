<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import  Neucron  from 'neucron-sdk';

  let transactions = [];
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Initialize Neucron SDK
      const neucron = new Neucron({ authToken: token });

      // Fetch transactions using Neucron SDK
      const result = await neucron.wallet.getTransactions();

      transactions = result.transactions;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="transaction-history">
  <h2>Transaction History</h2>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <ul>
      {#each transactions as transaction}
        <li>
          <p>Transaction ID: {transaction.transactionId}</p>
          <p>Amount: {transaction.amount} BTC</p>
          <p>Date: {new Date(transaction.date).toLocaleString()}</p>
          <p>Sender: {transaction.senderAddress}</p>
          <p>Recipient: {transaction.recipientAddress}</p>
          <p>Status: {transaction.status}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .transaction-history {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .error {
    color: red;
  }
</style> -->
