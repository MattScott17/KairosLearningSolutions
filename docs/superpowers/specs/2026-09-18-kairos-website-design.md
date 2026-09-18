# Kairos Learning Solutions — Website Rebuild

**Date:** 2026-09-18
**Status:** Built

## Goal

Replace the outdated, inconsistent Wix site at kairoslearningsolutions.com with a fast,
cohesive, professional marketing website that is ready to go live — then iterate.

## Decisions

| Area        | Choice                                                            |
| ----------- | ---------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + React 19 + TypeScript                  |
| Styling     | Tailwind CSS v3.4, custom brand palette from the tree logo       |
| Animation   | framer-motion (resilient, never hides content)                   |
| Icons       | lucide-react                                                     |
| Contact     | Working form via Resend **and** click-to-call / email fallback   |
| Hosting     | Vercel (project `kairos-learning-solutions`)                     |
| Content     | Reused + polished from the existing site — no invented facts     |

These mirror the conventions in the owner's other sites (Campbell-Films, SdGeneral).

## Information architecture

Home · APEX · About · Services (overview + Private Tutoring, Homework Club, Homeschool
Support) · Classes & Enrichment · Summer · Testimonials · Contact.

APEX is treated as the flagship: dedicated page, quick-facts bar (grades 3–9, $1,800/mo,
full-time), the 2 Hour Learning model, pillars, and an enrollment CTA.

## Architecture

- **Content as data:** `lib/site.ts` (business info + nav) and `lib/content.ts` (services,
  APEX, team, testimonials). Pages and components read from these so edits are one-touch.
- **Shared components:** `Navigation`, `Footer`, `ContactForm`, `CTASection`, `ServiceCard`,
  `Logo`, plus `ui/{Section, PageHero, Reveal}`.
- **Service detail** is a single dynamic route (`services/[slug]`) generated from the
  services list — add a service by adding a data entry.
- **Contact flow:** client form → `POST /api/contact` (zod-validated, Resend, honeypot,
  graceful degradation) → success/inline-error states.
- **SEO:** per-page metadata, OpenGraph, `sitemap.ts`, `robots.ts`, and JSON-LD
  `EducationalOrganization`.

## Design

Warm/professional. Brand green derived from the logo: deep olive `#3d5310`, leaf `#7cb342`,
soft lime, on `cream #faf8f2`, with a `gold` accent for CTAs. Display font Fraunces, body
Inter. Dark-green interior hero headers; solid nav on all pages except the light home hero.

## Testing

`typecheck` + `lint` + `build` clean. Playwright smoke suite (32 tests, desktop + mobile):
every route loads with correct title/heading/nav/footer, 404 works, primary nav works,
contact form validates and submits (mocked), and JSON-LD is present.

## Follow-ups (post-launch iteration)

- Configure `RESEND_API_KEY` in Vercel to activate email delivery.
- Point the `kairoslearningsolutions.com` domain at the Vercel project.
- Drop real Fall/Summer catalog details in when finalized (currently linked out).
- Optional: swap stock photos for real Kairos photography; add OG image.
