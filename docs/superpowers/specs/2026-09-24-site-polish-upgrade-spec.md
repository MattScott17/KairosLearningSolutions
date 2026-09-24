# Site Polish & Motion Upgrade Spec

## Executive Summary

This upgrade makes the Kairos site feel like a real, established business instead of an
AI template, borrowing Wyzant's best moves: real photos everywhere, a two-row marquee of
the 12 real Google reviews, a rotating subject word in the homepage headline, count-up
stats, and tutor cards. The homepage and the three homepage concepts get bold motion — each
concept now explores a *different* interaction style — plus a new Concept D built around a
looping classroom video and a photo gallery. Interior pages get calmer polish (tutor cards
on About, review marquee on Testimonials, new photos). A handful of motion pieces are adapted
from the free Aceternity UI library where they genuinely fit; the rest are small custom
components. It also fixes an existing bug: visitors with "reduce motion" turned on currently
see most sections as blank. ~30 files change or are added (~10 new components, ~16 photos,
1 video); main risks are page weight and keeping animated content always visible.

---

## Spec

### Feature Description

A parent visiting the site sees real Kairos classrooms and kids (photo releases signed),
real Google reviews gliding past, a headline that cycles through subjects, and numbers that
count up — alive but professional. On `/concepts/a`–`d` the owner compares four genuinely
different interaction styles. Interior pages stay calm and consistent.

### Direction per page

| Page | Motion | What's new |
|---|---|---|
| `/` | Bold | FlipWords headline (keeps "fall in love"), arch-shaped photo collage with slowly drifting accent arches, count-up StatsBar, two-row review marquee, "Meet our tutors" strip, parallax APEX photo band, new photos |
| `/concepts/a` "The Direct Guide" | Bold — *structured* | Scroll-progress **Timeline** plan, StatsBar count-up, mobile sticky call bar |
| `/concepts/b` "A Day at Kairos" | Bold — *story* | **Sticky "day at Kairos" scroller** (times of day on the left, sticky photo swaps on the right), page-scroll **parallax photo gallery** |
| `/concepts/c` "Find Your Path" | Bold — *interactive* | **Path-finder tabs** (sliding pill tab bar: "My child needs a boost / homework help / a homeschool partner / a full-time school" → matched program + CTA), **Focus Cards** program grid |
| `/concepts/d` "See It For Yourself" (NEW) | Bold — *cinematic* | Full-bleed muted looping **video hero**, **Layout Grid** expandable photo gallery, review marquee, tutor cards, 3-step plan |
| `/about` | Calm | Tutor card grid (monogram placeholders until headshots), new photos |
| `/testimonials` | Calm | Review marquee under the hero; masonry wall kept |
| Other interior pages | Calm | Better real photos where a photo already exists; subtle image hover zoom on image cards |

### Mobile & desktop behaviour (owner requirement)

Every piece must look intentional at **390px (phone), 768px (tablet) and 1440px (desktop)**.
Hover-only effects always have a touch equivalent; nothing relies on hover to reveal content.

