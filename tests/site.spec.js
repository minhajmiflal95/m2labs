import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("m2-theme", "light");
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("loads the studio, all service groups and local artwork without runtime errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Better digital.",
  );
  await expect(page.locator(".service-row")).toHaveCount(4);
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".hero-image")).toBeVisible();
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".project-art img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test("menu traps focus, navigates to a section, and closes with Escape", async ({
  page,
}) => {
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open menu" });
  await opener.click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBe(
    true,
  );
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await menu.getByRole("link", { name: "Our services" }).click();
  await expect(menu).toHaveCount(0);
  await expect(page).toHaveURL(/#services$/);
});

test("filters concept work and opens accessible project details", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Digital systems", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: /Explore Orbit workspace concept/ })
    .click();
  const dialog = page.getByRole("dialog", { name: "Orbit workspace concept" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("CONCEPT ONLY");
  await dialog
    .getByRole("button", { name: "Create something like this" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Start a project" }),
  ).toBeVisible();
  await expect(page.locator("select[name=service]")).toHaveValue(
    "Connected operations",
  );
});

test("enquiry validates fields, preserves editing, and downloads the actual brief", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Let’s build something" }).click();
  const dialog = page.getByRole("dialog", { name: "Start a project" });
  await dialog.getByRole("button", { name: "Prepare my brief" }).click();
  await expect(dialog.getByText("Your brief is ready.")).toHaveCount(0);
  await dialog.getByLabel("Your name").fill("Alex Designer");
  await dialog.getByLabel("Email address").fill("alex@example.com");
  await dialog
    .locator("select[name=service]")
    .selectOption("Connected operations");
  await dialog
    .getByLabel("A little about your idea")
    .fill("We need Microsoft 365 integration for our growing team.");
  await dialog.getByRole("button", { name: "Prepare my brief" }).click();
  await expect(dialog.getByText("Your brief is ready.")).toBeVisible();
  await expect(dialog.locator("pre")).toContainText("Alex Designer");
  const emailLink = new URL(
    await dialog
      .getByRole("link", { name: "Open email to send" })
      .getAttribute("href"),
  );
  expect(emailLink.pathname).toBe("minhajmiflal95@gmail.com");
  expect(emailLink.searchParams.get("subject")).toContain(
    "Connected operations",
  );
  expect(emailLink.searchParams.get("body")).toContain(
    "Microsoft 365 integration",
  );
  const downloadPromise = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Download brief" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("m2-labs-project-brief.txt");
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString()).toContain(
    "Microsoft 365 integration",
  );
  await dialog.getByRole("button", { name: "Edit your details" }).click();
  await expect(dialog.getByLabel("Your name")).toHaveValue("Alex Designer");
});

test("FAQ disclosure and theme controls work", async ({ page }) => {
  await page.goto("/");
  const faq = page.getByRole("button", { name: "Do you work with students?" });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#answer-2")).toBeVisible();
  await faq.click();
  await expect(page.locator("#answer-2")).toBeHidden();
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(page.locator(".site")).toHaveClass(/motion-paused/);
});

test("mobile and narrow layouts fit without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("dialog", { name: "Navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  }
});

test("reduced motion unpins the story and keeps every chapter readable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".story-track")).toHaveClass(/story-quiet/);
  await expect
    .poll(() =>
      page
        .locator(".story-stage")
        .evaluate((el) => getComputedStyle(el).position),
    )
    .toBe("relative");
  await expect(page.locator(".story-chapter")).toHaveCount(3);
});

test("WCAG accessibility scan for landing, form and dark theme", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  const names = await new AxeBuilder({ page })
    .withRules(["label-content-name-mismatch"])
    .analyze();
  expect(names.violations).toEqual([]);
  await page.getByRole("button", { name: "Let’s build something" }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("the page is immediately usable without WebGL or browser storage", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.includes("webgl")) throw new Error("WebGL unavailable");
      return original.call(this, type, ...args);
    };
    Storage.prototype.getItem = () => {
      throw new Error("Storage unavailable");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Let’s build something" }).click();
  await expect(
    page.getByRole("dialog", { name: "Start a project" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await context.close();
});

test("scrolling advances the story and assembles the diagram", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const story = page.locator(".story-track");
  const position = await story.evaluate((el) => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    distance: el.offsetHeight - window.innerHeight,
  }));
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    position.top,
  );
  await expect(story).toHaveAttribute("data-story-phase", "0");
  const initial = await page
    .locator(".story-tile")
    .first()
    .getAttribute("style");
  await page.evaluate(
    ({ top, distance }) =>
      window.scrollTo({ top: top + distance * 0.53, behavior: "instant" }),
    position,
  );
  await expect(story).toHaveAttribute("data-story-phase", "1");
  await expect
    .poll(() => page.locator(".story-tile").first().getAttribute("style"))
    .not.toBe(initial);
  await page.evaluate(
    ({ top, distance }) =>
      window.scrollTo({ top: top + distance * 0.98, behavior: "instant" }),
    position,
  );
  await expect(story).toHaveAttribute("data-story-phase", "2");
  await expect(page.locator(".diagram-phase")).toContainText("Evolve");
  await context.close();
});

test("service disclosures show deliverables and carry the selection into enquiries", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /Systems & IT support/ });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-content-1")).toContainText(
    "Microsoft 365",
  );
  await expect(page.locator("#service-content-1")).toContainText(
    "Documentation, handover",
  );
  await page
    .locator("#service-content-1")
    .getByRole("button", { name: "Let’s talk about your project" })
    .click();
  await expect(page.locator("select[name=service]")).toHaveValue(
    "Connected operations",
  );
});
