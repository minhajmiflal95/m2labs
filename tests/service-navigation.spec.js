import { test, expect } from "@playwright/test";
import { servicePages } from "../src/service-pages";
const widths = [320, 375, 390, 768, 1024, 1280, 1440, 1920];
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
});
test("header menu stays aligned and contained at every requested width", async ({
  page,
}) => {
  await page.goto("/services");
  for (const width of widths) {
    await page.setViewportSize({ width, height: 850 });
    if (width > 1100) {
      const trigger = page.getByRole("button", {
        name: "Services",
        exact: true,
      });
      await trigger.hover();
      const menu = page.locator("#service-mega-menu");
      await expect(menu).toBeVisible();
      const box = await menu.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      const home = await page.locator(".desktop-nav > a").first().boundingBox();
      const button = await trigger.boundingBox();
      expect(
        Math.abs(home.y + home.height / 2 - button.y - button.height / 2),
      ).toBeLessThan(2);
      await page.mouse.move(box.x + box.width / 2, box.y + 20);
      await expect(menu).toBeVisible();
      await page.mouse.move(10, 600);
      await expect(menu).toHaveCount(0);
      await trigger.click();
      await expect(menu).toBeVisible();
      await trigger.click();
      await expect(menu).toHaveCount(0);
      await trigger.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Space");
      await expect(menu).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(
        menu.getByRole("link", { name: /Explore all services/ }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await page.keyboard.press("ArrowDown");
      await expect(
        menu.locator(".service-menu-groups a").first(),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await page.keyboard.press("Enter");
      await expect(menu).toBeVisible();
      await page.mouse.click(10, 600);
      await expect(menu).toHaveCount(0);
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        page.getByRole("dialog", { name: "Navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("dialog[open]")).toHaveCount(0);
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
        "hidden",
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 360 });
  await page.getByRole("button", { name: "Services", exact: true }).hover();
  const menu = page.locator("#service-mega-menu");
  const short = await menu.boundingBox();
  expect(short.y + short.height).toBeLessThanOrEqual(360);
  await menu.hover();
  await page.mouse.wheel(0, 600);
  await expect
    .poll(() => menu.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(menu).toHaveCount(0);
});
test("homepage service selector uses native vertical scrolling and matching panel labels", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of widths) {
    await page.setViewportSize({ width, height: 850 });
    await page.mouse.move(5, 50);
    const list = page.locator(".flow-tabs");
    await list.scrollIntoViewIfNeeded();
    expect(
      await list.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
    await page.locator("#flow-tab-8").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#flow-panel")).toHaveAttribute(
      "data-scene",
      "8",
    );
    await expect(page.locator("#flow-panel")).toHaveAttribute(
      "aria-labelledby",
      "flow-tab-8",
    );
    await page.keyboard.press("Home");
    await expect(page.locator("#flow-tab-0")).toBeFocused();
    await page.keyboard.press("End");
    await expect(page.locator("#flow-tab-8")).toBeFocused();
    await list.scrollIntoViewIfNeeded();
    const start = await page.evaluate(() => scrollY);
    await list.hover();
    await page.mouse.wheel(0, 300);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(start + 50);
    await page.mouse.wheel(0, -300);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeLessThan(start + 50);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
});
test("each service scrolls both directions, reloads and restores history without runtime errors", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const service of servicePages) {
    await page.goto(service.path);
    await expect(page.locator("h1")).toHaveText(service.headline);
    await page.reload();
    await expect(page.locator("h1")).toHaveText(service.headline);
    for (const section of await page.locator(".detail-section").all()) {
      await section.scrollIntoViewIfNeeded();
      const start = await page.evaluate(() => scrollY);
      await page.mouse.move(20, 700);
      await page.mouse.wheel(0, 220);
      await page.waitForTimeout(100);
      const bottom = await page.evaluate(
        () => document.documentElement.scrollHeight - innerHeight,
      );
      expect(await page.evaluate(() => scrollY)).toBeGreaterThanOrEqual(
        Math.min(start + 50, bottom),
      );
      await page.mouse.wheel(0, -220);
      await page.waitForTimeout(100);
      expect(await page.evaluate(() => scrollY)).toBeLessThanOrEqual(
        start + 10,
      );
    }
    await page.locator(".related-card").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
    const saved = await page.evaluate(() => scrollY);
    await page.locator(".related-card").first().click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.goBack();
    await expect(page.locator("h1")).toHaveText(service.headline);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(saved, 0);
    await page.goForward();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  }
  expect(errors).toEqual([]);
});
test("touch menu, momentum scrolling and orientation changes leave the page unlocked", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Open menu" }).tap();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await dialog.locator(".service-menu-groups a").last().tap();
  await expect(dialog).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await expect(page.locator("h1")).toHaveText(
    servicePages.find((s) => s.slug === "university-project-support").headline,
  );
  const session = await context.newCDPSession(page);
  const swipe = async (x, start, end) => {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y: start }],
    });
    const step = end > start ? 30 : -30;
    for (let y = start + step; step > 0 ? y <= end : y >= end; y += step) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x, y }],
      });
      await page.waitForTimeout(16);
    }
    await session.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect
      .poll(async () => {
        const y = await page.evaluate(() => scrollY);
        await page.waitForTimeout(200);
        return Math.abs((await page.evaluate(() => scrollY)) - y);
      })
      .toBeLessThan(1);
  };
  await swipe(180, 700, 250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect
    .poll(async () => {
      const y = await page.evaluate(() => scrollY);
      await page.waitForTimeout(200);
      return Math.abs((await page.evaluate(() => scrollY)) - y);
    })
    .toBeLessThan(1);
  await page.setViewportSize({ width: 844, height: 390 });
  await page.getByRole("button", { name: "Open menu" }).tap();
  await page.getByRole("button", { name: "Close dialog" }).tap();
  const before = await page.evaluate(() => scrollY);
  await swipe(300, 100, 350);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(before);
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("button", { name: "Open menu" }).tap();
    await page
      .getByRole("dialog", { name: "Navigation" })
      .locator(".service-menu-groups a")
      .first()
      .tap();
    await expect(page.locator("h1")).toHaveText(servicePages[0].headline);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await context.close();
});
test("late mounted hash target respects measured header and normal motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.route("**/src/pages/ServicePage.jsx*", async (route) => {
    await new Promise((r) => setTimeout(r, 1200));
    await route.continue();
  });
  await page.goto("http://127.0.0.1:5173/services/web-development#contact");
  const skip = page.getByRole("button", { name: /Skip intro/ });
  if (await skip.isVisible()) await skip.click();
  await expect(page.locator("h1")).toBeVisible();
  await expect
    .poll(async () =>
      page
        .locator("#contact")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeGreaterThanOrEqual(86);
  await expect
    .poll(async () =>
      page
        .locator("#contact")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBeLessThan(140);
  await page
    .locator(".header")
    .screenshot({ path: "/tmp/m2-fixed-services-header.png" });
  await page.mouse.wheel(0, 1500);
  await page.mouse.wheel(0, -1500);
  await context.close();
});

