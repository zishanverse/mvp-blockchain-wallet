<script>
  import { onMount } from 'svelte';

  let user = null;
  let errorMessage = '';

  onMount(async () => {
    try {
      console.log('Fetching user data...');
      const token = localStorage.getItem('authToken'); // or however you store the token
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('User data fetched:', data);
      user = data;
    } catch (error) {
      errorMessage = `Fetch error: ${error.message}`;
      console.error(errorMessage);
    }
  });
</script>

{#if user}
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
    <nav>
      <ul class="space-y-2">
        <li>
          <a href="/dashboard/overview" class="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Wallet Overview</a>
        </li>
        <li>
          <a href="/dashboard/send" class="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send Cryptocurrency</a>
        </li>
        <li>
          <a href="/dashboard/receive" class="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Receive Cryptocurrency</a>
        </li>
        <li>
          <a href="/dashboard/transactions" class="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Transaction History</a>
        </li>
        <li>
          <a href="/dashboard/settings" class="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Account Settings</a>
        </li>
        <li>
          <a href="/logout" class="block p-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</a>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </div>
{:else if errorMessage}
  <p>{errorMessage}</p>
{:else}
  <p>Loading user data...</p>
{/if}
