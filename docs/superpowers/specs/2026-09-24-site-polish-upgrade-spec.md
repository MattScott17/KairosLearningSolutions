# Site Polish & Motion Upgrade Spec

## Executive Summary

This upgrade makes the Kairos site feel like a real, established business instead of an
AI template, borrowing Wyzant's best moves: real photos everywhere, a two-row marquee of
the 12 real Google reviews, a rotating subject word in the homepage headline, count-up
stats, and tutor cards. The homepage and the three homepage concepts get bold motion — and
each concept now explores a *different* set of interactions — plus a new Concept D built
around a looping classroom video and a photo gallery. Interior pages get calmer polish
(tutor cards on About, a review wall on Testimonials, a hover-highlight service grid).
Motion components are adapted from the free Aceternity UI library rather than hand-built.
About 30 files change or are added (roughly 12 new components, ~16 new photos, 1 video);
the main risks are page weight (photos/video) and breaking the "content never hidden"
motion guarantee, both handled explicitly below.

---

## Spec

### Feature Description

A parent visiting the site sees real Kairos classrooms and kids (photo-release signed),
real Google reviews gliding past, a headline that cycles through subjects, and numbers that
count up — the page feels alive but professional. On the four homepage concepts
(`/concepts/a`–`d`) the owner can compare four genuinely different interaction styles
before choosing one. Interior pages feel consistent and polished, with calm motion only.

### Direction per page

| Page | Motion level | What's new |
|---|---|---|
| `/` (homepage) | Bold | FlipWords headline (keeps "fall in love"), arch-shaped photo collage with drifting accent shapes, count-up stats bar, two-row Google review marquee, "Meet our tutors" card strip, parallax APEX photo band, new photos throughout |
| `/concepts/a` "The Direct Guide" | Bold — *structured* | Scroll-progress **Timeline** for the 3-step plan, count-up stats, sticky mobile call bar |
| `/concepts/b` "A Day at Kairos" | Bold — *story* | **Parallax Scroll** photo gallery ("a week at Kairos"), **Animated Testimonials** (photo + rotating quotes) replacing the single pull quote |
| `/concepts/c` "Find Your Path" | Bold — *interactive* | **Tabs** path-finder ("My child needs… a boost / homework help / a homeschool partner / a full-time school"), **Focus Cards** program grid |
| `/concepts/d` "See It For Yourself" (NEW) | Bold — *cinematic* | Full-bleed muted looping **video hero**, **Layout Grid** expandable photo gallery, review marquee, tutor cards |
| `/about` | Calm | **Expandable Card** tutor grid (monogram placeholder until headshots), new photos |
| `/testimonials` | Calm | Review marquee above the existing masonry wall; Google source badge on cards |
| `/services` | Calm | **Card Hover Effect** (a highlight glides between service cards) |
| Other interior pages | Calm | New real photos swapped in where a photo already exists; subtle image hover zoom; no new motion |

### Architecture Decisions

- **Aceternity components are copied in, not installed via CLI.** `npx shadcn add` assumes
  Tailwind v4 layout. Sources go to `components/aceternity/` with three standard fixes:
  `motion/react` → `framer-motion`; v3 keyframes into `tailwind.config.ts`; neutral/indigo
  colors → brand tokens (`forest`, `cream`, `sand`, `gold`, `ink`). Each file gets a header
  comment crediting Aceternity UI (free tier; commercial use allowed).
- **Every motion component guards reduced motion** via `useReducedMotion()` (framer) or the
  existing global CSS rule at `app/globals.css:33-43`. Aceternity sources have no guard —
  adding it is mandatory. Anything that starts hidden (FlipWords, Timeline) must render its
  final/static state on reduced motion and never leave text invisible (CLAUDE.md guarantee).
- **`Reveal` is not modified.** It's used by the `/lp` landing pages; new motion lives in new
  components.
