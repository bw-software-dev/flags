<script lang="ts">
  import { page } from "$app/state";
  import { countPixels, getRandomIntInclusive } from "$lib";
  import countries from "$lib/countries.json";
  import { PieChart } from "layerchart";

  const code = page.url.searchParams.get("c");
  const country =
    countries.find((c) => c.code === code) ??
    countries[getRandomIntInclusive(0, countries.length - 1)];

  const map = $derived(await countPixels(`https://flagcdn.com/${country.code}.svg`));
</script>

<svelte:head>
  <link rel="icon" href="https://flagcdn.com/{country.code}.svg" />
</svelte:head>

<div class="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
  <a class="text-center text-3xl font-bold text-white md:col-span-2" href="./?c={country.code}">
    {country.label}
  </a>

  <div class="min-w-0">
    <img
      class="w-full rounded-md"
      src="https://flagcdn.com/{country.code}.svg"
      alt={country.label}
    />
  </div>

  <div class="w-full min-w-0 px-10 not-md:aspect-square md:h-auto">
    <PieChart
      innerRadius={-20}
      cornerRadius={10}
      padAngle={0.02}
      data={map}
      key="color"
      value="percentage"
      cRange={map.map((e) => e.color)}
      class="text-white"
      labels={{
        placement: "callout",
        offset: 1,
        value: (d: { percentage: number; color: string }) =>
          d.color === "white"
            ? "other"
            : d.percentage.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 1,
              }),
        class: "text-xs fill-white",
      }}
    />
  </div>
</div>
