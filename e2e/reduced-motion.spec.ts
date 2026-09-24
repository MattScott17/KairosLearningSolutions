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
    const targets = Array.from(document.querySelectorAll("[data-reveal], h1"));
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
