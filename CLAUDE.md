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

- Brand colors are Tailwind tokens: `forest-{50..950}`, `cream`, `sand`, `ink`, `gold`.
  Use them instead of raw hex.
- Interior pages open with `<PageHero>` (dark green). The header renders solid on every
  page except `/` (whose hero is light) — see `Navigation.tsx`.
- `<Reveal>` scroll-animates content but is built to **never leave content hidden**
  (IntersectionObserver + timeout fallback + reduced-motion static render). Keep that
  guarantee if you touch it.
- Fonts: `Fraunces` (`font-display`, headings) and `Inter` (body).

## Before committing

```bash
npm run typecheck && npm run lint && npm run build && npm run test:e2e
```

## Notes

- Fall/enrichment class details live in an external Google Doc catalog linked from
  `/fall-classes` (`site.fallCatalogUrl`).
- The contact form degrades gracefully when `RESEND_API_KEY` is unset — it never hard-fails
  the visitor; the call/email buttons are always the fallback.
