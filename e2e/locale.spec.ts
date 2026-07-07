import { test, expect } from "@playwright/test";

test.describe("Locale switching", () => {
  test("switches navigation labels to Spanish", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("language-switcher-desktop").click();
    await page.getByRole("menuitem", { name: "Español" }).click();

    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    const mainNav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(mainNav.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(mainNav.getByRole("link", { name: "Proyectos" })).toBeVisible();
  });
});
