<script lang="ts">
  import countries from "$lib/countries.json";
  import Country from "$lib/country.svelte";

  const { params } = $props();

  const country = countries.find((c) => c.code === params.slug);
</script>

{#if country}
  <Country {...country} />
{/if}
