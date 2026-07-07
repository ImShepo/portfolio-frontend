import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test("projects index renders grid", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: /filter projects/i })).toBeVisible();
    await expect(page.locator("main a[href^='/projects/']").first()).toBeVisible();
  });

  test("project detail page renders", async ({ page }) => {
    await page.goto("/projects/real-time-dashboard");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/real-time analytics dashboard/i);
    await expect(page.getByRole("link", { name: /back to projects|volver|voltar|retour/i })).toBeVisible();
  });
});
