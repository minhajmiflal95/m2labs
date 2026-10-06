import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    sessionStorage.setItem("m2-intro-seen", "true");
    localStorage.setItem("m2-theme", "light");
  });
  page.on("pageerror", (error) => console.log("ERROR:", error.message));
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.locator(".hero-visual canvas").waitFor({ timeout: 20000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.screenshot({ path: `/tmp/m2-${name}.png` });
  console.log(
    name,
    await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      images: [...document.images]
        .filter((x) => !x.complete || !x.naturalWidth)
        .map((x) => x.src),
      canvas: document.querySelectorAll("canvas").length,
    })),
  );
  await page
    .getByRole("heading", { name: "A glimpse of what could be." })
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/m2-${name}-work.png` });
  await page.close();
}
await browser.close();
