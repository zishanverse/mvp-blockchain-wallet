<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token); // Log token

      if (!token) {
        goto('/login'); // Redirect to login if no token is found
        return;
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response Status:', response.status); // Log response status

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Fetch error: ' + errorText);
      }

      user = await response.json();
      console.log('User Data:', user); // Log user data
    } catch (err) {
      error = err.message;
      console.error('Error:', err); // Log the error
    } finally {
      loading = false;
    }
  });
</script>

<template>
  <div class="dashboard">
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else}
      <div class="profile">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <!-- Add more user information here -->
      </div>
    {/if}
  </div>
</template>

<style>
  .dashboard {
    padding: 20px;
  }

  .profile {
    margin-top: 20px;
  }

  .error {
    color: red;
  }
</style>
