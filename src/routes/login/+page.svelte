<!-- src/routes/login/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
  
    let email = '';
    let password = '';
  
    async function handleSubmit() {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        goto('/dashboard');
      }
    }
  </script>
  
  <Header />
  <main>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required />
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password} required />
      <button type="submit">Login</button>
    </form>
  </main>
  <Footer />
  