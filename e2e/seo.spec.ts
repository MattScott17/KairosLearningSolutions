import { test, expect } from "@playwright/test";
import { site } from "../lib/site";

const indexable = [
  "/",
  "/apex",
  "/early-learners",
  "/about",
  "/services",
  "/services/private-tutoring",
  "/services/homeschool-support",
  "/fall-classes",
  "/summer",
  "/district-partnerships",
  "/contact",
];

const noindex = ["/fall-classes/register", "/landingpages", "/classic", "/concepts/c", "/lp/apex-site", "/lp/apex", "/lp/tutoring", "/lp/apex/a"];

test("indexable pages have a unique title, description, self canonical and valid JSON-LD", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const path of indexable) {
    await page.goto(path);

    const title = await page.title();
    expect(title.length, `title length for ${path}`).toBeLessThanOrEqual(65);
    expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
    titles.add(title);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description, `description on ${path}`).toBeTruthy();
    expect(descriptions.has(description!), `duplicate description on ${path}`).toBe(false);
    descriptions.add(description!);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, `canonical on ${path}`).toBe(`${site.url}${path === "/" ? "" : path}`);

    expect(await page.locator("h1").count(), `h1 count on ${path}`).toBe(1);
    expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBe(0);

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, `JSON-LD blocks on ${path}`).toBeGreaterThan(0);
    const parsed = blocks.map((b) => JSON.parse(b));
    for (const data of parsed) {
      const nodes = data["@graph"] ?? [data];
      for (const node of nodes) {
        expect(node["@type"], `@type on ${path}`).toBeTruthy();
        if (node["@type"] === "Service") expect(node.provider.name, `Service provider on ${path}`).toBeTruthy();
      }
    }
    const crumbs = parsed.find((d) => d["@type"] === "BreadcrumbList");
    if (path !== "/") expect(crumbs?.itemListElement.length, `breadcrumbs on ${path}`).toBeGreaterThan(1);

    expect(await page.locator('meta[property="og:title"]').getAttribute("content"), `og:title on ${path}`).toBeTruthy();
    expect(await page.locator('meta[property="og:image"]').getAttribute("content"), `og:image on ${path}`).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl, `og:url on ${path}`).toBe(canonical);
  }
});

test("pages with FAQ markup show the same questions on screen", async ({ page }) => {
  for (const path of ["/apex", "/early-learners", "/services/private-tutoring", "/services/homeschool-support"]) {
    await page.goto(path);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = blocks.map((b) => JSON.parse(b)).find((d) => d["@type"] === "FAQPage");
    expect(faq, `FAQPage on ${path}`).toBeTruthy();
    for (const q of faq.mainEntity) {
      const item = page.locator("details", { has: page.locator("summary", { hasText: q.name }) });
      await expect(item, `${q.name} on ${path}`).toBeVisible();
      await expect(item.locator("p"), `answer to ${q.name} on ${path}`).toHaveText(q.acceptedAnswer.text);
    }
  }
});

test("pages we keep out of search say noindex", async ({ page }) => {
  for (const path of noindex) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]'), `robots on ${path}`).toHaveAttribute("content", /noindex/);
  }
});

test("robots.txt and sitemap.xml list the right pages", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /api/");
  expect(robots).not.toContain("Disallow: /lp");
  expect(robots).toContain(`${site.url}/sitemap.xml`);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of indexable) expect(sitemap).toContain(`<loc>${site.url}${path === "/" ? "" : path}</loc>`);
  for (const path of noindex) expect(sitemap).not.toContain(`${site.url}${path}<`);
});
