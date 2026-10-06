import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage();
await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
for (const kind of ["forma", "orbit"]) {
  const data = await page.evaluate(async (kind) => {
    const { renderArtwork } = await import("/src/artwork.js");
    return renderArtwork(kind);
  }, kind);
  await writeFile(
    `public/images/${kind}.png`,
    Buffer.from(data.split(",")[1], "base64"),
  );
  console.log(`Generated ${kind}.png`);
}
await browser.close();
