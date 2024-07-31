<script>
  import { onMount } from 'svelte';

  let user = null;
  let errorMessage = '';

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
      }

      user = await response.json();
    } catch (error) {
      errorMessage = error.message;
      console.error(errorMessage);
    }
  });
</script>

{#if errorMessage}
  <p>{errorMessage}</p>
{/if}

{#if user}
  <h1>Welcome, {user.email}</h1>
  <nav>
    <ul>
      <li><a href="/dashboard/overview">Wallet Overview</a></li>
      <li><a href="/dashboard/send">Send Cryptocurrency</a></li>
      <li><a href="/dashboard/receive">Receive Cryptocurrency</a></li>
      <li><a href="/dashboard/transactions">Transaction History</a></li>
      <li><a href="/dashboard/settings">Account Settings</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
  <slot></slot>
{/if}
