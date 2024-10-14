<script lang="ts">
  import Navbar from '$lib/Navbar.svelte'
  import Footer from '$lib/Footer.svelte'

  import '../../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import authService from '../api/auth/authservice'; // Update the path to your actual authService module

  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;
  let successMessage: string | null = null;

  async function loginUser(credentials) {
    try {
      const formData = new URLSearchParams(credentials).toString();
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('authToken', data.token); // Store the token
          await goto('/dashboard');
        } else {
          throw new Error(data.error || 'Login failed');
        }
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    await loginUser({ email, password });
  }

  async function forgotPassword() {
    loading = true;
    error = null;
    successMessage = null;

    try {
      if (!email.trim()) {
        throw new Error('ValidationError: "email" is not allowed to be empty');
      }

      const forgotPasswordResponse = await authService.forgotPassword({ email });
      console.log(forgotPasswordResponse);
      successMessage = 'Password reset instructions have been sent to your email.';
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>



<Navbar />

<div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    </div>
    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            bind:value={email}
            autocomplete="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            autocomplete="current-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 00-2 0v4a1 1 0 001 1h2a1 1 0 100-2h-1V5z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Login
        </button>
      </div>

      <div>
        <button
          type="button"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          on:click={forgotPassword}
          disabled={loading}
        >
          {#if loading} Sending... {:else} Forgot Password {/if}
        </button>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      {#if successMessage}
        <p class="success">{successMessage}</p>
      {/if}
    </form>
  </div>
</div>
<Footer />

<style>
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  .success {
    color: green;
    margin-top: 10px;
    text-align: center;
  }
</style>
