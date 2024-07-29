<script>
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';

  let name = '';
  let email = '';
  let password = '';
  let message = '';

  async function register() {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
      message = 'Registration successful!';
      name = '';
      email = '';
      password = '';
    } else {
      message = 'Registration failed.';
    }

    invalidate();
  }
</script>

<form on:submit|preventDefault={register}>
  <label>
    Name:
    <input bind:value={name} type="text" required />
  </label>
  <label>
    Email:
    <input bind:value={email} type="email" required />
  </label>
  <label>
    Password:
    <input bind:value={password} type="password" required />
  </label>
  <button type="submit">Register</button>
</form>

<p>{message}</p>
