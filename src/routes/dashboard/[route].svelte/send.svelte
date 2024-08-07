<script lang="ts">
  let recipientAddress: string = '';
  let amount: number = 0;
  let Note: string = "gurudakshina";
  let loading: boolean = false;
  let error: string | null = null;
  let successMessage: string | null = null;
  let result:any;
  async function sendCrypto() {
    loading = true;
    error = null;
    successMessage = null;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipientAddress,
          amount,
          Note
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      result = await response.json();
      successMessage = "Transaction successful!";
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="send-crypto">
  <h2>Send Cryptocurrency</h2>
  <div class="form-group">
    <label for="recipient">Recipient Address:</label>
    <input id="recipient" type="text" bind:value={recipientAddress} />
  </div>
  <div class="form-group">
    <label for="amount">Amount:</label>
    <input id="amount" type="number" bind:value={amount} />
  </div>
  <div class="form-group">
    <label for="note">Note:</label>
    <input id="note" type="text" bind:value={Note} />
  </div>
  <button class="send-button" on:click={sendCrypto} disabled={loading}>
    {#if loading} Sending... {:else} Send {/if}
  </button>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if successMessage}
    <p class="success">{successMessage}</p>
    <a href="https://whatsonchain.com/tx/{result.transactionId}">Check on whatsonchain, click on transaction id: <span class="link">{result.transactionId}</span></a>
  {/if}
</div>

<style>
  .send-crypto {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  .send-crypto h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .send-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .send-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .send-button:hover:not(:disabled) {
    background-color: #45a049;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }
  .link {
    color: blue;
    text-decoration: underline;
  }

  .success {
    color: green;
    text-align: center;
    margin-top: 20px;
  }
</style>
