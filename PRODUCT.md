# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Parents of children in roughly TK to 9th grade in Salinas and nearby towns (Monterey, Seaside, Marina, Castroville, Prunedale, Gonzales), deciding which program fits their child: tutoring, homeschool support, enrichment classes, Early Learners, or the full-time APEX program. School districts are a secondary audience (district partnerships page). Visitors want to understand the options, see prices and hours, and contact or register.

## Product Purpose

Marketing and registration site for Kairos Learning Solutions, a tutoring, homeschool and full-time learning center at 836 South Main Street, Salinas, CA, open since 2020 and run by Jackie Scott. Success is a parent calling, emailing, or registering (fall classes, contact form) with a clear idea of which program suits their child.

## Positioning

Homeschool flexibility: packages and pathways that fit each homeschool family's schedule, rather than a fixed school day. Programs ladder from private tutoring and homeschool support up to the APEX full-time program (grades 3 to 9) under one roof.

## Operating Context

In-person center open Monday to Thursday 9:00 AM to 5:15 PM, Friday by appointment. Fall classes run August 5 to December 18, 2026 and are registered through `/fall-classes/register`. `/landingpages` is the team hub for ad landing pages, homepage options, and the announcement banner editor.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript, Tailwind v3.4 (not v4), deployed on Vercel.
- Content is data in `lib/site.ts`, `lib/content.ts`, `lib/photos.ts`; prefer editing these over hardcoding.
- Contact and registration emails go through Resend and degrade gracefully when keys are missing; call and email buttons are always the fallback.
- Announcement banner settings live in a Vercel Global Config store behind a 4-digit PIN.
- Services and APEX details, team list, and fall class catalog come from the owner's own documents.

## Brand Commitments

- Name: Kairos Learning Solutions (short: Kairos). Old slogan "Raising Future World Changers" is retired from the site.
- Greens sampled from the logo, white page, hand-made rather than AI-templated feel.
- Copy in Jackie's plain first-person voice with real facts (prices, hours, credentials); no em dashes in site copy.

## Evidence on Hand

Real prices, hours, team bios, fall class catalog, and APEX pilot-year results from the owner's one-pager (described with AI-supported wording). No customer testimonials or enrollment numbers should be invented; use only what is in `lib/content.ts`.

## Product Principles

1. Real facts over marketing language: prices, hours, credentials, and addresses are always concrete.
2. Never invent proof: no fabricated testimonials, results, or counts.
3. Homeschool families and parents choosing a path come first; every page should make the next step (call, email, register) obvious.
4. Content lives in the data files, so updates (prices, hours, photos) are one-line changes rather than page rewrites.
5. The site must never leave a visitor stuck: forms and animations degrade gracefully.

## Accessibility & Inclusion

Target WCAG 2.1 AA: sufficient contrast, keyboard operability, and reduced-motion support (Reveal already renders static under reduced motion).
