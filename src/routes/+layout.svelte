<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="https://flagcdn.com/us.svg" />
</svelte:head>

{@render children()}
