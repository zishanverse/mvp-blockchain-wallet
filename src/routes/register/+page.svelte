<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let message = '';
  let isSubmitting = false;

  const dispatch = createEventDispatcher();

  async function handleSignUp(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    if (isSubmitting) return; // Prevent multiple submissions

    isSubmitting = true;
    message = ''; // Clear previous message

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();

      if (result.success) {
        message = result.message;
        goto('/login'); // Navigate to login page after successful registration
      } else {
        message = result.message || 'Registration failed. Please try again.';
      }
    } catch (error) {
      message = error.message || 'Registration failed. Please try again.';
    } finally {
      isSubmitting = false;
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

  .form-group button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .message {
    margin-top: 1em;
    color: red;
  }
</style>

<div class="container">
  <h2>Register</h2>
  <form on:submit={handleSignUp}>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" name="email" bind:value={email} required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" name="password" bind:value={password} required />
    </div>
    <div class="form-group">
      <button type="submit" disabled={isSubmitting}>Register</button>
    </div>
  </form>
  {#if message}
    <div class="message">{message}</div>
  {/if}
</div>
