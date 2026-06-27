<script lang="ts">
  import { page } from "$app/state";
  import { getRandomIntInclusive } from "$lib";
  import countries from "$lib/countries.json";
  import Country from "$lib/country.svelte";

  const code = page.url.searchParams.get("c");
  const country =
    countries.find((c) => c.code === code) ??
    countries[getRandomIntInclusive(0, countries.length - 1)];
</script>

<svelte:head>
  <link rel="icon" href="https://flagcdn.com/{country.code}.svg" />
</svelte:head>

<Country {...country} />
