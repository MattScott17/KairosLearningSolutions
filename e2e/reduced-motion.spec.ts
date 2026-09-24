import { test, expect, type Page } from "@playwright/test";

// Visitors with "reduce motion" turned on must see every section. Playwright's
// toBeVisible() treats opacity:0 as visible, so this reads the effective
// opacity (element × every ancestor) directly.
test.use({ reducedMotion: "reduce" });

const paths = ["/", "/about", "/testimonials", "/concepts/a", "/concepts/b", "/concepts/c", "/concepts/d"];

async function hiddenCount(page: Page) {
  return page.evaluate(() => {
    const effectiveOpacity = (el: Element | null) => {
      let o = 1;
      for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
      return o;
    };
    // Judge by content, not by a marker attribute: every heading, paragraph, quote
    // and list item in the page body that carries real text must be visible.
    const targets = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main p, main blockquote, main li")
    ).filter((el) => (el.textContent ?? "").trim().length > 20 && !el.closest("[aria-hidden='true']"));
    return targets.filter((el) => effectiveOpacity(el) < 0.9).length;
  });
}

for (const path of paths) {
  test(`content on ${path} stays visible with reduced motion`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);
    expect(await hiddenCount(page)).toBe(0);
  });
}

test("every review stays reachable when the marquee can't move", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const figure = page.locator("figure", { hasText: "Google review" }).first();
  // The marquee row must fall back to a scrollable strip wider than the screen.
  const scrollable = await figure.evaluate((el) => {
    for (let n = el.parentElement; n; n = n.parentElement) {
      if (getComputedStyle(n).overflowX === "auto") return n.scrollWidth > n.clientWidth;
    }
    return false;
  });
  expect(scrollable).toBe(true);
});
