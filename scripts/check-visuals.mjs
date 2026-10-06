import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `/tmp/m2-${name}.png` });
  for (const id of ["service-experience", "approach", "work", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page
      .locator(`#${id}`)
      .screenshot({ path: `/tmp/m2-${name}-${id}.png` });
  }
  console.log(
    name,
    await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images]
        .filter((image) => image.complete && !image.naturalWidth)
        .map((image) => image.src),
    })),
    { errors },
  );
  await page.close();
}
await browser.close();
