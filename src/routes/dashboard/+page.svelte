<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import WalletOverview from '../dashboard/[route].svelte/overview.svelte';
  import CreateWallet from '../dashboard/[route].svelte/create.svelte';
  import SendCrypto from '../dashboard/[route].svelte/send.svelte';
  import ReceiveCrypto from '../dashboard/[route].svelte/receive.svelte';
  import TransactionHistory from '../dashboard/[route].svelte/transactions.svelte';

  let user: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  let activeComponent = 'overview'; // Default to Wallet Overview

  const setActiveComponent = (component: string) => {
    activeComponent = component;
  };

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);

      if (!token) {
        goto('/login');
        return;
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      user = await response.json();
      console.log('User Data:', user);
    } catch (err) {
      error = err.message;
      console.error('Error:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="dashboard">
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if user}
    <div class="profile">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <nav>
        <button class="nav-button" on:click={() => setActiveComponent('create')}>Create Wallet</button>
        <button class="nav-button" on:click={() => setActiveComponent('overview')}>Wallet Overview</button>
        <button class="nav-button" on:click={() => setActiveComponent('send')}>Send</button>
        <button class="nav-button" on:click={() => setActiveComponent('receive')}>Receive</button>
        <button class="nav-button" on:click={() => setActiveComponent('transactions')}>Transaction History</button>
      </nav>
      <div class="content">
        {#if activeComponent === 'create'}
          <CreateWallet />
        {:else if activeComponent === 'overview'}
          <WalletOverview />
        {:else if activeComponent === 'send'}
          <SendCrypto />
        {:else if activeComponent === 'receive'}
          <ReceiveCrypto />
        {:else if activeComponent === 'transactions'}
          <TransactionHistory />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .profile {
    margin-top: 20px;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h2 {
    margin-bottom: 10px;
    color: #343a40;
  }
  p {
    margin-bottom: 20px;
    color: #495057;
  }
  nav {
    margin: 20px 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .nav-button {
    background: linear-gradient(135deg, #ff6f61, #d04ed6); /* Gradient from red to purple */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background 0.3s ease, transform 0.2s;
  }
  .nav-button:hover {
    background: linear-gradient(135deg, #d04ed6, #ff6f61); /* Reversed gradient */
    transform: scale(1.05);
  }
  .content {
    margin-top: 20px;
  }
  .error {
    color: red;
  }
</style>
