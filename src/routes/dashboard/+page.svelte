<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import WalletOverview from '../dashboard/[route].svelte/overview.svelte';
  import CreateWallet from '../dashboard/[route].svelte/create.svelte';
  import SendCrypto from '../dashboard/[route].svelte/send.svelte';
  import ReceiveCrypto from '../dashboard/[route].svelte/receive.svelte';
  import TransactionHistory from '../dashboard/[route].svelte/transactions.svelte';
  import Settings from '../dashboard/[route].svelte/setting.svelte';

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
      //console.log('Token:', token);

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
      //console.log('User Data:', user);
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
        <button class="nav-button" on:click={() => setActiveComponent('settings')}>Settings</button>
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
        {:else if activeComponent === 'settings'}
          <Settings />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard {
    padding: 20px;
  }
  .profile {
    margin-top: 20px;
  }
  nav {
    margin: 20px 0;
  }
  .nav-button {
    background-color: #4CAF50; /* Green */
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
    transition: background-color 0.3s ease;
  }
  .nav-button:hover {
    background-color: #45a049;
  }
  .content {
    margin-top: 20px;
  }
  .error {
    color: red;
  }
</style>
