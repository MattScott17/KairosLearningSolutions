# StoryBrand / Lead-Gen Redesign Concepts Spec

## Executive Summary

This builds three alternate homepage concepts (`/concepts/a`, `/b`, `/c`) applying Donald Miller's StoryBrand framework (parent-as-hero, Kairos-as-guide, clear plan, one CTA) so Jackie can pick a direction, plus four paid-traffic landing pages (APEX and Private Tutoring, each with and without site navigation) for Facebook ads, built Hormozi-style around a single "book a call" offer. It touches ~20 files: a route-group refactor (moving the 8 existing pages under a `(site)` group so new no-nav landing pages can skip `Navigation`/`Footer`), new copy data files, a lightweight callback-form + API route separate from the existing contact flow, and an owner-facing markdown doc with the photo shot list and messaging rationale. Main risk is the route-group refactor changing how existing pages render if done carelessly — mitigated by verifying every current URL still resolves after the move via `npm run build`'s route listing. No existing page's live copy or design changes in this pass; concept/landing pages are new, `noindex`ed, and thrown away once one is chosen.

---

## Spec

### Feature Description

From the visitor's perspective: three new preview homepages exist at `/concepts/a`, `/concepts/b`, `/concepts/c` (linked from a `/concepts` index), each telling the "your child struggling → Kairos as guide → clear plan → success" story a different way. Two ad campaigns (APEX, Private Tutoring) get dedicated landing pages, each in a bare (no site nav/footer, pure ad-conversion) and a site-chrome (nav/footer intact) variant, so four total: `/lp/apex`, `/lp/tutoring` (bare) and `/lp/apex-site`, `/lp/tutoring-site` (with nav). Every landing page leads to one action: call now, or fill a 2-field (name + phone) callback form. None of this replaces the live site yet — it's comps for Jackie to review, pick from, and supply real photos/testimonials into afterward.

### Architecture Decisions

