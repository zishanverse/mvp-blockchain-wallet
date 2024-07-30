<script>
    import { onMount } from 'svelte';
  
    let address = '';
    let qrCode = '';
  
    onMount(async () => {
      const response = await fetch('/api/wallet/receive');
      const data = await response.json();
      address = data.address;
      qrCode = data.qrCode;
    });
  </script>
  
  <h2>Receive Cryptocurrency</h2>
  <p>Address: {address}</p>
  <img src={qrCode} alt="QR Code" />
  <button on:click={() => navigator.clipboard.writeText(address)}>Copy Address</button>
  