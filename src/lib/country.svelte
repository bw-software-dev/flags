<script lang="ts">
  import { countPixels } from "$lib";
  import { PieChart } from "layerchart";

  const props: { label: string; code: string } = $props();

  const map = $derived(await countPixels(`https://flagcdn.com/${props.code}.svg`));
</script>

<div class="p-10 flex flex-col gap-10">
  <a class="w-full text-white text-3xl font-bold" href="./{props.code}">
    {props.label}
  </a>

  <div class="flex items-center justify-center">
    <figure class="w-1/2 p-2">
      <img src="https://flagcdn.com/{props.code}.svg" alt={props.label} />
    </figure>
    <figure class="w-1/2 p-2">
      <PieChart
        outerRadius={160}
        innerRadius={-20}
        cornerRadius={10}
        padAngle={0.02}
        data={map}
        key="color"
        value="percentage"
        cRange={map.map((e) => e.color)}
        height={300}
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
