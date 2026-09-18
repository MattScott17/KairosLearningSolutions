import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", heading: /fall/i, title: /Kairos Learning Solutions/ },
  { path: "/apex", heading: /APEX/, title: /APEX/ },
  { path: "/about", heading: /whole child/i, title: /About/ },
  { path: "/services", heading: /find the support/i, title: /Services/ },
  { path: "/services/private-tutoring", heading: /Private Tutoring/, title: /Private Tutoring/ },
  { path: "/services/homework-club", heading: /Homework Club/, title: /Homework Club/ },
  { path: "/services/homeschool-support", heading: /Homeschool Support/, title: /Homeschool Support/ },
  { path: "/fall-classes", heading: /Classes & Enrichment/, title: /Classes/ },
  { path: "/summer", heading: /summer of curiosity/i, title: /Summer/ },
  { path: "/testimonials", heading: /Stories from our families/i, title: /Testimonials/ },
  { path: "/contact", heading: /talk about your student/i, title: /Contact/ },
];

for (const p of pages) {
  test(`page ${p.path} loads with heading, title, nav and footer`, async ({ page }) => {
    const response = await page.goto(p.path);
    expect(response?.status(), `status for ${p.path}`).toBeLessThan(400);

    await expect(page).toHaveTitle(p.title);
    await expect(page.locator("h1")).toContainText(p.heading);

    // Shared chrome present
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // Phone number appears somewhere on the page
    await expect(page.getByRole("link", { name: /214-1810/ }).first()).toBeVisible();
  });
}

test("404 page renders for unknown route", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/summer break/i);
});

test("primary navigation links work", async ({ page }) => {
  await page.goto("/");
  // Desktop nav "About" link
  const aboutLink = page.getByRole("link", { name: "About", exact: true }).first();
  if (await aboutLink.isVisible()) {
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("h1")).toContainText(/whole child/i);
  }
});

test("contact form validates required fields client-side", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send message/i }).click();
  // Validation error appears; no navigation happened
  await expect(page.getByText(/fix the highlighted fields/i)).toBeVisible();
  await expect(page.getByText(/please enter your name/i)).toBeVisible();
});

test("contact form submits and shows a response", async ({ page }) => {
  // Intercept the API so the test doesn't depend on email config.
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/contact");
  await page.getByLabel(/name/i).first().fill("Test Parent");
  await page.getByLabel(/email/i).first().fill("parent@example.com");
  await page.getByLabel(/message/i).fill("My 5th grader needs help with math this fall.");
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText(/message sent/i)).toBeVisible();
});

test("home exposes JSON-LD organization structured data", async ({ page }) => {
  await page.goto("/");
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toContain("EducationalOrganization");
  expect(ld).toContain("Kairos Learning Solutions");
});
