import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  servicePages,
  serviceBySlug,
  legacyServiceAliases,
} from "../src/service-pages";
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
  await expect(page.locator(".directory-card")).toHaveCount(7);
  await page.getByRole("button", { name: "Services", exact: true }).click();
  const menu = page.locator("#service-mega-menu");
  await expect(menu).toBeVisible();
  await expect(menu.locator(".service-menu-groups a")).toHaveCount(7);
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
  await expect(mobile.locator(".service-menu-groups a")).toHaveCount(7);
  await mobile
    .getByRole("link", { name: "Cloud Computing Solutions", exact: true })
    .click();
  await expect(mobile).toHaveCount(0);
  await expect(page).toHaveURL(/services\/cloud-computing$/);
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["cloud-computing"].headline,
  );
});
test("service navigation preserves history and scroll without replaying the splash", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/services/web-development");
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  await page.locator(".related-card").first().scrollIntoViewIfNeeded();
  const saved = await page.evaluate(() => scrollY);
  await page.locator(".related-card").first().click();
  await expect(page).toHaveURL(/software-development$/);
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["software-development"].headline,
  );
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(10);
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["web-development"].headline,
  );
  await expect
    .poll(async () => Math.abs((await page.evaluate(() => scrollY)) - saved))
    .toBeLessThan(8);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["software-development"].headline,
  );
  await page.getByRole("button", { name: "Services", exact: true }).click();
  await page
    .locator("#service-mega-menu")
    .getByRole("link", { name: "Cloud Computing Solutions", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["cloud-computing"].headline,
  );
  await context.close();
});
test("responsive service layouts, images and WCAG work in both themes", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of servicePages.map((service) => service.slug)) {
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
            .evaluateAll(
              (images) =>
                images.length > 0 &&
                images.every((img) => img.complete && img.naturalWidth > 0),
            ),
        )
        .toBe(true);
    }
  }
  for (const theme of ["light", "dark"])
    for (const service of servicePages) {
      await page.goto(service.path);
      await expect(page.locator("h1")).toHaveText(service.headline);
      if (theme === "dark")
        await page.getByRole("button", { name: "Switch to dark mode" }).click();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations, `${theme} ${service.slug}`).toEqual([]);
    }
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
  await expect(page.locator(".directory-card")).toHaveCount(7);
});

test("legacy service URLs redirect to the appropriate canonical page", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const [oldSlug, newSlug] of Object.entries(legacyServiceAliases)) {
    await page.goto(`/services/${oldSlug}`);
    await expect(page).toHaveURL(new RegExp(`/services/${newSlug}$`));
    await expect(page.locator("h1")).toHaveText(
      serviceBySlug[newSlug].headline,
    );
  }
});

test("every service has its own interactive environment and accurate technology assets", async ({
  page,
}) => {
  test.setTimeout(120000);
  const compositions = new Set();
  for (const service of servicePages) {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(service.path);
    const environment = page.locator(".service-environment");
    await expect(environment).toHaveAttribute(
      "data-environment",
      service.environment,
    );
    await expect(environment).toHaveClass(/environment-quiet/);
    compositions.add(await environment.getAttribute("data-environment"));
    const nodes = environment.locator(".env-node");
    await nodes.first().focus();
    await expect(nodes.first()).toHaveAttribute("aria-pressed", "true");
    await expect(environment.locator(".env-description")).not.toContainText(
      "hover, focus or tap",
    );
    const tiles = page.locator(".technology-tile");
    expect(
      await tiles.evaluateAll((elements) =>
        elements.map((el) => el.dataset.technology),
      ),
    ).toEqual(service.technologies);
    await tiles.first().scrollIntoViewIfNeeded();
    await tiles.first().getByRole("button").focus();
    await expect(tiles.first().getByRole("tooltip")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tiles.first().getByRole("tooltip")).not.toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(".service-environment img,.technology-tile img")
          .evaluateAll((images) =>
            images.every((img) => img.complete && img.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(errors).toEqual([]);
  }
  expect(compositions.size).toBe(7);
});

test("service environment motion responds to pointer input and the animation pause control", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/services/software-development");
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  const env = page.locator(".service-environment");
  await expect(env).not.toHaveClass(/environment-quiet/);
  const packet = env.locator(".env-packet").first();
  await expect
    .poll(() => packet.evaluate((el) => getComputedStyle(el).animationName))
    .toBe("environment-packet");
  const initial = await packet.evaluate(
    (el) => getComputedStyle(el).strokeDashoffset,
  );
  await expect
    .poll(() => packet.evaluate((el) => getComputedStyle(el).strokeDashoffset))
    .not.toBe(initial);
  await env.hover();
  await expect(env).toHaveAttribute("style", /--env-x/);
  await page
    .getByRole("button", { name: "Pause animation", exact: true })
    .click();
  await expect(env).toHaveClass(/environment-quiet/);
  await expect
    .poll(() => packet.evaluate((el) => getComputedStyle(el).animationName))
    .toBe("none");
  await context.close();
});

test("legacy cloud route preserves campaign parameters and contact anchor", async ({
  page,
}) => {
  await page.goto("/services/microsoft-365-cloud?source=bookmark#contact");
  await expect(page).toHaveURL(
    /services\/cloud-computing\?source=bookmark#contact$/,
  );
  await expect(page.locator("h1")).toHaveText(
    serviceBySlug["cloud-computing"].headline,
  );
});
