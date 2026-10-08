import { test, expect } from "@playwright/test";
import { site } from "../lib/site";

// Last 4+ digits of the business phone, e.g. "500-2520".
const phoneDigits = site.phone.slice(-8);

const pages = [
  { path: "/", heading: /which kairos program/i, title: /Kairos Learning Solutions/ },
  { path: "/apex", heading: /APEX/, title: /APEX/ },
  { path: "/about", heading: /whole child/i, title: /About/ },
  { path: "/services", heading: /programs and prices/i, title: /Tutoring and Homeschool/ },
  { path: "/services/private-tutoring", heading: /Private Tutoring/, title: /Private Tutoring/ },
  { path: "/services/homeschool-support", heading: /Homeschool Support/, title: /Homeschool Support/ },
  { path: "/fall-classes", heading: /Fall 2026 classes/i, title: /Classes/ },
  { path: "/fall-classes/register", heading: /Fall 2026 registration/i, title: /Registration/ },
  { path: "/summer", heading: /Summer 2027 at Kairos/i, title: /Summer/ },
  { path: "/contact", heading: /Call, email or visit/i, title: /Contact/ },
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
    await expect(page.getByRole("link", { name: new RegExp(phoneDigits) }).first()).toBeVisible();
  });
}

test("old /testimonials URL lands on the About page reviews", async ({ page }) => {
  await page.goto("/testimonials");
  await expect(page).toHaveURL(/\/about#reviews$/);
  await expect(page.locator("#reviews h2")).toContainText(/what families say/i);
});

test("404 page renders for unknown route", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/isn.t here/i);
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

// Homepage concepts are noindex previews; each still needs one h1 and the shared chrome.
for (const slug of ["c"]) {
  test(`concept ${slug} loads with a single h1`, async ({ page }) => {
    const response = await page.goto(`/concepts/${slug}`);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
}

// The original homepage stays up as a noindex alternate to the main homepage.
test("classic homepage loads as a noindex alternate", async ({ page }) => {
  const response = await page.goto("/classic");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

// Marquees, swipe rows and galleries must never make phones scroll sideways.
for (const path of [
  "/",
  "/about",
  "/apex",
  "/contact",
  "/early-learners",
  "/fall-classes",
  "/fall-classes/register",
  "/services",
  "/services/private-tutoring",
  "/summer",
  "/classic",
  "/concepts/c",
]) {
  test(`no horizontal scroll at 360px on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("review marquee can be paused with its button", async ({ page }) => {
  await page.goto("/classic");
  const button = page.getByRole("button", { name: /pause reviews/i });
  await button.scrollIntoViewIfNeeded();
  const box = await button.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  await button.click();
  await expect(page.getByRole("button", { name: /play reviews/i })).toBeVisible();
});

test("path-finder tabs switch the recommended program", async ({ page }) => {
  await page.goto("/");
  const tab = page.getByRole("tab", { name: /full-time school/i });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").getByRole("heading", { name: "APEX" })).toBeVisible();
  // Arrow keys move between tabs
  await tab.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: /TK–2nd/i })).toHaveAttribute("aria-selected", "true");
});

test("landing pages hub has the banner editor behind a PIN", async ({ page }) => {
  await page.goto("/landingpages");
  await expect(page.getByRole("heading", { name: "Announcement banner" })).toBeVisible();
  await expect(page.getByLabel("PIN")).toHaveAttribute("pattern", "\\d{4}");
  await expect(page.getByLabel("Headline")).not.toHaveValue("");
});

test("fall registration form flags missing answers and supports more students", async ({ page }) => {
  await page.goto("/fall-classes/register?class=writing-lab-a");
  await expect(page.getByRole("checkbox", { name: /Writing Lab A/ })).toBeChecked();
  await page.getByRole("button", { name: "Add another child" }).click();
  await expect(page.getByRole("heading", { name: "Student 2" })).toBeVisible();
  await page.getByRole("button", { name: "Submit registration" }).click();
  await expect(page.locator('[id="parent.firstName-error"]')).toContainText("Enter your first name");
  await expect(page.locator('[id="children.1.classes-error"]')).toContainText("Pick at least one class or program");
  // The summary at the top takes focus and links to the first problem.
  await expect(page.getByRole("heading", { name: /answers need fixing/ })).toBeVisible();
  await expect(page.locator("#error-summary-title")).toBeVisible();
  await expect(page.getByLabel("First name").first()).toHaveAttribute("aria-invalid", "true");
});

test("fall registration keeps a draft for this tab and copies last name and school to the next student", async ({ page }) => {
  await page.goto("/fall-classes/register");
  await page.getByLabel("First name").first().fill("Test");
  await page.locator('[id="children.0.lastName"]').fill("Tester");
  await page.locator('[id="children.0.school"]').fill("Home");
  await page.getByRole("button", { name: /Add another child/ }).click();
  await expect(page.locator('[id="children.1.lastName"]')).toHaveValue("Tester");
  await expect(page.locator('[id="children.1.school"]')).toHaveValue("Home");
  await page.reload();
  await expect(page.getByRole("region", { name: "Saved answers" })).toBeVisible();
  await page.getByRole("button", { name: "Put them back" }).click();
  await expect(page.locator('[id="parent.firstName"]')).toHaveValue("Test");
  await expect(page.getByRole("heading", { name: "Student 2" })).toBeVisible();
});

test("retired homepage drafts redirect to the live homepage", async ({ page }) => {
  for (const slug of ["a", "b", "d"]) {
    await page.goto(`/concepts/${slug}`);
    await expect(page).toHaveURL(/\/$/);
  }
});
