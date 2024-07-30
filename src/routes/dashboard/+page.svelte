<script>
  import { onMount } from 'svelte';

  let user = null;

  onMount(async () => {
    const response = await fetch('/api/user/profile');
    user = await response.json();
  });
</script>

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
