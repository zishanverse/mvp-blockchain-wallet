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
      <p>{wallet.balance} Satoshis</p>
    </div>
    <div class="recent-transactions">
      <h3>Recent Transactions</h3>
      <ul>
        {#each wallet.transactions as transaction}
          <li>
            <a href="https://whatsonchain.com/tx/{transaction.txid}">txid: {transaction.txid}</a>
            <p>Amount: {transaction.input_satoshis} satoshis</p>
            <p>Date: {transaction.time}</p>
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
</style>
