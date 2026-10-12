import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { servicePages, serviceBySlug } from "../src/service-pages";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
  await page.emulateMedia({ reducedMotion: "reduce" });
});
for (const service of servicePages) {
  test(`${service.title}: direct route, unique content, metadata and enquiry`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(service.path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      service.headline,
    );
    await expect(page).toHaveTitle(`${service.title} — M² Labs`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      service.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://m2lab.netlify.app${service.path}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://m2lab.netlify.app${service.path}`,
    );
    await expect(page.locator(".detail-deliverable")).toHaveCount(3);
    await expect(page.locator(".detail-capability")).toHaveCount(
      service.capabilities.length,
    );
    await expect(page.locator(".detail-process>li")).toHaveCount(4);
    await expect(page.locator(".detail-use-case")).toHaveCount(3);
    await expect(page.locator(".detail-faq details")).toHaveCount(5);
    await expect(page.locator(".related-card")).toHaveCount(3);
    for (const slug of service.related)
      expect(serviceBySlug[slug]).toBeTruthy();
    await page.locator(".detail-faq summary").first().click();
    await expect(
      page
        .locator(".detail-faq details")
        .first()
        .getByText(service.faqs[0][1], { exact: true }),
    ).toBeVisible();
    await page.locator(".detail-actions button").click();
    await expect(
      page.getByRole("dialog", { name: "Start a project" }),
    ).toBeVisible();
    await expect(page.locator('select[name="service"]')).toHaveValue(
      service.title,
    );
    await page.keyboard.press("Escape");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      service.headline,
    );
    expect(errors).toEqual([]);
  });
}
test("directory, mega-menu keyboard navigation and mobile links expose every service", async ({
  page,
}) => {
  await page.goto("/services");
  await expect(page.locator(".directory-card")).toHaveCount(16);
  await page.getByRole("button", { name: "Services", exact: true }).click();
  const menu = page.locator("#service-mega-menu");
  await expect(menu).toBeVisible();
  await expect(menu.locator(".service-menu-groups a")).toHaveCount(16);
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Services", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(menu.locator(".service-menu-groups a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 375, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  const mobile = page.getByRole("dialog", { name: "Navigation" });
  await expect(mobile.locator(".service-menu-groups a")).toHaveCount(16);
  await mobile
    .getByRole("link", { name: "E-commerce Experiences", exact: true })
    .click();
  await expect(mobile).toHaveCount(0);
  await expect(page).toHaveURL(/services\/ecommerce$/);
  await expect(page.locator("h1")).toHaveText(serviceBySlug.ecommerce.headline);
});
test("service navigation preserves history and scroll without replaying the splash", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/services/web-design-development");
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  await page.locator(".related-card").first().scrollIntoViewIfNeeded();
  const saved = await page.evaluate(() => scrollY);
  await page.locator(".related-card").first().click();
  await expect(page).toHaveURL(/ux-ui-design$/);
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["ux-ui-design"].headline,
  );
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(10);
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["web-design-development"].headline,
  );
  await expect
    .poll(async () => Math.abs((await page.evaluate(() => scrollY)) - saved))
    .toBeLessThan(8);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["ux-ui-design"].headline,
  );
  await page.getByRole("button", { name: "Services", exact: true }).click();
  await page
    .locator("#service-mega-menu")
    .getByRole("link", { name: "Microsoft 365 & Cloud Solutions", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["microsoft-365-cloud"].headline,
  );
  await context.close();
});
test("responsive service layouts, images and WCAG work in both themes", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of [
      "web-design-development",
      "microsoft-365-cloud",
      "social-media-marketing",
      "academic-support",
    ]) {
      await page.goto(`/services/${slug}`);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${slug} at ${width}`,
      ).toBe(true);
      await expect
        .poll(() =>
          page
            .locator(".detail-hero-art img")
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
    }
  }
  await page.goto("/services/web-design-development");
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.goto("/services/academic-support");
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("unknown service route has a useful accessible recovery page", async ({
  page,
}) => {
  await page.goto("/services/not-a-service");
  await expect(page.locator("h1")).toHaveText("Let’s find your way.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await page.getByRole("link", { name: "Explore our services" }).click();
  await expect(page.locator(".directory-card")).toHaveCount(16);
});
