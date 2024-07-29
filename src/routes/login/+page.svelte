<script context="module" lang="ts">
  export const load = async ({ url }) => {
    return { query: url.searchParams.get('query') };
  };
</script>

<script lang="ts">
  export let query: string;
</script>

<form method="post" action="?/login">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />

  <button type="submit">Login</button>
</form>