- **Stats become countable without breaking `lp/ProofStrip`.** Add optional
  `count?: number; suffix?: string` to `stats` entries; `value` string stays for existing
  consumers. A new `StatsBar` renders count-up when `count` exists, else `value`.
- **Tutor cards use a placeholder monogram** until headshots arrive: add optional
  `image?: string` to `TeamMember`; `TutorCard` renders `next/image` if set, else a brand
  monogram tile. `initials()` moves from `app/(site)/about/page.tsx:16` to `lib/initials.ts`.
- **Brand motif = the arch.** Wyzant's signature is diamonds; ours is an arch
  (`rounded-t-full`) echoing a tree canopy / doorway. Used for hero photo crops and a few
  solid forest/gold accent shapes. Gives a consistent, non-template look.
- **Photos are optimized at import.** Pick ~16 photos from Drive folder
  "Kairos Pictures 2025-2026" (JPEGs; skip HEIC shortcuts), resize to max 2000px long edge,
  JPEG quality ~80 with `sips`, name descriptively (`public/images/kairos/<scene>.jpg`).
  `next/image` then serves AVIF/WebP (`next.config.ts` already sets formats).
- **Video**: take `IMG_3559.mov` (18 MB) or `IMG_3606.mov` from Drive, trim to an 8–12 s
  loop, 1280px wide, H.264 MP4 + WebM, no audio, target < 3 MB each, plus a JPEG poster.
  Encoded with a throwaway `ffmpeg-static` binary in the scratchpad — **not** a project
  dependency. `<video autoPlay muted loop playsInline preload="metadata" poster>`; reduced
  motion shows the poster only.

### Data Model Changes

No database. Content-file changes only:
- `lib/content.ts`: `TeamMember.image?: string`; `stats[]` gains optional `count`/`suffix`.
- `lib/storybrand.ts`: slug union gains `"d"`; add `conceptD`; append to `concepts`.
- `lib/site.ts`: no rating/count constant (see Flagged Assumptions).

### API Changes

None.

### UI Changes

New components:
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge v2).
- `components/aceternity/infinite-moving-cards.tsx`, `flip-words.tsx`, `timeline.tsx`,
  `animated-testimonials.tsx`, `expandable-card.tsx` (+ `hooks/use-outside-click.ts`),
  `focus-cards.tsx`, `card-hover-effect.tsx`, `layout-grid.tsx`, `parallax-scroll.tsx`,
  `tabs.tsx`.
- `components/ReviewMarquee.tsx` — two rows of review cards (opposite directions) built on
  InfiniteMovingCards, fed by `testimonials`.
- `components/StatsBar.tsx` + `components/ui/CountUp.tsx`.
- `components/TutorCard.tsx` (+ monogram placeholder).
- `components/VideoHero.tsx`.

Modified: `app/(site)/page.tsx`, `components/home/Hero.tsx`, `app/(site)/concepts/{a,b,c}/page.tsx`,
`app/(site)/concepts/page.tsx`, `app/(site)/about/page.tsx`, `app/(site)/testimonials/page.tsx`,
`app/(site)/services/page.tsx`, pages whose single photo is swapped, `tailwind.config.ts`,
`app/globals.css` (only if a utility is needed), `lib/content.ts`, `lib/storybrand.ts`.

### Out of Scope

- `/lp/*` and `app/(bare)` landing pages, `components/lp/*`, contact form/API logic.
- Real tutor headshots (placeholders only), Google rating number/star count.
- Choosing a winning concept or replacing `/` with a concept.
- Background Gradient Animation and other "skip" Aceternity pieces (blobs, 3D tilt,
  device mockups, lens, sparkles) — they read as AI/dev-tool templates.
- New copywriting beyond short section headings/labels needed for new sections.

### Flagged Assumptions

- **Assumption:** No star rating or "4.9 on Google" number is shown — cards say "Google review".
  **Reasoning:** We don't have the verified rating/count; CLAUDE-era content rule is never fabricate.
  **Risk if wrong:** Slightly weaker trust signal; trivial to add once the owner supplies it.
