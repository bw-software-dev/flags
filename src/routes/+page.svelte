<script lang="ts">
  import { page } from "$app/state";
  import { countPixels, getRandomIntInclusive } from "$lib";
  import countries from "$lib/countries.json";
  import { PieChart } from "layerchart";

  const code = page.url.searchParams.get("c");
  const country =
    countries.find((c) => c.code === code) ??
    countries[getRandomIntInclusive(0, countries.length - 1)];

  const map = $derived(
    await countPixels(`https://flagcdn.com/${country.code}.svg`),
  );
</script>

<svelte:head>
  <link rel="icon" href="https://flagcdn.com/{country.code}.svg" />
</svelte:head>

<div class="p-10 flex flex-col gap-10">
  <a
    class="w-full text-center text-white text-3xl font-bold"
    href="./?c={country.code}"
  >
    {country.label}
  </a>

  <div class="flex not-md:flex-col gap-10 items-center justify-center">
    <figure class="w-full">
      <img
        class="rounded-md"
        src="https://flagcdn.com/{country.code}.svg"
        alt={country.label}
      />
    </figure>
    <figure class="w-full p-10 aspect-square">
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
    </figure>
  </div>
</div>
