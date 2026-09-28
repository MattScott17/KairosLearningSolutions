# CLAUDE.md — Kairos Learning Solutions website

Marketing site for a Salinas, CA tutoring / homeschool / full-time-learning center.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v3.4 (`tailwind.config.ts`, `postcss.config.mjs`) — **not** v4
- `lucide-react` icons, `framer-motion` for animation
- `resend` + `zod` for the contact form API
- Playwright for e2e smoke tests
- Deploys to Vercel (project `kairos-learning-solutions`)

## Where things live

- **Content is data.** Edit `lib/site.ts` (business info, nav) and `lib/content.ts`
  (services, APEX, team, testimonials). Prefer editing these over hardcoding in pages.
- Pages: `app/<route>/page.tsx`. Service detail pages are one dynamic route,
  `app/services/[slug]/page.tsx`, driven by `services` in `lib/content.ts`.
- Shared UI: `components/` (`Navigation`, `Footer`, `ContactForm`, `CTASection`,
  `ServiceCard`, `Logo`) and `components/ui/` (`Section`, `PageHero`, `Reveal`).
- Contact API: `app/api/contact/route.ts`. Schema shared client/server in
  `lib/contact-schema.ts`.
- SEO: `app/sitemap.ts`, `app/robots.ts`, metadata in `app/layout.tsx` (+ JSON-LD).

## Conventions

- Brand colors are Tailwind tokens: `forest-{50..950}` (sampled from the logo), `cream` (white),
  `sand` (light band), `ink`, `gold`.
  Use them instead of raw hex.
- Interior pages open with `<PageHero>` (dark green). The header renders solid on every
  page except `/` (whose hero is light) — see `Navigation.tsx`.
- `<Reveal>` scroll-animates content but is built to **never leave content hidden**
  (IntersectionObserver + timeout fallback + reduced-motion static render). Keep that
  guarantee if you touch it.
- Fonts: `Source Serif 4` (`font-display`, headings) and `Public Sans` (body).
- Keep it looking hand-made, not AI-templated: greens come from the logo, white page, `rounded-lg`,
  no drop shadows, no uppercase "eyebrow" labels or pill badges, no em dashes in site copy, and
  copy in Jackie's plain first-person voice with real facts (prices, hours, credentials).
- Photos are referenced by role from `lib/photos.ts`, so swapping a picture is a one-line change.

## Before committing

```bash
npm run typecheck && npm run lint && npm run build && npm run test:e2e
```

## Notes

- Fall classes are data (`fallClasses` in `lib/content.ts`), copied from Jackie's Google Doc
  catalog. `/fall-classes/register` rebuilds her Google registration form (`lib/registration.ts`);
  `/api/register` emails it via Resend and also tries to copy it into that Google Form
  (`lib/registration-google.ts`, which only works while the form doesn't require sign-in).
- The announcement banner (homepage + concept pages) is edited from `/concepts` with a 4-digit
  PIN. Settings live in the `kairos-site` Vercel Global Config store (`lib/banner.ts`, save action
  in `app/(site)/concepts/banner-actions.ts`). Needs `GLOBAL_CONFIG`, `BANNER_PIN`,
  `VERCEL_API_TOKEN`; without the store it falls back to `defaultBanner`.
- The contact form degrades gracefully when `RESEND_API_KEY` is unset — it never hard-fails
  the visitor; the call/email buttons are always the fallback.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
