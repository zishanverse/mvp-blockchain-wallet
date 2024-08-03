<script lang="ts">
  import { onMount } from 'svelte';

  let wallet: any = null;
  let loading: boolean = false;
  let error: string | null = null;
  let successMessage: string | null = null;
  let walletName = "";

  async function createWallet() {
    loading = true;
    error = null;
    successMessage = null;

    try {
      const token = localStorage.getItem('authToken');
      const formData = new URLSearchParams({ walletName }).toString();
      const response = await fetch('/api/wallet/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.json();
        error = errorText.message;
        return;
      }

      wallet = await response.json();
      successMessage = 'Wallet created successfully. Please save your seed phrase securely.';
      //console.log('New WalletId:', wallet.walletAddress);
      localStorage.setItem("walletId", wallet.walletID);
    } catch (err) {
      console.error(err);
      error = 'An error occurred while creating the wallet.';
    } finally {
      loading = false;
    }
  }

  const saveSeed = () => {
    localStorage.setItem("seed", wallet.seedPhrase);
  }
</script>

<div class="create-wallet">
  <h2>Create a New Wallet</h2>
  <label for="walletName" class="sr-only">Wallet Name</label>
  <input
    type="text"
    id="walletName"
    name="walletName"
    bind:value={walletName}
    required
    class="wallet-input"
    placeholder="Enter Wallet Name"
  />
  <button on:click={createWallet} class="create-button" disabled={loading}>
    {#if loading} Creating... {:else} Create Wallet {/if}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if successMessage}
    <p class="success">{successMessage}</p>
    <div class="wallet-details">
      <p>Wallet Addresses</p>
      <ul>
        {#each wallet.walletAddress as Address}
          <li>
            <p>Address: {Address}</p>
          </li>
        {/each}
      </ul>
      <br />
      <p>Seed Phrase: {wallet.seedPhrase}</p>
      <button on:click={saveSeed} class="save-button">Save Seed Phrase</button>
    </div>
  {/if}
</div>

<style>
  .create-wallet {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .create-wallet h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  .wallet-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .create-button, .save-button {
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #007BFF;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .create-button:disabled, .save-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  .create-button:hover:not(:disabled), .save-button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  .success {
    color: green;
    text-align: center;
    margin-top: 10px;
  }
  .wallet-details {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .wallet-details ul {
    list-style-type: none;
    padding: 0;
  }
  .wallet-details li {
    background-color: #f1f1f1;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 4px;
  }
</style>
