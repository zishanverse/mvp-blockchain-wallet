<script lang="ts">
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
  
    let balance: number = 0;
    let transactions: { date: string, amount: number, status: string }[] = [];
  
    onMount(async () => {
      const balanceResponse = await fetch('/api/wallet/balance');
      const balanceData = await balanceResponse.json();
      balance = balanceData.balance;
  
      const transactionsResponse = await fetch('/api/wallet/transactions');
      const transactionsData = await transactionsResponse.json();
      transactions = transactionsData.transactions;
    });
  </script>
  
  <Header />
  <main>
    <h1>Wallet Overview</h1>
    <p>Balance: {balance}</p>
    <h2>Recent Transactions</h2>
    <ul>
      {#each transactions as tx}
        <li>{tx.date} - {tx.amount} - {tx.status}</li>
      {/each}
    </ul>
  </main>
  <Footer />
  