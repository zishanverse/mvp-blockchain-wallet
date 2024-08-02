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
        const formData = new URLSearchParams({walletName}).toString();
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
          alert(errorText.message);
        }

        wallet = await response.json();
        successMessage = 'Wallet created successfully. Please save your seed phrase securely.';
        console.log('New WalletId:', wallet.walletAddress);
        localStorage.setItem("walletId", wallet.walletID);
      } catch (err) {
        console.error(err);
      } finally {
        loading = false;
      }
    }


    const saveSeed = () => {
      localStorage.setItem("seed", wallet.seedPhrase);
    }
  </script>
  
  <div class="create-wallet">
    <label for="walletName" class="sr-only">Wallet Name</label>
          <input
            type="text" 
            id="walletName" 
            name="walletName"
            bind:value={walletName}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter Wallet Name"
          />
    <button on:click={createWallet} disabled={loading}>
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
        <button on:click={saveSeed}>save seed Phrase</button>
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
   
