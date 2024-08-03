<script lang="ts">
  import { onMount } from 'svelte';
  import authService from '../../api/auth/authservice'; // Update the path to your actual authService module

  let email: string = '';
  let loading: boolean = false;
  let error: string | null = null;
  let successMessage: string | null = null;

  onMount(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error('Fetch error: ' + responseText);
      }

      const user = JSON.parse(responseText);
      email = user.email;
    } catch (err) {
      error = err.message;
    }
  });

  async function forgotPassword() {
    loading = true;
    error = null;
    successMessage = null;

    try {
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

<div class="account-settings">
  <h2>Account Settings</h2>
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} disabled />
  </div>
  <button class="forgot-password-button" on:click={forgotPassword} disabled={loading}>
    {#if loading} Sending... {:else} Forgot Password {/if}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if successMessage}
    <p class="success">{successMessage}</p>
  {/if}
</div>

<style>
  .account-settings {
    padding: 20px;
    max-width: 400px;
    margin: auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
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
  .forgot-password-button {
    background-color: #007BFF;
    border: none;
    color: white;
    padding: 12px 20px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  .forgot-password-button:hover {
    background-color: #0056b3;
  }
  .forgot-password-button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
</style>
