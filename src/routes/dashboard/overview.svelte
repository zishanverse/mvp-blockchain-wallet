<script>
    import { onMount } from 'svelte';
  
    let balance = 0;
    let transactions = [];
  
    onMount(async () => {
      const balanceResponse = await fetch('/api/wallet/balance');
      balance = await balanceResponse.json();
  
      const transactionsResponse = await fetch('/api/wallet/transactions');
      transactions = await transactionsResponse.json();
    });
  </script>
  
  <h2>Wallet Overview</h2>
  <p>Balance: {balance}</p>
  <h3>Recent Transactions</h3>
  <ul>
    {#each transactions as transaction}
      <li>{transaction.date}: {transaction.amount} to {transaction.recipientAddress}</li>
    {/each}
  </ul>
  