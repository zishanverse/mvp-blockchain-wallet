<!-- <script lang="ts">
  import { onMount } from 'svelte';

  let email: string = '';
  let password: string = '';
  let confirmPassword: string = '';
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

  async function updateSettings() {
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    loading = true;
    error = null;
    successMessage = null;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error('Fetch error: ' + responseText);
      }

      successMessage = 'Account settings updated successfully.';
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
    <input id="email" type="email" bind:value={email} />
  </div>
  <div>
    <label for="password">New Password:</label>
    <input id="password" type="password" bind:value={password} />
  </div>
  <div>
    <label for="confirmPassword">Confirm Password:</label>
    <input id="confirmPassword" type="password" bind:value={confirmPassword} />
  </div>
  <button on:click={updateSettings} disabled={loading}>
    {#if loading} Updating... {:else} Update Settings {/if}
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
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style> -->