- **Assumption:** I pick the ~16 photos and the video clip myself (best composition, faces
  visible, well lit), since all families signed releases.
  **Reasoning:** Owner delegated; selection is reviewable at Gate 2 via screenshots.
  **Risk if wrong:** Owner swaps a few files — no code change needed.
- **Assumption:** Homepage headline stays "Where students fall in love with ___" with a
  flipping subject word (reading / math / writing / science / learning).
  **Reasoning:** Keeps brand line and the e2e `/fall/i` assertion.
  **Risk if wrong:** Copy tweak only.
- **Assumption:** Homepage "Meet our tutors" strip shows 4 cards + link to About.
  **Risk if wrong:** Count change only.

### Research Discoveries

- **Discovery:** 12 real Google reviews already exist with a `pull` excerpt field (PR #7).
  **Impact:** Marquee uses `pull`, no new content needed; ids must not change (`getTestimonials` throws on unknown ids).
- **Discovery:** `Reveal` is shared with the `/lp` landing pages and their e2e tests
  (single h1, no horizontal scroll at 360px, CTA above the fold).
  **Impact:** `Reveal` untouched; marquee must be clipped (`overflow-hidden`) to avoid horizontal scroll.
- **Discovery:** Stats bar is copy-pasted in 3 places (`page.tsx`, `concepts/a`, `lp/ProofStrip`).
  **Impact:** New `StatsBar` replaces the two `(site)` copies; `ProofStrip` left alone (lp out of scope).
- **Discovery:** Aceternity free-tier sources are Tailwind v3-compatible; need `motion/react` → `framer-motion` and `cn`.
  **Impact:** Copy-in approach with `clsx` + `tailwind-merge@^2` (v3 targets Tailwind v4).
- **Discovery:** Drive "Video Clips" subfolder files are 3–16 GB raw; short phone `.mov` clips (18–59 MB) exist in the parent folder; no ffmpeg installed.
  **Impact:** Use a phone clip; encode with throwaway `ffmpeg-static`.
- **Discovery:** `AnimatedTestimonials` uses `Math.random()` during render (hydration mismatch) and Tabler icons.
  **Impact:** Replace with deterministic rotations and lucide icons.

---

## Reuse Inventory

Must use — do not recreate:
- `components/ui/Reveal.tsx` — scroll reveal for all non-bespoke content blocks.
- `components/ui/Section.tsx` (`Section`, `SectionHeading`), `components/ui/PageHero.tsx`, `components/CTASection.tsx`, `components/ServiceCard.tsx`.
- `lib/content.ts` — `testimonials`, `getTestimonials(ids)`, `team`, `leadership`, `stats`, `services`, `apex`, `earlyLearners`.
- `lib/storybrand.ts` — concept copy.
- `lib/site.ts` — phone, name, etc.
- `components/lp/StickyCallBar.tsx` — generic (uses only `site`) → reuse on Concept A.
- `app/globals.css` utilities: `container-page`, `btn-*`, `eyebrow`, `prose-kairos`; reduced-motion rule L33-43.
- `tailwind.config.ts` tokens: `shadow-soft`, `shadow-card`, `rounded-4xl`.

Can extend:
- `components/lp/TestimonialCards.tsx` card markup → basis for marquee card (copy markup into `ReviewMarquee`; do NOT modify the lp file).
- `app/(site)/about/page.tsx:16` `initials()` → move to `lib/initials.ts`, import in About + TutorCard.
- `tailwind.config.ts:46-54` keyframes → add `scroll` (marquee) keyframe; keep `fade-up`.

---

## Implementation Plan

### Step 1: Foundation
- **Files:** create `lib/utils.ts`, `lib/initials.ts`; modify `package.json` (`clsx@^2.1.1`, `tailwind-merge@^2.6.1`), `tailwind.config.ts` (add `scroll` keyframe + `animate-scroll` from Aceternity v3 snippet).
- **Modify details:** `about/page.tsx` imports `initials` from `lib/initials.ts` and deletes the local copy.
- **Watch out:** don't redefine `fade-up`.

### Step 2: Photos and video
- **Files:** `public/images/kairos/*.jpg` (~16), `public/video/kairos-loop.{mp4,webm}`, `public/video/kairos-loop-poster.jpg`.
- Download JPEGs from Drive folder `1kApycWRXfL8nMbAEQww4KvVQPuDvYkMK`, view them, pick best by scene (tutoring 1:1, small group, younger kids, older students, classroom wide, outdoors/activity, building). Resize with `sips -Z 2000 -s formatOptions 80`. Keep total added images < 8 MB.
- Video: `npx --yes ffmpeg-static`-based encode in scratchpad; ≤ 3 MB each.
- Keep `photo-1..5.jpg` (referenced by lp pages).

### Step 3: Adapt Aceternity components
- **Files:** the 10 files under `components/aceternity/` + `components/aceternity/hooks/use-outside-click.ts`, sourced from the downloaded registry JSON (scratchpad `ace/`) or re-fetched from `https://ui.aceternity.com/registry/<name>.json`.
- Apply: import fix, brand colors, `next/image` instead of `<img>`, lucide icons, deterministic rotation, `useReducedMotion` guard, remove `dark:` variants and `backdrop-blur`.
- **Callers (each must be used):** infinite-moving-cards → `ReviewMarquee`; flip-words → `Hero`; timeline → concepts/a; animated-testimonials → concepts/b; parallax-scroll → concepts/b; tabs → concepts/c; focus-cards → concepts/c; layout-grid → concepts/d; expandable-card → about; card-hover-effect → services.

### Step 4: Shared site components
- `components/ReviewMarquee.tsx` (client): two InfiniteMovingCards rows, 6 reviews each, opposite directions, different speeds, pause on hover; cards show `pull`, author, role, "Google review" badge. Wrapper `overflow-hidden`. Callers: home, concepts/d, testimonials.
- `components/ui/CountUp.tsx` (client): framer `useInView` + `animate`; reduced motion → final value immediately; SSR renders the final number (no hidden/zero content without JS). `components/StatsBar.tsx` renders `stats`. Callers: home, concepts/a.
- `components/TutorCard.tsx`: photo or monogram tile, name, role, first sentence of bio; subject/role tag. Callers: home tutor strip, concepts/d. (About uses expandable-card, which renders TutorCard's monogram/photo via a shared `TutorAvatar` export from the same file.)
- `components/VideoHero.tsx` (client): full-bleed video, gradient overlay, h1 + CTAs as children; reduced motion → poster `<Image>`. Caller: concepts/d.
- `lib/content.ts`: `TeamMember.image?`, stats `count`/`suffix` (e.g. 13 → "13+", 30 → "30+ yrs", 2020 → "Since 2020" stays `value`-only).

### Step 5: Homepage (bold)
- `components/home/Hero.tsx`: headline "Where students fall in love with <FlipWords>" (single h1, contains "fall"); replace single photo with arch-cropped collage of 2–3 new photos + 2 solid accent arches that drift slowly (framer, reduced-motion static).
- `app/(site)/page.tsx`: StatsBar replaces inline trust bar; new photos in Early Learners callout + APEX band; APEX band photo gets subtle scroll parallax (`useScroll`/`useTransform`, small client wrapper inside page or in `components/home/`); testimonial preview replaced by ReviewMarquee (keep "Read more stories" link); add "Meet our tutors" strip (4 TutorCards + link to /about) before CTA.

### Step 6: Concepts A–D (each distinct)
- **A:** Timeline for plan steps; StatsBar replaces its inline stats copy; `StickyCallBar` on mobile.
- **B:** ParallaxScroll gallery section "A week at Kairos" (~9 photos); AnimatedTestimonials (reviews + photos) replaces the single `melissa-c` pull quote; hero photo → best new wide photo.
- **C:** Tabs path-finder (4 tabs mapping situation → service/APEX with CTA); FocusCards program grid replacing the plain service-card grid.
- **D (new):** `app/(site)/concepts/d/page.tsx` with `metadata.robots` noindex; VideoHero → short promise + CTAs → LayoutGrid gallery → ReviewMarquee → tutor cards → plan (3 steps) → CTASection. Copy in `lib/storybrand.ts` `conceptD`.
- `concepts/page.tsx`: "Four homepage directions", grid `md:grid-cols-2`, lists what each explores.

### Step 7: Interior pages (calm)
- `/about`: team grid → ExpandableCard tutor cards (click opens full bio); leadership cards use `TutorAvatar`.
- `/testimonials`: ReviewMarquee under hero; existing masonry kept; keep h1 text.
- `/services`: service grid uses CardHoverEffect wrapper around existing `ServiceCard` content.
- Swap stock/older photos on apex, early-learners, summer, fall-classes, about for fitting new ones. Add `transition-transform duration-700 group-hover:scale-[1.03]` image hover where images are in cards.

### Step 8: Tests
- `e2e/smoke.spec.ts`: add `/concepts/a`–`/concepts/d` load checks; add a no-horizontal-overflow check at 360px for `/` and `/concepts/d`.
- Reduced-motion check: with `reducedMotion: "reduce"`, homepage h1 text is fully visible and marquee cards are visible.
- Capture desktop + mobile screenshots of `/`, each concept, `/about`, `/testimonials`, `/services` into `e2e/screenshots/polish-*.png` for Gate 2 review.

### Final Step: Verify
`npm run typecheck && npm run lint && npm run build && npm run test:e2e` — all must pass.

---

## Quality Criteria

- [ ] No new helper/component duplicates existing functionality — `Reveal`, `Section`, `SectionHeading`, `PageHero`, `CTASection`, `ServiceCard`, `StickyCallBar`, `getTestimonials` are imported, not recreated; `initials` exists only in `lib/initials.ts` (`grep -rn "function initials" app components lib` → 1 hit).
- [ ] Every file in `components/aceternity/` is imported by at least one page/component (grep each export).
- [ ] `grep -rn "motion/react" components app` → 0 hits; `grep -rn "@tabler" .` (excluding node_modules) → 0 hits; `grep -rnE "dark:|purple|indigo|neutral-|zinc-|slate-" components/aceternity` → 0 hits.
- [ ] Every client component with animation calls `useReducedMotion` or relies only on CSS animations covered by `globals.css` reduced-motion rule; FlipWords/Timeline/CountUp render final text server-side (verified by e2e reduced-motion test).
- [ ] `components/ui/Reveal.tsx`, `components/lp/*`, `app/(bare)/*` unchanged (`git diff --stat origin/main -- components/lp app/\(bare\) components/ui/Reveal.tsx` empty).
- [ ] No `Math.random()` in render paths (`grep -rn "Math.random" components app` → 0).
- [ ] Every page still has exactly one `h1`; `/` h1 contains "fall".
- [ ] No horizontal scroll at 360px on `/` and `/concepts/d` (e2e).
- [ ] All images use `next/image` (`grep -rn "<img" components app` → 0) with `sizes`; hero images `priority`.
- [ ] Total added media: images < 8 MB, each video file ≤ 3 MB (`du -sh public/images/kairos public/video`).
- [ ] `concepts/d` exports `robots: { index: false, follow: false }` and is not in `app/sitemap.ts`.
- [ ] Testimonial ids unchanged; no testimonial text edited (`git diff origin/main -- lib/content.ts` shows no quote changes).
- [ ] typecheck, lint, build, e2e all pass.
