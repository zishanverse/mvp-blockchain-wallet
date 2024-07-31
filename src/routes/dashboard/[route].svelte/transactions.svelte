<!-- <script lang="ts">
  let transactions = [];
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wallet/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      const result = await response.json();
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
          <p>Date: {transaction.date}</p>
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
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  .error {
    color: red;
  }
</style> -->
