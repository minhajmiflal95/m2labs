import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { servicePages } from "../src/service-pages";
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
async function alignPortal(page) {
  const portal = page.locator(".labs-portal");
  const top = await portal.evaluate(
    (el) => el.getBoundingClientRect().top + scrollY,
  );
  await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), top);
  await expect(portal).toHaveAttribute("data-gp-ready", "true");
  // Scroll paint runs on requestAnimationFrame; do not capture the previous
  // viewport's completed camera transform as the new starting transform.
  await expect
    .poll(async () => Number(await portal.getAttribute("data-gp-progress")))
    .toBeLessThanOrEqual(0.001);
  return {
    portal,
    top,
    travel: await portal.evaluate(
      (el) => parseFloat(el.style.getPropertyValue("--gp-height")) * 1.6,
    ),
  };
}
test("all seven services have complete aligned content at all ten widths", async ({
  page,
}) => {
  test.setTimeout(240000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const service of servicePages) {
      await page.goto(service.path);
      await expect(page.locator("h1")).toHaveText(service.headline);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${service.slug}/${width}`,
      ).toBe(true);
      expect(service.processOutputs).toHaveLength(4);
      expect(new Set(service.processOutputs).size).toBe(4);
      const rows = page.locator(".detail-process > li");
      for (let i = 0; i < 4; i++) {
        const body = rows.nth(i).locator(".process-body");
        await expect(body.locator("details p")).toHaveText(
          service.processOutputs[i],
        );
        expect((await body.boundingBox()).width).toBeGreaterThan(150);
      }
      await rows.first().locator("summary").click();
      await expect(rows.first().locator("details")).toHaveAttribute("open", "");
      const containers = await page
        .locator(".detail-section.shell")
        .evaluateAll((els) =>
          els.map((el) => Math.round(el.getBoundingClientRect().left)),
        );
      expect(new Set(containers).size).toBe(1);
      await expect(page.locator(".detail-hero-art img").first()).toBeVisible();
    }
  }
  expect(errors).toEqual([]);
});

for (const mobile of [false, true])
  test(`portal has no entry selector and retains its automatic reveal on ${mobile ? "mobile" : "desktop"}`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: mobile ? 390 : 1440, height: 900 },
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:5173/");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const { portal, top, travel } = await alignPortal(page);
      await expect(
        portal.locator("button,select,input,[role=radio],[role=listbox]"),
      ).toHaveCount(0);
      await expect(portal.getByText(/Choose entry letter/i)).toHaveCount(0);
      await expect(portal).toHaveAttribute("data-gp-motion", "on");
      const initial = await portal
        .locator("[data-gp-glyph]")
        .getAttribute("transform");
      await page.evaluate(
        ({ top, travel }) =>
          scrollTo({ top: top + travel * 0.95, behavior: "instant" }),
        { top, travel },
      );
      await expect(portal).toHaveAttribute("data-gp-entered", "true");
      await expect
        .poll(() => portal.locator("[data-gp-glyph]").getAttribute("transform"))
        .not.toBe(initial);
      await expect(
        portal.getByRole("heading", { name: "Step into what’s possible." }),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
    await context.close();
  });
test("portal primary content remains accessible for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const { portal } = await alignPortal(page);
  await expect(portal).toHaveAttribute("data-gp-motion", "off");
  await expect(
    portal.locator("button,select,input,[role=radio],[role=listbox]"),
  ).toHaveCount(0);
  await expect(
    portal.getByRole("heading", { name: "Step into what’s possible." }),
  ).toBeVisible();
});
test("portal content remains accessible in both themes without selector controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await alignPortal(page);
    const result = await new AxeBuilder({ page })
      .include(".labs-portal")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
