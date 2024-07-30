<script>
    import { onMount } from 'svelte';
  
    let transactions = [];
  
    onMount(async () => {
      const response = await fetch('/api/wallet/transactions');
      transactions = await response.json();
    });
  </script>
  
  <h2>Transaction History</h2>
  <ul>
    {#each transactions as transaction}
      <li>{transaction.date}: {transaction.amount} from {transaction.senderAddress} to {transaction.recipientAddress}</li>
    {/each}
  </ul>
  