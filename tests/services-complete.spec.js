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
  await expect(portal).toHaveAttribute("data-gp-choosing", "true");
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
  test(`portal selects all six letters and replays the camera on ${mobile ? "touch mobile" : "desktop"}`, async ({
    browser,
  }) => {
    test.setTimeout(120000);
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
    await expect(
      page.getByRole("dialog", { name: "Welcome to M² Labs" }),
    ).toHaveCount(0);
    const act = async (locator) => {
      await expect(locator).toBeVisible();
      const box = await locator.boundingBox();
      if (mobile)
        await page.touchscreen.tap(
          box.x + box.width / 2,
          box.y + box.height / 2,
        );
      else
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    };
    for (let repeat = 0; repeat < 2; repeat++)
      for (let i = 0; i < 6; i++) {
        const { portal, top, travel } = await alignPortal(page);
        const trigger = portal.getByRole("button", {
          name: /^Choose entry letter/,
        });
        await act(trigger);
        const option = portal.getByRole("option").nth(i);
        await act(option);
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(portal).toHaveAttribute("data-gp-focus-index", String(i));
        await expect(portal.locator("[data-gp-option]").nth(i)).toHaveAttribute(
          "aria-selected",
          "true",
        );
        await expect(portal.locator("[data-gp-selection]")).toContainText(
          "CREATE"[i],
        );
        const before = await portal
          .locator("[data-gp-glyph]")
          .getAttribute("transform");
        await page.evaluate(
          ({ top, travel }) =>
            scrollTo({ top: top + travel * 0.5, behavior: "instant" }),
          { top, travel },
        );
        await expect
          .poll(() =>
            portal.locator("[data-gp-glyph]").getAttribute("transform"),
          )
          .not.toBe(before);
        await page.evaluate(
          ({ top, travel }) =>
            scrollTo({ top: top + travel * 0.95, behavior: "instant" }),
          { top, travel },
        );
        await expect(portal).toHaveAttribute("data-gp-entered", "true");
        await expect(
          portal.getByRole("heading", { name: "Step into what’s possible." }),
        ).toBeVisible();
      }
    const { portal } = await alignPortal(page);
    const trigger = portal.getByRole("button", {
      name: /^Choose entry letter/,
    });
    await act(trigger);
    if (mobile) await page.touchscreen.tap(5, 120);
    else await page.mouse.click(5, 120);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await act(trigger);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(portal.getByRole("option").last()).toBeFocused();
    await page.keyboard.press("Home");
    await page.keyboard.press("Enter");
    await expect(portal).toHaveAttribute("data-gp-focus-index", "0");
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await alignPortal(page);
      await act(trigger);
      const box = await portal.locator("[data-gp-options]").boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(900);
      await act(portal.getByRole("option").nth(3));
      await expect(portal).toHaveAttribute("data-gp-focus-index", "3");
    }
    await page.setViewportSize({ width: 844, height: 390 });
    await alignPortal(page);
    await act(trigger);
    const landscape = await portal.locator("[data-gp-options]").boundingBox();
    expect(landscape.y).toBeGreaterThanOrEqual(0);
    await act(portal.getByRole("option").first());
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
    expect(errors).toEqual([]);
    await context.close();
  });
test("portal remains selectable without animation for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const { portal } = await alignPortal(page);
  await expect(portal).toHaveAttribute("data-gp-motion", "off");
  await portal.getByRole("button", { name: /^Choose entry letter/ }).click();
  await portal.getByRole("option").nth(2).click();
  await expect(portal).toHaveAttribute("data-gp-focus-index", "2");
  await expect(
    portal.getByRole("heading", { name: "Step into what’s possible." }),
  ).toBeVisible();
});

test("open letter chooser has matching names and accessible states in both themes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
    const { portal } = await alignPortal(page);
    await portal.getByRole("button", { name: /^Choose entry letter/ }).click();
    await expect(portal.locator("[data-gp-options]")).toHaveCSS("opacity", "1");
    const result = await new AxeBuilder({ page })
      .include(".labs-portal")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    const names = await new AxeBuilder({ page })
      .include(".labs-portal")
      .withRules(["label-content-name-mismatch"])
      .analyze();
    expect(names.violations).toEqual([]);
    await page.keyboard.press("Escape");
  }
});
