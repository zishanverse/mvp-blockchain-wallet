<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store'; // Ensure to import get from 'svelte/store'

  interface User {
    email: string;
    token: string;
  }

  interface Transaction {
    transactionId: string;
    date: string;
    amount: number;
    senderAddress: string;
    recipientAddress: string;
    status: string;
  }

  let user: User | null = null;
  let balance: number = 0;
  let transactions: Transaction[] = [];
  let loading: boolean = true;

  async function fetchWalletData() {
    if (!user) return;

    const res = await fetch('/api/wallet/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const data = await res.json();
    balance = data.balance;

    const transactionsRes = await fetch('/api/wallet/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const transactionsData = await transactionsRes.json();
    transactions = transactionsData.transactions;

    loading = false;
  }

  onMount(async () => {
    // Fetch user data from the page store
    const $pageStore = get(page);
    user = $pageStore.data.user as User; // Ensure the user data is accessed correctly
    console.log('User data:', user); // Add this line for debugging

    if (!user) {
      goto('/login');
    } else {
      await fetchWalletData();
    }
  });

  function handleSend() {
    goto('/send');
  }

  function handleReceive() {
    goto('/receive');
  }
</script>

<main class="container mx-auto p-4">
  {#if loading}
    <p>Loading...</p>
  {:else}
    <header class="mb-4">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </header>
    <section class="mb-4">
      <h2 class="text-xl font-semibold">Wallet Overview</h2>
      <div class="p-4 border rounded shadow">
        <p>Balance: {balance} BTC</p>
        <div class="mt-4 flex space-x-4">
          <button on:click={handleSend} class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
          <button on:click={handleReceive} class="bg-green-500 text-white px-4 py-2 rounded">Receive</button>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-xl font-semibold">Transaction History</h2>
      {#if transactions.length === 0}
        <p>No transactions found.</p>
      {:else}
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2">Date</th>
              <th class="py-2">Amount</th>
              <th class="py-2">Sender</th>
              <th class="py-2">Recipient</th>
              <th class="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {#each transactions as transaction}
              <tr>
                <td class="py-2">{new Date(transaction.date).toLocaleString()}</td>
                <td class="py-2">{transaction.amount} BTC</td>
                <td class="py-2">{transaction.senderAddress}</td>
                <td class="py-2">{transaction.recipientAddress}</td>
                <td class="py-2">{transaction.status}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </section>
  {/if}
</main>

<style>
  .container {
    max-width: 800px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
</style>
