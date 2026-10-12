import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { selectedWork } from "../src/selected-work";
import { serviceBySlug } from "../src/service-pages";
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
});
test("six illustrative briefs have complete details, relevant routes and selected enquiries", async ({
  page,
}) => {
  await page.goto("/");
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const work = page.locator("#work");
  await expect(work.locator("article.selected-work-card")).toHaveCount(6);
  for (const project of selectedWork) {
    const card = work.locator("article").filter({
      has: page.getByRole("heading", { name: project.title, exact: true }),
    });
    await expect(card.getByText(project.label, { exact: true })).toBeVisible();
    await card
      .getByRole("button", { name: `Explore concept: ${project.title}` })
      .click();
    const dialog = page.getByRole("dialog", {
      name: `${project.title} — project concept`,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(".work-detail-approach article")).toHaveCount(
      3,
    );
    await expect(dialog.locator(".work-detail-scope li")).toHaveCount(4);
    await expect(
      dialog.getByText(project.challenge, { exact: true }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: /Explore / }),
    ).toHaveAttribute("href", serviceBySlug[project.service].path);
    await dialog
      .getByRole("button", { name: "Discuss a similar idea" })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Start a project" }),
    ).toBeVisible();
    await expect(page.locator("select[name=service]")).toHaveValue(
      serviceBySlug[project.service].title,
    );
    await page.keyboard.press("Escape");
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
  }
  expect(errors).toEqual([]);
});
test("work cards, project dialogs and keyboard focus fit all requested widths", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const button = page.getByRole("button", {
      name: `Explore concept: ${selectedWork[0].title}`,
    });
    await button.scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await button.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: /Retail Inventory & POS/ });
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(button).toBeFocused();
  }
});
test("selected work and concept detail are accessible in both themes", async ({
  page,
}) => {
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await page.locator("#work").scrollIntoViewIfNeeded();
    let result = await new AxeBuilder({ page })
      .include("#work")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page
      .getByRole("button", {
        name: `Explore concept: ${selectedWork[3].title}`,
      })
      .click();
    result = await new AxeBuilder({ page })
      .include(".work-detail-modal")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.keyboard.press("Escape");
  }
});
test("favicon head links and transparent icon assets load through the browser", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const asset of [
    "favicon.svg",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
  ]) {
    expect((await request.get("/" + asset)).status()).toBe(200);
    await expect(page.locator(`head link[href^="/${asset}"]`)).toHaveCount(1);
  }
  const dimensions = await page.evaluate(async () =>
    Promise.all(
      [16, 32].map(async (size) => {
        const image = new Image();
        image.src = `/favicon-${size}x${size}.png`;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        return {
          size: image.naturalWidth,
          cornerAlpha: ctx.getImageData(0, 0, 1, 1).data[3],
        };
      }),
    ),
  );
  expect(dimensions).toEqual([
    { size: 16, cornerAlpha: 0 },
    { size: 32, cornerAlpha: 0 },
  ]);
});
