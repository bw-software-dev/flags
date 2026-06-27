<script lang="ts">
  import { browser } from "$app/env";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  const { children } = $props();
  let loaded = $state(false);
  let root = $state<HTMLElement>();

  let observer = !browser
    ? undefined
    : new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loaded = true;
            observer?.disconnect();
          }
        });
      });

  onMount(() => {
    observer?.observe(root!);
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div bind:this={root}>
  {#if loaded}
    <div transition:fade>
      {@render children()}
    </div>
  {/if}
</div>
