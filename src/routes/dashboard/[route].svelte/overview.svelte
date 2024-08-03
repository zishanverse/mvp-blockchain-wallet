<script lang="ts">
  import { onMount } from 'svelte';

  let wallet: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');

      const walletId = localStorage.getItem("walletId");
      const formData = new URLSearchParams({walletId}).toString();

      const response = await fetch('/api/wallet/balance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      wallet = await response.json();
      console.log('Wallet Data:', wallet);
    } catch (err) {
      error = err.message;
      console.error('Error:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="wallet-overview">
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if wallet}
    <div class="balance">
      <h2>Wallet Balance</h2>
      <p class="balance-amount">{wallet.balance} Satoshis</p>
    </div>
    <div class="recent-transactions">
      <h3>Recent Transactions</h3>
      <ul>
        {#each wallet.transactions as transaction }
          <li class="transaction-item">
            <a href="https://whatsonchain.com/tx/{transaction.txid}" target="_blank">txid: {transaction.txid}</a>
            <p>Amount: {transaction.input_satoshis} satoshis</p>
            <p>Date: {new Date(transaction.time).toLocaleDateString()}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .wallet-overview {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  .balance {
    margin-bottom: 20px;
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .balance h2 {
    margin-bottom: 10px;
    color: #4CAF50;
  }

  .balance-amount {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
  }

  .recent-transactions {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .recent-transactions h3 {
    margin-bottom: 10px;
    color: #333;
  }

  .recent-transactions ul {
    list-style-type: none;
    padding: 0;
  }

  .transaction-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s;
  }

  .transaction-item:hover {
    background-color: #f1f1f1;
  }

  .transaction-item a {
    color: #007BFF;
    text-decoration: none;
  }

  .transaction-item a:hover {
    text-decoration: underline;
  }

  .transaction-item p {
    margin: 5px 0;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