| Piece | Phone (≤ 640px) | Desktop (≥ 1024px) |
|---|---|---|
| FlipWords headline | Word wraps onto its own line; reserved min-width so the line never jumps; text ≤ `text-4xl` | Inline in the headline, `text-6xl` |
| Arch photo collage | One arch photo + one small overlapping arch; accent shapes hidden | 2–3 arches + drifting accent shapes |
| StatsBar count-up | 2×2 grid | 4 in a row |
| Review marquee | One row only (second hidden), cards 280px wide, pause button ≥ 44px tap target, edge fades | Two rows, opposite directions, cards 380px, pause on hover + button |
| Tutor cards | Horizontal swipe row with snap (`snap-x`), or 1 column on About | 4-up grid (home), 3-up (About) |
| APEX parallax photo | Static (no parallax) | ±40px drift |
| Timeline (A) | Line at left edge, content full width | Sticky step titles on the left, content on the right |
| Sticky call bar (A) | Visible, page gets bottom padding so the footer isn't covered | Hidden |
| DayScroller (B) | Each moment shows its own photo inline, no sticky | Sticky photo on the right swaps as you scroll |
| Parallax gallery (B) | 2 static columns | 3 columns drifting at different rates |
| PathFinder tabs (C) | Tab row scrolls sideways with snap; active panel stacks (text over photo) | Pill row, panel side-by-side (text + photo) |
| Focus cards (C) | Titles always visible, 1 column, no blur | 2–3 columns, hover blurs the others |
| Video hero (D) | Video fills `70svh`, headline over a dark gradient, poster shows instantly | Full `90vh`, same layout with wider text column |
| Layout grid gallery (D) | 2-column grid; tap opens photo centered on screen, Esc/tap-outside closes | 3-column mixed-size grid; click expands centered |

**Checks (per slice, not just at the end):**
- Screenshots at 390 / 768 / 1440 of every page touched in that slice, reviewed by me before moving on (text overflow, overlap, cramped spacing, images cropped badly, tap targets).
- e2e: no horizontal scroll at 360px on every changed page; header/footer/CTA reachable; all tap targets on new controls ≥ 44px.
- Real phone behaviour: video autoplays muted with `playsInline` (iOS), no scroll-trapping elements, `svh` units so mobile browser bars don't cut the hero.
- Performance: Lighthouse mobile run on `/` and `/concepts/d`; LCP image/poster uses `priority`; no layout shift from FlipWords, CountUp or images (fixed aspect ratios, reserved widths).

### Architecture Decisions

- **Fix `Reveal` and the home `Hero` for reduced motion** (Changed based on challenger
  finding 1). Today `useReducedMotion()` is `null` on the server and `true` on the client's
  first render, so SSR HTML ships `opacity:0` and the client swaps to a plain tag — React does
  not patch the attribute, content stays invisible (verified: 19/19 Reveal blocks hidden on
  `/about` with reduced motion). Fix: always render the same motion element; when `reduce`
  is true, animate to visible immediately with `duration: 0`. Plus a CSS safety net:
  `Reveal` adds `data-reveal`, and `globals.css` forces `[data-reveal]` to
  `opacity:1; transform:none` under `@media (prefers-reduced-motion: reduce)` and inside a
  `<noscript><style>` in `app/layout.tsx`. The public props and normal-motion behaviour of
  `Reveal` stay identical, so `/lp` pages are unaffected for normal users and fixed for
  reduced-motion users. Every new motion component follows the same rule: **one element
  type in both branches; never branch the rendered tree on `useReducedMotion`.**
