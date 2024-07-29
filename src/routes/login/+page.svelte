<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let message = '';

  const dispatch = createEventDispatcher();

  async function handleLogin(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target as HTMLFormElement);

    const response = await fetch('/login', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.auth) {
      message = 'Login successful!';
      dispatch('login', { balance: result.balance });
      goto('/dashboard'); // Navigate to dashboard or another page after successful login
    } else {
      message = result.message || 'Login failed. Please check your credentials.';
    }
  }
</script>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: 1em;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5em;
  }

  .form-group input {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }

  .form-group button {
    padding: 0.5em 1em;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .form-group button:hover {
    background-color: #0056b3;
  }

  .message {
    margin-top: 1em;
    color: red;
  }
</style>

<div class="container">
  <h2>Login</h2>
  <form on:submit={handleLogin}>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" name="email" bind:value={email} required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" name="password" bind:value={password} required />
    </div>
    <div class="form-group">
      <button type="submit">Login</button>
    </div>
  </form>
  {#if message}
    <div class="message">{message}</div>
  {/if}
</div>
