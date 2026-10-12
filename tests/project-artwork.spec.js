import { test, expect } from "@playwright/test";
import { selectedWork } from "../src/selected-work";

test("all six supplied artworks load without cropping in cards and existing detail views", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("m2-theme", "light"));
  await page.goto("/");
  for (const width of [375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const project of selectedWork) {
      const card = page.locator(".selected-work-card").filter({
        has: page.getByRole("heading", { name: project.title, exact: true }),
      });
      const image = card.getByRole("img", { name: project.imageAlt });
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("src", `${project.image}.webp`);
      await expect
        .poll(() => image.evaluate((el) => el.complete && el.naturalWidth > 0))
        .toBe(true);
      const geometry = await image.evaluate((el) => ({
        w: el.clientWidth,
        h: el.clientHeight,
        fit: getComputedStyle(el).objectFit,
      }));
      expect(geometry.w / geometry.h).toBeCloseTo(4 / 3, 1);
      expect(geometry.fit).toBe("contain");
      await card
        .getByRole("button", { name: `Explore concept: ${project.title}` })
        .click();
      const dialog = page.getByRole("dialog", {
        name: `${project.title} — project concept`,
      });
      const hero = dialog.getByRole("img", { name: project.imageAlt });
      await hero.scrollIntoViewIfNeeded();
      await expect
        .poll(() => hero.evaluate((el) => el.complete && el.naturalWidth > 0))
        .toBe(true);
      await expect(hero).toHaveAttribute("src", `${project.image}.webp`);
      await expect(
        dialog.getByText(
          "AI-generated concept artwork. Names, dashboards and metrics are illustrative.",
        ),
      ).toBeVisible();
      expect(
        await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
      await page.keyboard.press("Escape");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
