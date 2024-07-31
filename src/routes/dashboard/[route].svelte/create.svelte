<script lang="ts">
  import { onMount } from 'svelte';

  let wallet: any = null;
  let loading: boolean = false;
  let error: string | null = null;
  let successMessage: string | null = null;

  async function createWallet() {
    loading = true;
    error = null;
    successMessage = null;

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('/api/wallet/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      wallet = await response.json();
      successMessage = 'Wallet created successfully. Please save your seed phrase securely.';
      console.log('New Wallet:', wallet);
    } catch (err) {
      error = err.message;
      console.error('Error:', err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="create-wallet">
  <button on:click={createWallet} disabled={loading}>
    {#if loading} Creating... {:else} Create Wallet {/if}
  </button>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if successMessage}
    <p class="success">{successMessage}</p>
    <div class="wallet-details">
      <p>Wallet Address: {wallet.walletAddress}</p>
      <p>Seed Phrase: {wallet.seedPhrase}</p>
    </div>
  {/if}
</div>

<style>
  .create-wallet {
    padding: 20px;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  .wallet-details {
    margin-top: 20px;
  }
</style>
