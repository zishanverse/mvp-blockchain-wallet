<!-- src/routes/login/+page.svelte -->
<script>
// @ts-nocheck

    export let form;
  </script>
  
  <h1>Login</h1>
  <form method="POST" action="?/login">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
  
  {#if form?.errors}
    <p style="color: red;">{form.errors.message}</p>
  {/if}
  