- **Route groups over a `noNav` prop.** `Navigation` and `Footer` are rendered directly in `app/layout.tsx` (confirmed by reading it), so no existing mechanism lets a page skip them. Rather than thread a boolean through every page, use Next.js route groups: `app/(site)/...` gets a layout with `Navigation`/`Footer` (today's behavior, unchanged), `app/(bare)/...` gets a minimal layout with no nav. Route groups don't affect URLs, so all 8 existing pages move into `(site)/` with zero URL changes.
- **Separate callback-form API route, not a modified `/api/contact`.** `lib/contact-schema.ts` requires a valid `email` with no optional path, and `interestOptions` is a closed enum with no "landing page source" concept. Loosening it risks the working contact flow. Instead: a narrower `lib/landing-schema.ts` (name + phone only) and `app/api/lp-callback/route.ts`, sharing the HTML-escaping/Resend-config logic with the existing route via a new `lib/email.ts` (extracted, not duplicated).
- **Bare vs. site-chrome as separate URLs, not a query param.** Two route groups can't both own the same path, so the nav/no-nav A/B pages need distinct slugs (`/lp/apex` vs `/lp/apex-site`) rather than `/lp/apex?nav=1`. Documented so Jackie knows which URL to use in which ad.
- **Shared inner components, four thin route files.** `LandingHero`, `ProofStrip`, and `CallbackForm` (new, in `components/lp/`) hold all the actual landing-page content. The four route files (`/lp/apex`, `/lp/apex-site`, `/lp/tutoring`, `/lp/tutoring-site`) each just assemble the same components inside their group's layout — content is written once, not duplicated across the nav/no-nav split.
- **No fabricated testimonial data.** Existing testimonials in `lib/content.ts` (initials + sentiment quotes, e.g. "Kairos was the lifeline...") stay exactly as they are. UI supports an optional `result` field for future named, specific-outcome testimonials, but nothing is invented to fill it now — see Photo/Proof doc for what to go collect instead.

### Data Model Changes

No database — this is a static content site. New TypeScript content files only:
- `lib/storybrand.ts` — hero/problem/plan/CTA copy for the three homepage concepts.
- `lib/landing-content.ts` — APEX and Tutoring-specific hero/proof/CTA copy for the landing pages.
- `Testimonial` type in `lib/content.ts` gains one optional field: `result?: string` (undefined for all current entries).

### API Changes

- New: `POST /api/lp-callback` — accepts `{ name, phone, program, page, company }` (validated by `lib/landing-schema.ts`), sends via Resend using the same pattern as `app/api/contact/route.ts` (graceful no-op with a console warning if `RESEND_API_KEY` is unset — never hard-fails the visitor, matching the existing convention noted in `CLAUDE.md`).
- No changes to the existing `POST /api/contact`.

### UI Changes

- New route group `app/(bare)/` with `layout.tsx` (logo + phone sticky bar only, no nav links, minimal footer with legal/address line).
- New route group `app/(site)/` with `layout.tsx` (moves `Navigation` + `Footer` + skip-link out of the root `app/layout.tsx`, which becomes fonts/metadata/JSON-LD only).
- All 8 existing pages (`page.tsx`, `about/`, `apex/`, `contact/`, `fall-classes/`, `services/`, `services/[slug]/`, `summer/`, `testimonials/`) moved (via `git mv`) into `app/(site)/`, unmodified.
- New: `app/(site)/concepts/page.tsx` — index page listing the 3 concepts with a one-line pitch each, `noindex`.
- New: `app/(site)/concepts/a/page.tsx`, `b/page.tsx`, `c/page.tsx` — three homepage concepts, `noindex`.
- New: `components/lp/LandingHero.tsx`, `components/lp/ProofStrip.tsx`, `components/lp/CallbackForm.tsx`, `components/lp/StickyCallBar.tsx`.
- New: `app/(bare)/lp/apex/page.tsx`, `app/(bare)/lp/tutoring/page.tsx`, `app/(site)/lp/apex-site/page.tsx`, `app/(site)/lp/tutoring-site/page.tsx` — all `noindex`.
- New: `lib/email.ts` — `escapeHtml` + shared Resend client setup, extracted from `app/api/contact/route.ts`, imported by both API routes.

### Out of Scope

- Redesigning the existing interior pages (About, Services, APEX, Testimonials, Fall Classes, Summer) — explicitly deferred to a follow-up once Jackie picks a homepage concept, so this PR stays reviewable.
- Swapping in real photo-day photos — I don't have the files; pages use the existing 3 photos as placeholders with exact crop/aspect notes in the shot-list doc.
- Real, specific-outcome testimonials — existing anonymized quotes are kept as-is; nothing fabricated.
- A/B testing infrastructure, analytics/pixel wiring (Meta Pixel, conversion tracking) for the ad landing pages — flagged as a fast-follow, not built here.
- Choosing a new font — left as an open question for Jackie in the owner-facing doc, not decided in code.
- Making any of the 3 concepts or 4 landing pages "live" (replacing `/` or being linked from primary nav) — they are `noindex`ed comps until one is chosen.

### Flagged Assumptions

- **Assumption:** Landing URLs are `/lp/apex` + `/lp/tutoring` (bare, primary ad-facing) and `/lp/apex-site` + `/lp/tutoring-site` (with nav), rather than a query-param toggle.
  **Reasoning:** Next.js route groups can't both claim the same path, so a real URL split is required; these names are clear and simple to swap into Facebook ad destination URLs.
  **Risk if wrong:** Trivial rename before real ad spend starts — nothing depends on these URLs yet.

- **Assumption:** Callback form on landing pages asks only for name + phone (no email), matching the "push people to a phone call" answer.
  **Reasoning:** Confirmed CTA priority is phone-first; a 2-field form has the highest completion rate for a callback-request.
  **Risk if wrong:** If Jackie later wants landing-page leads in an email nurture sequence too, an email field needs to be added to `landing-schema.ts` and the Resend template.

- **Assumption:** Concept/landing pages are `noindex`, not linked from the live nav, and don't touch `app/sitemap.ts`.
  **Reasoning:** They're throwaway comps and live ad-destination pages, not pages that should show up in Google search results confusing organic visitors.
  **Risk if wrong:** If Jackie wants to share a concept link with someone outside for feedback, the page still works via direct URL — `noindex` only affects search-engine indexing, not access.

### Research Discoveries

- **Discovery:** `Navigation` and `Footer` are rendered directly inside `app/layout.tsx` (the single root layout) — confirmed by reading the file. There is no existing prop or convention for a chrome-free page.
  **Impact:** Route groups are a structural prerequisite for the no-nav landing pages, not an optional nicety — all 8 existing pages must move under `app/(site)/` first, or the new `(bare)` group would sit alongside a root layout that still renders `Navigation`/`Footer` for the bare pages too.

- **Discovery:** `lib/contact-schema.ts`'s `email` field has no optional path (`z.string().email()`, required), and `interestOptions` is a closed enum with no landing-page-source concept.
  **Impact:** Building the callback form on top of the existing schema/route would mean loosening validation the live contact form currently relies on. Spec instead adds a parallel, narrower schema + route, sharing only the non-form-specific logic (HTML escaping, Resend setup) via a new `lib/email.ts`.

- **Discovery:** `lib/content.ts` testimonials are anonymized, sentiment-only ("Kairos was the lifeline...", author `C.C.`), with no field for a concrete result.
  **Impact:** Can't build StoryBrand's "success" proof section with real specifics yet. `Testimonial` type gets an optional `result?: string` so the UI is ready, but no fake numbers are added — the owner-facing doc asks for 2-3 named quotes with a concrete before/after.

---

## Reuse Inventory

Must reuse (do not recreate):
- `components/ui/Section.tsx`, `SectionHeading` — section wrappers for concept pages.
- `components/ui/PageHero.tsx` — base for any landing/concept page hero that isn't the fully custom `LandingHero`.
- `components/ui/Reveal.tsx` — scroll-reveal wrapper, used throughout new pages (never bypass its no-hidden-content guarantee).
- `components/CTASection.tsx` — reused as-is (with custom `title`/`intro`/`primaryLabel`/`primaryHref` props, which it already supports) on concept pages.
- `components/ServiceCard.tsx` — reused on Concept C's comparison-style layout.
- `components/Logo.tsx` — used in the new `(bare)` layout header.
- `lib/site.ts` (`site.phone`, `site.phoneHref`) — every "Call now" CTA across all new pages.
- `lib/content.ts` (`services`, `apex`, `testimonials`, `stats`) — source data for concept pages; not re-declared.
- `app/api/contact/route.ts`'s Resend-call shape and graceful-degradation-when-no-API-key pattern — mirrored (via shared `lib/email.ts`) in the new `lp-callback` route, not reinvented.

Can extend:
- `lib/content.ts` — add `result?: string` to the `Testimonial` type only; no existing entries touched.
- `app/layout.tsx` — trimmed down (Navigation/Footer moved out), not rewritten from scratch.

---

## Implementation Plan

### Step 1: Extract shared email helper
- **Files:** Create `lib/email.ts`. Modify `app/api/contact/route.ts`.
- **Modify details:** Move the `escapeHtml` function and the `Resend` client / `apiKey`/`to`/`from` env resolution out of `app/api/contact/route.ts` into `lib/email.ts` as named exports (`escapeHtml`, `getResendConfig()`). Update `app/api/contact/route.ts` to import them instead of defining them inline.
- **Reuse:** N/A (this step creates the thing to be reused).
- **Watch out:** Keep `runtime = "nodejs"` export in `app/api/contact/route.ts` unchanged; don't move it into the shared lib.

### Step 2: Route-group refactor (site chrome)
- **Files:** Create `app/(site)/layout.tsx`. Modify `app/layout.tsx`. `git mv` all 8 existing page files/dirs into `app/(site)/`.
- **Modify details:** `app/(site)/layout.tsx` gets the `<Navigation />`, `<main id="main">{children}</main>`, `<Footer />`, and the skip-to-content link, exactly as currently in `app/layout.tsx` lines 85-93. `app/layout.tsx` keeps only `<html>`/`<body>` with fonts, the JSON-LD script, and metadata — `children` passed straight through.
- **Files moved:** `app/page.tsx` → `app/(site)/page.tsx`; `app/about/page.tsx` → `app/(site)/about/page.tsx`; `app/apex/page.tsx` → `app/(site)/apex/page.tsx`; `app/contact/page.tsx` → `app/(site)/contact/page.tsx`; `app/fall-classes/page.tsx` → `app/(site)/fall-classes/page.tsx`; `app/services/page.tsx` and `app/services/[slug]/page.tsx` → `app/(site)/services/...`; `app/summer/page.tsx` → `app/(site)/summer/page.tsx`; `app/testimonials/page.tsx` → `app/(site)/testimonials/page.tsx`.
- **Reuse:** No content changes to any moved file — pure relocation.
- **Watch out:** `app/sitemap.ts`, `app/robots.ts`, and `app/api/**` stay at the top level (route groups only apply to page routes, not these special files) — do not move them.

### Step 3: Bare layout for ad landing pages
- **Files:** Create `app/(bare)/layout.tsx`, `components/lp/StickyCallBar.tsx`.
- **Modify details:** `app/(bare)/layout.tsx` renders just `<Logo />` linked to `/` removed (ad landing pages shouldn't offer an exit link — link the logo to nothing, or don't make it a link at all) plus `{children}`, plus `<StickyCallBar />` (a slim bottom-fixed bar on mobile with a `tel:` button, using `site.phoneHref`).
- **Reuse:** `components/Logo.tsx`, `lib/site.ts`.
- **Watch out:** This layout must NOT import `Navigation` or `Footer` — that's the entire point of the bare group.

### Step 4: StoryBrand + landing copy content
- **Files:** Create `lib/storybrand.ts`, `lib/landing-content.ts`.
- **Modify details:** `lib/storybrand.ts` exports three concept objects (`conceptA`, `conceptB`, `conceptC`), each with `{ label, pitch, heroHeadline, heroSub, problem: { external, internal, philosophical }, plan: string[], successVision, failureStakes }` — the StoryBrand beats, written per the earlier concept descriptions (A: direct-response guide-led; B: narrative/emotional journey; C: path-finder/comparison). `lib/landing-content.ts` exports `apexLanding` and `tutoringLanding`, each with `{ headline, subhead, painPoints: string[], proofPoints: string[], planSteps: string[], ctaLabel }`.
- **Reuse:** Pulls factual details (grade ranges, tuition, `apex.included`) from existing `lib/content.ts` rather than re-stating them.
- **Watch out:** No invented statistics or testimonial results — every proof point must trace to something already in `lib/content.ts` or be phrased as a process fact (e.g. "one free consultation call before you commit"), not a fabricated number.

### Step 5: Landing page shared components
- **Files:** Create `components/lp/LandingHero.tsx`, `components/lp/ProofStrip.tsx`, `components/lp/CallbackForm.tsx`.
- **Modify details:** `LandingHero` takes the shape from `lib/landing-content.ts` and renders headline/subhead/pain points + dual CTA (call button using `site.phoneHref`, and an anchor-scroll to the callback form). `ProofStrip` renders `stats` (reused from `lib/content.ts`) plus 2-3 `testimonials` entries. `CallbackForm` is a client component modeled on `components/ContactForm.tsx`'s state-machine pattern (`idle/submitting/success/error`) but posting to `/api/lp-callback` with only name/phone/program fields, validated against `lib/landing-schema.ts` (Step 6).
- **Reuse:** `components/ui/Reveal.tsx` for entrance animation; `lib/site.ts` for phone; `ContactForm.tsx`'s submit/error-state pattern as the model to follow (not imported directly, since the field set differs, but the fetch/status-state structure must match).
- **Watch out:** Each of the 4 landing routes (Step 7) must import these same three components with only the `apexLanding`/`tutoringLanding` data prop differing — no per-route copy/paste of this JSX.

### Step 6: Landing form schema + API route
- **Files:** Create `lib/landing-schema.ts`, `app/api/lp-callback/route.ts`.
- **Modify details:** `lib/landing-schema.ts` mirrors `lib/contact-schema.ts`'s shape (including the `company` honeypot field, `z.string().max(0).optional().or(z.literal(""))`) but with `name`, `phone` (required, not optional this time), `program` (enum: `"APEX" | "Private Tutoring"`), `page` (string, which landing URL it came from, for later ad-attribution). No `email`, no `message` minimum. `app/api/lp-callback/route.ts` mirrors `app/api/contact/route.ts`'s structure (parse → honeypot check → graceful no-key fallback → Resend send), importing `escapeHtml`/`getResendConfig` from `lib/email.ts` (Step 1).
- **Reuse:** `lib/email.ts` (Step 1) — must not redefine `escapeHtml` or Resend config inline.
- **Watch out:** Keep `export const runtime = "nodejs"` on this new route too, matching the existing convention.

### Step 7: Four landing page routes
- **Files:** Create `app/(bare)/lp/apex/page.tsx`, `app/(bare)/lp/tutoring/page.tsx`, `app/(site)/lp/apex-site/page.tsx`, `app/(site)/lp/tutoring-site/page.tsx`.
- **Modify details:** Each file is thin: import `LandingHero`/`ProofStrip`/`CallbackForm` from `components/lp/`, pass `apexLanding` or `tutoringLanding` from `lib/landing-content.ts`, export `metadata = { robots: { index: false, follow: false } }`. The only difference between the bare and site-chrome pair for the same program is which route group they live in — the page body is identical.
- **Reuse:** Everything from Steps 3-6.
- **Watch out:** Do not let `app/(bare)/lp/apex/page.tsx` and `app/(site)/lp/apex-site/page.tsx` diverge in content — if one needs a copy change, make it in `lib/landing-content.ts` so both pick it up.

### Step 8: Three homepage concepts + index
- **Files:** Create `app/(site)/concepts/page.tsx`, `app/(site)/concepts/a/page.tsx`, `app/(site)/concepts/b/page.tsx`, `app/(site)/concepts/c/page.tsx`.
- **Modify details:** `concepts/page.tsx` is a simple `noindex` index with 3 cards (using `Section`/`Reveal`) linking to `a`/`b`/`c`, each with the concept's one-line pitch from `lib/storybrand.ts`. Each concept page assembles existing components (`Section`, `SectionHeading`, `ServiceCard`, `CTASection`, `Reveal`) around the StoryBrand copy from `lib/storybrand.ts` for that concept — Concept A leans on `LandingHero`-style direct layout with one CTA repeated; Concept B is photo/narrative-heavy using the existing 3 photos with `Image`; Concept C uses a `ServiceCard`-grid "which path fits your family" comparison structure. All three end in `CTASection` with `primaryLabel="Book a free call"` and `primaryHref="/contact"`.
- **Reuse:** Everything listed in Reuse Inventory above.
- **Watch out:** `values`, `services`, `apex`, `stats`, `testimonials` from `lib/content.ts` are the only source of factual claims — don't invent new stats or credentials.

### Step 9: Owner-facing plan doc
- **Files:** Create `docs/redesign/kairos-redesign-plan.md`.
- **Modify details:** Plain-language doc (not a technical spec) covering: (1) links to `/concepts/a|b|c` and the 4 `/lp/...` pages with a one-paragraph description of each concept's angle and why (StoryBrand beats named), (2) the photo shot list — for each page section, what image is needed, aspect ratio, and whether a candid or posed photo-day shot fits better, (3) the open question on font, (4) what's explicitly NOT done yet (interior pages, real photos, analytics, A/B testing) and why, (5) a short "how StoryBrand/Hormozi principles show up here" explainer in plain terms for a non-technical reader.
- **Reuse:** N/A — content doc.
- **Watch out:** This doc is for Jackie, not developers — no jargon, no file paths.

### Final Step: Lint + Build
- Run `npm run typecheck` — must pass.
- Run `npm run lint` — must pass.
- Run `npm run build` — must pass; confirm the build's route listing still shows `/`, `/about`, `/apex`, `/contact`, `/fall-classes`, `/services`, `/services/[slug]`, `/summer`, `/testimonials` unchanged, plus the new `/concepts*` and `/lp/*` routes.
- Fix any issues and rerun until all three pass.

---

## Quality Criteria

- [ ] Every existing route (`/`, `/about`, `/apex`, `/contact`, `/fall-classes`, `/services`, `/services/[slug]`, `/summer`, `/testimonials`) still builds and resolves to the same path after the `(site)` route-group move — verified in `npm run build` output.
- [ ] `Navigation` and `Footer` are imported and rendered in exactly one place (`app/(site)/layout.tsx`) — `app/layout.tsx` and `app/(bare)/layout.tsx` do not import either.
- [ ] `escapeHtml` and the Resend client/env-resolution logic exist in exactly one place (`lib/email.ts`) — `grep -rn "function escapeHtml" app/ lib/` returns exactly one definition, imported by both `app/api/contact/route.ts` and `app/api/lp-callback/route.ts`.
- [ ] No new helper, component, or content array duplicates something already in the Reuse Inventory — `Section`, `SectionHeading`, `Reveal`, `CTASection`, `ServiceCard`, `Logo`, and the `services`/`apex`/`testimonials`/`stats` arrays are imported, not recreated, anywhere in the new concept/landing pages.
- [ ] The bare and site-chrome landing page pair for each program (`/lp/apex` vs `/lp/apex-site`, `/lp/tutoring` vs `/lp/tutoring-site`) render identical `LandingHero`/`ProofStrip`/`CallbackForm` content — no copy-pasted JSX that duplicates content between the pair; only the surrounding layout (nav/footer present or absent) differs.
- [ ] All 3 concept pages and 4 landing pages export `metadata = { robots: { index: false, follow: false } }`.
- [ ] `app/sitemap.ts` is unmodified and does not list any `/concepts*` or `/lp/*` URL.
- [ ] `lib/landing-schema.ts`'s `company` honeypot field matches the exact pattern already used in `lib/contact-schema.ts` (`z.string().max(0).optional().or(z.literal(""))`), and `app/api/lp-callback/route.ts` checks it the same way `app/api/contact/route.ts` does (pretend-success on trip).
- [ ] `app/api/lp-callback/route.ts` never hard-fails the visitor when `RESEND_API_KEY` is unset — returns `{ ok: true }` (or an equivalent non-error response) with a `console.warn`, matching `app/api/contact/route.ts`'s existing behavior.
- [ ] No testimonial in `lib/content.ts` is modified or has a fabricated `result` value — the field exists on the type but is `undefined` on every current entry; `git diff` on the testimonials array shows only the type addition, no data changes.
- [ ] All new pages/components use only `forest-*`, `cream`, `sand`, `ink`, `gold-*` Tailwind tokens — no raw hex color literals introduced (`grep -rn "#[0-9a-fA-F]\{3,6\}" app/\(bare\) app/\(site\)/concepts app/\(site\)/lp components/lp` returns nothing).
- [ ] `npm run typecheck && npm run lint && npm run build` all pass.

---

## Open Question for the Owner (not decided here)

Fonts (`Fraunces`/`Inter`) are left as-is in code for this pass — flagged in the owner-facing doc as a decision point once a homepage concept is chosen, not something to guess at in the plan.
