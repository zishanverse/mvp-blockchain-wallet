<!-- <script lang="ts">
  let recipientAddress: string = '';
  let amount: number = 0;
  let loading: boolean = false;
  let error: string | null = null;
  let successMessage: string | null = null;

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
          amount
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      const result = await response.json();
      successMessage = `Transaction successful: ${result.transactionId}`;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="send-crypto">
  <h2>Send Cryptocurrency</h2>
  <div>
    <label for="recipient">Recipient Address:</label>
    <input id="recipient" type="text" bind:value={recipientAddress} />
  </div>
  <div>
    <label for="amount">Amount:</label>
    <input id="amount" type="number" bind:value={amount} />
  </div>
  <button on:click={sendCrypto} disabled={loading}>
    {#if loading} Sending... {:else} Send {/if}
  </button>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if successMessage}
    <p class="success">{successMessage}</p>
  {/if}
</div>

<style>
  .send-crypto {
    padding: 20px;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style> -->
