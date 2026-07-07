import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.getByRole("link", { name: /skip to main content|saltar|ir para|aller au/i });
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("keyboard navigates primary nav links", async ({ page }) => {
    await page.goto("/");

    const projectsLink = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: /^projects$|proyectos$/i });
    await projectsLink.focus();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Reduced motion", () => {
  test("disables decorative animations under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const prefersReduced = await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    expect(prefersReduced).toBe(true);

    const animationSeconds = await page.evaluate(() => {
      const probe = document.createElement("div");
      document.body.appendChild(probe);
      const raw = getComputedStyle(probe).animationDuration;
      probe.remove();
      if (raw.endsWith("ms")) return parseFloat(raw) / 1000;
      return parseFloat(raw);
    });

    expect(animationSeconds).toBeLessThanOrEqual(0.00002);
  });
});