test("all service pages fit the remaining narrow and wide requested widths", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const width of [320, 390, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const service of servicePages) {
      await page.goto(service.path);
      await expect(page.locator("h1")).toHaveText(service.headline);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${service.slug} at ${width}`,
      ).toBe(true);
    }
  }
});

test("pause and resume preserve scroll after client-side service navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/services");
  await page.locator("h1").waitFor();
  const skip = page.getByRole("button", { name: /Skip intro/ });
  if (await skip.isVisible()) await skip.click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await page.getByRole("button", { name: "Services", exact: true }).click();
  await page
    .locator("#service-mega-menu")
    .getByRole("link", { name: "IT Support & Infrastructure", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(
    servicePages.find((s) => s.slug === "it-support").headline,
  );
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const pause = page.getByRole("button", {
    name: "Pause animation",
    exact: true,
  });
  await pause.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const saved = await page.evaluate(() => scrollY);
  expect(saved).toBeGreaterThan(1000);
  await pause.click();
  await expect(
    page.getByRole("button", { name: "Resume animation", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  expect(Math.abs((await page.evaluate(() => scrollY)) - saved)).toBeLessThan(
    2,
  );
  await page
    .getByRole("button", { name: "Resume animation", exact: true })
    .click();
  await page.waitForTimeout(300);
  expect(Math.abs((await page.evaluate(() => scrollY)) - saved)).toBeLessThan(
    2,
  );
  await context.close();
});
