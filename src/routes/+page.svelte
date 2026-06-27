<script lang="ts">
  import { getRandomIntInclusive } from "$lib";
  import countries from "$lib/countries.json";
  import Country from "$lib/country.svelte";
</script>

<Country {...countries[getRandomIntInclusive(0, countries.length - 1)]} />
