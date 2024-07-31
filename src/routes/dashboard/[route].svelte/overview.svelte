<!-- <script lang="ts">
  import { onMount } from 'svelte';

  let wallet: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wallet/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      <p>{wallet.balance} BTC</p>
    </div>
    <div class="recent-transactions">
      <h3>Recent Transactions</h3>
      <ul>
        {#each wallet.transactions as transaction}
          <li>
            <p>Amount: {transaction.amount} BTC</p>
            <p>Date: {transaction.date}</p>
            <p>Status: {transaction.status}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .wallet-overview {
    padding: 20px;
  }
  .balance {
    margin-bottom: 20px;
  }
  .recent-transactions ul {
    list-style-type: none;
    padding: 0;
  }
  .recent-transactions li {
    margin-bottom: 10px;
  }
  .error {
    color: red;
  }
</style> -->
