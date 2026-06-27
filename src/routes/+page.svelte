<script lang="ts">
  import { getRandomIntInclusive } from "$lib";
  import countries from "$lib/countries.json";
  import Country from "$lib/country.svelte";

  const randomCountry =
    countries[getRandomIntInclusive(0, countries.length - 1)];
</script>

<svelte:head>
  <link rel="icon" href="https://flagcdn.com/{randomCountry.code}.svg" />
</svelte:head>

<Country {...randomCountry} />
