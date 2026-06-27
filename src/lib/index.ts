import { browser } from "$app/env";

export const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

export const countPixels = (url: string) =>
  new Promise<{ color: string; percentage: number }[]>((resolve, reject) => {
    if (!browser) return resolve([]);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx === null) return reject("Missing canvas context");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const pixelMap = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4) {
        const hex = rgbToHex(data[i], data[i + 1], data[i + 2]);
        pixelMap.set(hex, (pixelMap.get(hex) ?? 0) + 1);
      }
      for (const [key, value] of pixelMap.entries().toArray()) {
        const newValue = (value * 4) / data.length;
        if (newValue > 0.01) {
          pixelMap.set(key, newValue);
        } else {
          pixelMap.set("white", (pixelMap.get("white") ?? 0) + value);
          pixelMap.delete(key);
        }
      }
      if (pixelMap.has("white")) {
        const newValue = (pixelMap.get("white")! * 4) / data.length;
        if (newValue < 0.01) {
          console.log("Deleting", newValue);
          pixelMap.delete("white");
        } else {
          pixelMap.set("white", newValue);
        }
      }
      resolve(
        pixelMap
          .entries()
          .map(([color, percentage]) => ({ color, percentage }))
          .toArray(),
      );
    };
    img.src = url;
  });
