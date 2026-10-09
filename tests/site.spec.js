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
    "Ideas to Impact.",
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
    const cardFillsCell = await page
      .locator(".illustrated-card")
      .first()
      .evaluate(
        (el) =>
          Math.abs(
            el.getBoundingClientRect().width -
              el.parentElement.getBoundingClientRect().width,
          ) < 2,
      );
    expect(
      cardFillsCell,
      `service card fills its grid cell at ${width}px`,
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

test("every flow item has contextual artwork and hover restores the selected service", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(9);
  const drawings = new Set();
  for (let i = 0; i < 9; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#flow-panel")).toHaveAttribute(
      "data-scene",
      String(i),
    );
    const art = page.locator("#flow-panel .service-scene");
    await expect(art).toHaveCount(1);
    drawings.add(await art.getAttribute("aria-label"));
  }
  expect(drawings.size).toBe(9);
  await tabs.nth(0).hover();
  await expect(page.locator("#flow-panel")).toHaveAttribute("data-scene", "0");
  await page.locator("h1").hover();
  await expect(page.locator("#flow-panel")).toHaveAttribute("data-scene", "8");
});

test("flow menu supports focus, arrow keys, and selected enquiries", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tabs.nth(8)).toBeFocused();
  await page.getByRole("button", { name: "Explore this service" }).click();
  await expect(page.locator("select[name=service]")).toHaveValue(
    "Your next breakthrough",
  );
});

test("touch selection stays active and rapid switching settles without overflow", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  for (const i of [1, 4, 7, 2, 8]) await page.getByRole("tab").nth(i).tap();
  await expect(page.locator("#flow-panel")).toHaveAttribute("data-scene", "8");
  await expect(page.locator("#flow-panel .flow-content")).toHaveCount(1);
  await expect(page.getByRole("tab").nth(8)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("intro dismisses automatically, remembers the visit and the cube responds to a pointer", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0, { timeout: 5000 });
  expect(await page.evaluate(() => sessionStorage.getItem("m2-welcomed"))).toBe(
    "1",
  );
  await page.reload();
  await expect(
    page.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  const cube = page.locator(".brand-orbit .cube-perspective");
  await cube.hover();
  await expect(cube).toHaveAttribute("style", /--cube-x/);
  await context.close();
});

test("navigation illustrates every focused destination", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation" });
  const labels = new Set();
  for (const link of await menu.locator("nav a").all()) {
    await link.focus();
    await expect(link).toHaveClass(/menu-active/);
    await expect(menu.locator(".service-scene")).toHaveCount(1);
    labels.add(await menu.locator(".service-scene").getAttribute("aria-label"));
  }
  expect(labels.size).toBe(5);
});

test("cinematic hero controls wrap, support keyboard navigation and keep the enquiry available", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "M² Labs highlights" });
  await expect(hero).toHaveAttribute("data-slide", "0");
  await hero.getByRole("button", { name: "Next hero slide" }).click();
  await expect(hero).toHaveAttribute("data-slide", "1");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText(
    "Built Around You.",
  );
  await page.keyboard.press("ArrowRight");
  await expect(hero).toHaveAttribute("data-slide", "2");
  await hero.getByRole("button", { name: "Next hero slide" }).click();
  await expect(hero).toHaveAttribute("data-slide", "0");
  await hero.getByRole("button", { name: "Previous hero slide" }).click();
  await expect(hero).toHaveAttribute("data-slide", "2");
  await expect(
    hero.getByRole("button", { name: /Show slide 3/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    hero.getByRole("button", { name: /Play hero slides|Pause hero slides/ }),
  ).toHaveCount(0);
  await hero.getByRole("button", { name: "Let’s build something" }).click();
  await expect(
    page.getByRole("dialog", { name: "Start a project" }),
  ).toBeVisible();
});

test("hero autoplay advances and stops after manual selection", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem("m2-welcomed", "1"));
  await page.goto("/");
  const hero = page.locator(".hero-cinema");
  await expect(hero).toHaveClass(/is-playing/);
  await expect(hero).toHaveAttribute("data-slide", "1", { timeout: 10000 });
  await hero.getByRole("button", { name: /Show slide 3/ }).click();
  await expect(hero).toHaveAttribute("data-slide", "2");
  await expect(
    hero.getByRole("button", { name: "Play hero slides" }),
  ).toBeVisible();
  await page.locator(".logo").first().focus();
  await page.mouse.move(0, 0);
  await expect(hero).not.toHaveClass(/is-playing/);
  await context.close();
});

test("hero responds to a horizontal touch swipe without horizontal overflow", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  const stage = page.locator(".cinema-art");
  await stage.scrollIntoViewIfNeeded();
  const box = await stage.boundingBox();
  const session = await context.newCDPSession(page);
  const y = box.y + box.height / 2;
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: box.x + box.width * 0.8, y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: box.x + box.width * 0.2, y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator(".hero-cinema")).toHaveAttribute("data-slide", "1");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("supplied artwork is mapped across sections and responsive images load", async ({
  page,
}) => {
  await page.goto("/");
  const assets = await page
    .locator("img.service-scene")
    .evaluateAll((images) => [
      ...new Set(images.map((img) => img.getAttribute("src"))),
    ]);
  expect(assets).toHaveLength(8);
  for (const section of [
    "#home",
    "#service-experience",
    "#services",
    "#approach",
    "#work",
    "#studio",
    ".technology-strip",
    "#questions",
    "#contact",
  ]) {
    const art = page.locator(`${section} img.service-scene`).first();
    await art.scrollIntoViewIfNeeded();
    await expect(art).toBeVisible();
    await expect
      .poll(() => art.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
    await expect(art).toHaveAttribute(
      "srcset",
      /480.webp 480w.*960.webp 960w.*1448.webp 1448w/,
    );
  }
});

test("header theme toggle persists and light mode styles cards and form controls", async ({
  browser,
}) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:5173",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const toggle = page.getByRole("button", { name: "Switch to light mode" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect
    .poll(() =>
      page
        .locator(".illustrated-card")
        .first()
        .evaluate((el) => getComputedStyle(el).boxShadow),
    )
    .not.toBe("none");
  await page.getByRole("button", { name: "Let’s build something" }).click();
  const form = page.getByRole("dialog", { name: "Start a project" });
  await expect(form).toBeVisible();
  await expect
    .poll(() =>
      form
        .locator("input")
        .first()
        .evaluate((el) => getComputedStyle(el).boxShadow),
    )
    .toContain("inset");
  await context.close();
});

test("mobile controls and dialogs fit in both themes", async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    for (const theme of ["dark", "light"]) {
      await page
        .getByRole("button", { name: `Switch to ${theme} mode` })
        .click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const toggle = page.locator(".theme-toggle");
      const box = await toggle.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Navigation" });
      await expect(menu).toBeVisible();
      expect(
        await menu.evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      await page.keyboard.press("Escape");
    }
  }
});

test("cinematic intro can be skipped immediately and is omitted for reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Welcome to M² Labs" });
  await expect(intro).toBeVisible();
  await intro.getByRole("button", { name: "Skip intro" }).click();
  await expect(intro).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const quietPage = await reduced.newPage();
  await quietPage.goto("/");
  await expect(
    quietPage.getByRole("dialog", { name: "Welcome to M² Labs" }),
  ).toHaveCount(0);
  await reduced.close();
});
