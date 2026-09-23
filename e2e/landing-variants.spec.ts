import { test, expect } from "@playwright/test";

// Hormozi-style paid-traffic landing variants (/lp/{tutoring,apex}/{a,b,c}).
// Every variant must: render one h1, keep the callback form on the page,
// expose the phone number, and stay out of search indexes.
const variants = ["tutoring", "apex"].flatMap((program) =>
  ["a", "b", "c"].map((v) => `/lp/${program}/${v}`)
);

for (const path of variants) {
  test(`landing variant ${path} renders the conversion essentials`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status(), `status for ${path}`).toBeLessThan(400);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("form#callback")).toBeAttached();
    await expect(page.getByRole("link", { name: /214-1810/ }).first()).toBeVisible();
    // Primary CTA points at the callback form.
    await expect(page.locator('a[href="#callback"]').first()).toBeVisible();

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });
}

test("landing variants never scroll sideways on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  for (const path of variants) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(0);
  }
});

test("landing preview index links every variant", async ({ page }) => {
  await page.goto("/lp");
  for (const path of variants) {
    await expect(page.locator(`a[href="${path}"]`)).toBeVisible();
  }
});

test("unknown landing variant 404s", async ({ page }) => {
  const res = await page.goto("/lp/apex/z");
  expect(res?.status()).toBe(404);
});