- **Adapt Aceternity only where the API fits** (challenger findings 2–8, 10). Copied in by
  hand (no shadcn CLI — it assumes Tailwind v4), with `motion/react` → `framer-motion`,
  brand tokens instead of neutral/indigo, `next/image`, lucide icons, reduced-motion safe,
  credit comment at top (free tier, commercial use allowed). Kept:
  - **FlipWords** → homepage hero word.
  - **Timeline** → Concept A plan (content never starts hidden; only the progress line animates).
  - **FocusCards** → Concept C, *modified*: title always visible (touch has no hover); blur-others only on `md:` hover; image per program from a local slug→photo map in the page.
  - **LayoutGrid** → Concept D, *modified*: expanded card is `fixed` and viewport-centered with a fixed backdrop, closes on Esc/backdrop click, uses a `<button>` trigger.
  - **Tabs** → Concept C, *only* the sliding-pill tab bar (`layoutId`); panels rewritten to render just the active panel in normal flow, with `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, arrow-key support.
  Dropped from the earlier draft: CardHoverEffect (nested `<a>`, duplicates ServiceCard hover),
  ExpandableCard (a demo, not a component; hides already-visible bios), AnimatedTestimonials
  (would caption classroom photos with reviewer names — misleading), InfiniteMovingCards
  (DOM `cloneNode` fails lint, double-clones in StrictMode, no pause control), ParallaxScroll
  (traps touch scroll in a nested 40rem scroller).
- **Custom small components instead**: `ReviewMarquee` (list rendered twice in JSX, second copy
  `aria-hidden`, CSS keyframe, pause on hover/focus **plus a visible pause/play button** for
  WCAG 2.2.2), `ParallaxGallery` (columns drift on *page* scroll via `useScroll({target})`,
  no inner scroller; single static column on mobile), `DayScroller` (Concept B).
- **Stats become countable without breaking `lp/ProofStrip`.** Optional `count?`/`suffix?`
  on `stats` entries; `value` string kept. `CountUp` SSR-renders the final number; only
  animates from 0 after hydration when in view and motion allowed.
- **Tutor cards** use a monogram placeholder: optional `image?: string` on `TeamMember`;
  `TutorAvatar` + `TutorCard` in `components/TutorCard.tsx`. `initials()` moves from
  `app/(site)/about/page.tsx:16` to `lib/initials.ts`.
- **Brand motif = the arch** (`rounded-t-full`, tree canopy / doorway) for hero photo crops and a
  few solid forest/gold accent shapes — our answer to Wyzant's diamonds.
- **Photos**: ~16 JPEGs from Drive folder "Kairos Pictures 2025-2026" (skip HEIC shortcuts),
  resized with `sips -Z 2000`, quality ~80, to `public/images/kairos/<scene>.jpg`, total < 8 MB.
  Existing `photo-1..5.jpg` kept (used by `/lp`).
- **Video**: a phone clip (`IMG_3559.mov` 18 MB or `IMG_3606.mov`) trimmed to an 8–12 s loop,
  1280px wide, H.264 MP4 + WebM, no audio, ≤ 3 MB each, plus JPEG poster. Encoded by
  installing `ffmpeg-static` into the scratchpad (`npm i ffmpeg-static` there, run the binary
  at `require('ffmpeg-static')`) — not a project dependency (challenger finding 13).
  `VideoHero` always renders `<video autoPlay muted loop playsInline preload="metadata" poster>`;
  under reduced motion it pauses via JS after mount and CSS hides nothing — no element swap.
- **Naming**: PascalCase component files (`components/aceternity/FlipWords.tsx` …), hooks in
  `lib/` (challenger finding 12).

### Data Model Changes

No database. Content files only:
- `lib/content.ts`: `TeamMember.image?: string`; `stats[]` optional `count`/`suffix`.
- `lib/storybrand.ts`: slug union adds `"d"`; `conceptD`; appended to `concepts`.

### API Changes

None.

### UI Changes

New: `lib/utils.ts` (`cn`), `lib/initials.ts`, `components/aceternity/{FlipWords,Timeline,FocusCards,LayoutGrid,TabBar}.tsx`,
`components/ReviewMarquee.tsx`, `components/StatsBar.tsx`, `components/ui/CountUp.tsx`,
`components/TutorCard.tsx`, `components/VideoHero.tsx`, `components/ParallaxGallery.tsx`,
`components/concepts/DayScroller.tsx`, `components/concepts/PathFinder.tsx`, `app/(site)/concepts/d/page.tsx`.

Modified: `components/ui/Reveal.tsx` (reduced-motion fix only), `components/home/Hero.tsx`,
`app/layout.tsx` (noscript style), `app/globals.css`, `tailwind.config.ts`, `app/(site)/page.tsx`,
`app/(site)/concepts/{page,a/page,b/page,c/page}.tsx`, `app/(site)/about/page.tsx`,
`app/(site)/testimonials/page.tsx`, photo-bearing interior pages, `lib/content.ts`, `lib/storybrand.ts`,
`e2e/smoke.spec.ts`.

### Out of Scope

- `/lp/*`, `app/(bare)`, `components/lp/*` (only indirectly affected via the `Reveal` reduced-motion fix), contact form/API.
- Real headshots, Google rating number/stars.
- Choosing a winning concept / replacing `/`.
- Services-page hover effect (dropped), Background Gradient Animation and other gimmicky Aceternity pieces.
- New copy beyond short headings/labels for new sections.

### Flagged Assumptions

- **Assumption:** No star rating or "4.9 on Google" number; cards say "Google review" (existing figcaption format).
  **Reasoning:** Rating/count not verified; never fabricate. **Risk if wrong:** weaker trust signal; trivial to add later.
- **Assumption:** I pick the ~16 photos and the video clip (all families signed releases).
  **Risk if wrong:** owner swaps files; no code change.
- **Assumption:** Headline stays "Where students fall in love with ___" (reading / math / writing / science / learning).
  **Risk if wrong:** copy tweak.
- **Assumption:** Homepage tutor strip shows 4 cards + link to About. **Risk if wrong:** count change.

### Research Discoveries

- **Discovery:** 12 real Google reviews exist with `pull` excerpts and `source: "Google"`. **Impact:** marquee uses `pull`; ids untouched (`getTestimonials` throws on unknown ids); reuse existing figcaption format `author · role · Google review`.
- **Discovery:** `Reveal` shared with `/lp` + their e2e tests (single h1, no horizontal scroll at 360px, CTA above fold). **Impact:** Reveal's props/normal behaviour unchanged; marquee wrappers `overflow-hidden`.
- **Discovery:** Reduced-motion users currently see blank sections (challenger, verified with Playwright). **Impact:** fixed in Step 1; tests assert computed opacity, not `toBeVisible`.
- **Discovery:** Stats bar copy-pasted in 3 places. **Impact:** `StatsBar` replaces the 2 `(site)` copies; `ProofStrip` untouched.
- **Discovery:** Several Aceternity components don't fit as-is (see Architecture Decisions). **Impact:** 5 adapted, 3 custom.
- **Discovery:** `StickyCallBar` relies on `pb-20` from `app/(bare)/layout.tsx`. **Impact:** Concept A wraps its content in `pb-20 sm:pb-0`.
- **Discovery:** `ServiceCard` is a `<Link>` and `Service.icon` is a function (can't cross into client components). **Impact:** client components receive only serializable props (slugs, strings, image paths); icons rendered server-side or looked up inside client files.

---

## Reuse Inventory

Must use — do not recreate:
- `components/ui/Reveal.tsx` (after fix), `components/ui/Section.tsx` (`Section`, `SectionHeading`), `components/ui/PageHero.tsx`, `components/CTASection.tsx`, `components/ServiceCard.tsx`.
- `components/lp/StickyCallBar.tsx` (Concept A, import only).
- `lib/content.ts`: `testimonials`, `getTestimonials`, `team`, `leadership`, `stats`, `services`, `apex`, `earlyLearners`.
- `lib/storybrand.ts`, `lib/site.ts`.
- `app/globals.css` utilities (`container-page`, `btn-*`, `eyebrow`, `prose-kairos`) and reduced-motion rule.
- `tailwind.config.ts` tokens (`shadow-soft`, `shadow-card`, `rounded-4xl`).

Can extend:
- `components/lp/TestimonialCards.tsx` / testimonials figcaption markup → copied pattern for marquee card (lp file not edited).
- `initials()` → `lib/initials.ts`.
- `tailwind.config.ts` keyframes → add `marquee` (keep `fade-up`).

---

## Implementation Plan

Built as vertical slices; each slice ends with `npm run typecheck && npm run lint` and a quick screenshot.

### Step 1: Foundation + reduced-motion fix
- **Files:** `package.json` (`clsx@^2.1.1`, `tailwind-merge@^2.6.1`), `lib/utils.ts`, `lib/initials.ts`, `components/ui/Reveal.tsx`, `components/home/Hero.tsx`, `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`, `app/(site)/about/page.tsx` (import `initials`).
- **Modify details:** Reveal — remove the `if (reduce) return <Tag>` branch; always render `MotionTag` with `data-reveal`; `animate` = visible when `shown || reduce`; transition `duration: reduce ? 0 : 0.55`. Hero — same idea: no tree branching; reduced motion → `transition: {duration: 0}`, add `data-reveal` on animated children. CSS safety net as above. Marquee keyframe.
- **Test:** add e2e `reduced-motion.spec.ts`: with `reducedMotion: "reduce"`, on `/`, `/about`, `/testimonials`, `/concepts/a`, every `[data-reveal]` and the h1 have computed opacity (element and all ancestors) > 0.9 after load. Run it red first against current code to confirm the bug, then green.
- **Watch out:** `/lp` e2e must still pass (CTA above fold).

### Step 2: Media
- Download candidates from Drive folder `1kApycWRXfL8nMbAEQww4KvVQPuDvYkMK` to scratchpad, view, pick ~16 by scene (1:1 tutoring, small group, young kids, older students, wide classroom, hands-on activity, outdoors, building). Resize + save to `public/images/kairos/`. Video encode + poster to `public/video/`.

### Step 3: Shared components + homepage (bold)
- `components/ReviewMarquee.tsx` (client): 2 rows × 6 reviews, opposite directions, 40s/55s, pause on hover/focus-within + visible pause button, duplicate list `aria-hidden`, `overflow-hidden` wrapper, edge fade mask.
- `components/ui/CountUp.tsx` + `components/StatsBar.tsx`.
- `components/TutorCard.tsx` (`TutorAvatar` + `TutorCard`).
- `components/aceternity/FlipWords.tsx`; `components/home/Hero.tsx` uses it inside the single h1; arch collage of 2–3 new photos + 2 drifting accent arches.
- `components/home/ParallaxPhoto.tsx` (client, `useScroll({target})`, ±40px) for the APEX band photo.
- `app/(site)/page.tsx`: StatsBar replaces inline trust bar; ReviewMarquee replaces the 3-quote preview (keep "Read more stories" link); "Meet our tutors" strip (4 TutorCards + link) before CTA; new photos in callout + APEX band.

### Step 4: Concept A (structured)
- `components/aceternity/Timeline.tsx` for plan steps; StatsBar replaces inline stats; `StickyCallBar` + `pb-20 sm:pb-0` wrapper.

### Step 5: Concept B (story)
- `components/concepts/DayScroller.tsx`: 4–5 moments (morning arrival, focused work, small-group, hands-on project, pickup/homework club) — left column text steps, right sticky photo cross-fades to the active step (`useInView` per step); on mobile each step shows its own photo inline (no sticky).
- `components/ParallaxGallery.tsx`: 3 columns drifting at different rates on page scroll; mobile single column, no drift. Hero photo → best new wide photo.

### Step 6: Concept C (interactive)
- `components/aceternity/TabBar.tsx` (sliding pill) + `components/concepts/PathFinder.tsx` (accessible tabs, only active panel in flow, AnimatePresence cross-fade).
- `components/aceternity/FocusCards.tsx` replacing the plain service grid; slug→photo map in page; titles always visible.
- Add `/concepts/c` to the 360px overflow test.

### Step 7: Concept D (cinematic, new)
- `components/VideoHero.tsx`; `components/aceternity/LayoutGrid.tsx` (fixed-position expanded card, Esc close, button triggers); `app/(site)/concepts/d/page.tsx` (noindex) : VideoHero (single h1) → LayoutGrid gallery → ReviewMarquee → TutorCard row → 3-step plan → CTASection. `conceptD` copy in `lib/storybrand.ts`.
- `app/(site)/concepts/page.tsx`: "Four homepage directions", `md:grid-cols-2`, each card says what it explores.

### Step 8: Interior pages (calm)
- `/about`: team grid uses `TutorCard`; leadership uses `TutorAvatar`; new photo.
- `/testimonials`: ReviewMarquee under the hero; masonry kept; h1 unchanged.
- apex / early-learners / summer / fall-classes: swap in best-fitting new photo; `group-hover:scale-[1.03]` zoom only on linked image cards.

### Step 9: Tests + screenshots
- `e2e/smoke.spec.ts`: `/concepts/a`–`d` load with one h1; 360px no-horizontal-overflow for `/`, `/concepts/c`, `/concepts/d`, `/testimonials`.
- Screenshots (desktop 1440 + mobile 390) of `/`, concepts a–d, `/about`, `/testimonials` into `e2e/screenshots/polish-*.png`.

### Final Step: Verify
`npm run typecheck && npm run lint && npm run build && npm run test:e2e` — all pass.

---

## Quality Criteria

- [ ] No duplicated functionality: `Reveal`, `Section`, `SectionHeading`, `PageHero`, `CTASection`, `ServiceCard`, `StickyCallBar`, `getTestimonials` imported, not recreated; `grep -rn "function initials" app components lib` → 1 hit (`lib/initials.ts`).
- [ ] Every new component file is imported somewhere (grep each export name).
- [ ] `grep -rn "motion/react\|@tabler" app components lib` → 0; `grep -rnE "dark:|purple|indigo|neutral-|zinc-|slate-" components/aceternity` → 0.
- [ ] No component branches its rendered element tree on `useReducedMotion()` (`grep -n "if (reduce)" -A2` shows no early `return`); VideoHero renders `<video>` in all cases.
- [ ] Reduced-motion e2e asserts computed opacity > 0.9 for all `[data-reveal]` and h1s on `/`, `/about`, `/testimonials`, `/concepts/a`–`d` — and it failed before Step 1's fix.
- [ ] `git diff origin/main --stat -- components/lp app/\(bare\)` empty; Reveal's exported props unchanged.
- [ ] `grep -rn "Math.random\|cloneNode" components app` → 0.
- [ ] Marquee: duplicate list has `aria-hidden="true"`; visible pause button with `aria-pressed`; wrapper `overflow-hidden`.
- [ ] PathFinder: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"`; only the active panel rendered.
- [ ] No review is shown next to a photo that could be read as the reviewer's portrait.
- [ ] Client components receive only serializable props (no `icon` / functions from server pages) — build passes without "Functions cannot be passed" errors.
- [ ] Exactly one `h1` per page; `/` h1 contains "fall".
- [ ] No horizontal overflow at 360px on `/`, `/concepts/c`, `/concepts/d`, `/testimonials` (e2e).
- [ ] `grep -rn "<img" components app` → 0; every `next/image` has `sizes`; hero images `priority`.
- [ ] `du -sh public/images/kairos` < 8 MB; each file in `public/video` ≤ 3 MB.
- [ ] `concepts/d` exports noindex robots; not in `app/sitemap.ts`.
- [ ] Testimonial ids and quote text unchanged.
- [ ] Every row of the "Mobile & desktop behaviour" table verified in screenshots at 390 / 768 / 1440 (`e2e/screenshots/polish-*-{mobile,tablet,desktop}.png`).
- [ ] No horizontal overflow at 360px on every changed page; new interactive controls ≥ 44×44px.
- [ ] No hover-only content: `grep -rn "group-hover:opacity-100\|hover:opacity-100" components` hits all have a non-hover visible fallback.
- [ ] Lighthouse mobile CLS < 0.1 on `/` and `/concepts/d`.
- [ ] typecheck, lint, build, e2e all pass.

### Minor Notes from Challenger
- LayoutGrid off-screen expansion on mobile → addressed via fixed positioning (Step 7).
- Google badge already exists in figcaption → reused, not re-added.
- Step ordering restructured into vertical slices.
