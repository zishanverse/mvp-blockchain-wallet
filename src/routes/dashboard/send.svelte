<script>
    let recipient = '';
    let amount = '';
  
    async function handleSubmit() {
      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        body: JSON.stringify({ recipient, amount }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        alert('Transaction successful');
      } else {
        alert('Transaction failed');
      }
    }
  </script>
  
  <h2>Send Cryptocurrency</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={recipient} placeholder="Recipient Address" required />
    <input type="number" bind:value={amount} placeholder="Amount" required />
    <button type="submit">Send</button>
  </form>
  