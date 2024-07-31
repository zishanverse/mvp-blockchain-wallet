<!-- <script lang="ts">
  let walletAddress: string = '';
  let qrCode: string = '';
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wallet/receive', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      const result = await response.json();
      walletAddress = result.walletAddress;
      qrCode = result.qrCode;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="receive-crypto">
  <h2>Receive Cryptocurrency</h2>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <div class="address">
      <p>Wallet Address: {walletAddress}</p>
      <img src={qrCode} alt="QR Code" />
    </div>
  {/if}
</div>

<style>
  .receive-crypto {
    padding: 20px;
  }
  .address {
    margin-top: 20px;
  }
  .error {
    color: red;
  }
</style> -->
