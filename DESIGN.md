---
name: Kairos Learning Solutions
description: A bright, friendly, hand-made site for a Salinas learning center, built on logo greens, a serif voice, and a doorway arch.
colors:
  forest-50: "#f5f8ee"
  forest-100: "#e9f0d9"
  forest-200: "#d3e1b0"
  forest-300: "#b5cc7c"
  forest-400: "#9cb957"
  forest-500: "#88a838"
  forest-600: "#6a8c1f"
  forest-700: "#4a700a"
  forest-800: "#3b5a08"
  forest-900: "#2c4306"
  forest-950: "#1a2804"
  cream: "#ffffff"
  sand: "#f4f5f0"
  ink: "#1f2319"
  gold-400: "#e6b64c"
  gold-500: "#e0a23c"
  gold-600: "#c4842a"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  lead:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
  ring-label:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.12em"
  ring-label-compact:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "10.5px"
    fontWeight: 600
    letterSpacing: "0.12em"
  offer-display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "2.15rem"
    fontWeight: 600
    lineHeight: 1.15
  offer-title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 600
  offer-lead:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
  offer-small:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
  classic-hero:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "2.6rem"
    fontWeight: 600
    lineHeight: 1.08
rounded:
  md: "6px"
  lg: "8px"
  arch-foot: "1.75rem"
spacing:
  page-gutter: "20px"
  page-gutter-sm: "32px"
  container: "72rem"
  narrow: "48rem"
components:
  button-primary:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.forest-700}"
  button-accent:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-accent-hover:
    backgroundColor: "{colors.gold-400}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.forest-800}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.cream}"
  button-ghost-hover:
    backgroundColor: "{colors.forest-100}"
    textColor: "{colors.forest-800}"
---

# Design System: Kairos Learning Solutions

## Overview

**Creative North Star: "The Open Doorway"**

The site is an invitation to step in. Its one recurring shape is the arch, a doorway and tree-canopy silhouette that frames photos in page headers. Around it sits a white page, greens sampled straight from the logo, and a serif voice that feels written by a person rather than generated. It should read as a real place run by a real teacher, not a template.

The mood is bright, friendly, and energetic: sunny gold accents, a hand-drawn underline that draws itself under the key phrase of each headline, and content that rises gently into view. Energy comes from warmth and motion at the edges, never from loud color or clutter. Surfaces stay flat and light; photos carry the people.

Everything is plain-spoken. Prices, hours, and credentials are stated as facts, not decorated.

**Key Characteristics:**
- White page, logo greens, a single warm gold accent
- Serif headings (Source Serif 4), sans body (Public Sans)
- Arch-framed photography as the signature shape
- Flat surfaces: tonal bands, no drop shadows
- Hand-drawn gold underline as the one decorative flourish
- Reveal and hero-rise motion that never leaves content hidden

## Colors

A white page with one family of greens pulled from the logo and a single gold accent, kept for emphasis.

### Primary
- **Logo Wordmark Green** (`#4a700a`, forest-700): links, hover state of primary buttons, key accents on light backgrounds.
- **Deep Forest** (`#3b5a08`, forest-800): primary buttons, outlines, and the dark hero band. The main action color.
- **Leaf Green** (`#88a838`, forest-500): the logo's leaf. Focus rings, selection tint, small highlights.
- **Heading Green** (`#2c4306`, forest-900): all h1 to h4 text.

### Secondary
- **Sunlit Gold** (`#e0a23c`, gold-500): the accent button, the hand-drawn headline underline. Hover goes lighter (`#e6b64c`).

### Neutral
- **Page White** (`#ffffff`, cream): page and card surface, and text on dark green. The token is named cream but is pure white.
- **Quiet Sand** (`#f4f5f0`, sand): the one light neutral, used to alternate page bands.
- **Pale Meadow** (`#f5f8ee`, forest-50): tinted hero and section backgrounds, usually at 60% opacity.
- **Ink** (`#1f2319`, ink): body text, usually at 80% opacity for paragraphs.

### Named Rules
**The Logo-Green Rule.** Every green comes from the forest scale sampled from the logo. No outside greens, teals, or blues.

**The One Warm Note Rule.** Gold is the only warm color. It marks one thing per view: the action or the underlined phrase.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif)
**Body Font:** Public Sans (with system-ui, sans-serif)

**Character:** A bookish serif for headings paired with a clean, friendly sans for reading. Headings are balanced (`text-wrap: balance`) so lines break gracefully.

### Hierarchy
- **Display** (600, `clamp` to 3.25rem, 1.1): page hero titles, one per page.
- **Headline** (600, 1.875 to 2.25rem, ~1.2): section headings.
- **Title** (600, 1.25 to 1.5rem): card and program titles.
- **Body** (400, 1rem, 1.625, Ink at 80%): paragraphs, capped near 65 to 75ch.
- **Lead** (400, 1.125rem): hero intro text.
- **Label** (600, 0.875rem): buttons and small controls. Sentence case.

### Special sizes
- **Ring label** (13px, 10.5px on phones): the curved KAIROS text around hero photos. Decorative, set in the serif with wide letter spacing, and hidden from screen readers.
- **Offer sizes** (2.15rem, 1.75rem, 1.05rem, 0.95rem): the ad landing pages in `components/lp/` use tighter phone-first sizes between the standard steps. They apply only to those pages.
- **Classic hero** (2.6rem): the headline on the original homepage at `/classic`.

### Named Rules
**The Sentence-Case Rule.** No uppercase labels, no letter-spaced eyebrow text. The legacy `.eyebrow` class exists in `globals.css` but must not be used in new work.

## Layout

Content sits in a centered container of `max-w-6xl` (72rem) with 20px gutters, 32px from the `sm` breakpoint. Long-form text uses `max-w-3xl`. Interior pages open with a split hero (text 1.15fr, photo 0.85fr) that stacks on mobile. Sections alternate between white and Quiet Sand bands. Spacing is generous and uses Tailwind's 4px scale. A sticky call bar appears on mobile landing pages, with body padding reserved beneath the footer.

## Elevation & Depth

The system is flat. Depth comes from tonal bands (white, sand, pale green) and thin forest-100 borders, not shadows. `tailwind.config.ts` still defines `shadow-soft` and `shadow-card`; treat these as legacy and do not use them in new work.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Separate them with a band color change or a hairline `forest-100` border.

## Shapes

Corners are modest: `rounded-md` (6px) on buttons, `rounded-lg` (8px) on cards and photos. The signature is the **arch**: a doorway silhouette (`50% 50% 1.75rem 1.75rem / 40% 40% 1.75rem 1.75rem`) cropping hero photos at 4:5, optionally wrapped by the KAIROS text ring. Elliptical radii keep the arch's shoulders from squashing. No pills, no fully round badges.

## Components

### Buttons
- **Shape:** gently rounded (6px), 12px by 20px padding, semibold small text.
- **Primary:** Deep Forest fill, white text. Hover lightens to Logo Wordmark Green; presses down 1px.
- **Accent:** Sunlit Gold fill, Ink text, for the single most important action on a page.
- **Outline:** 2px Deep Forest border, transparent fill; fills on hover. On dark bands it inverts to white.
- **Ghost:** Deep Forest text, pale green fill on hover.
- **Focus:** a 2px Leaf Green ring with a 2px offset. Disabled drops to 60% opacity.

### Page Hero
- A pale-green, sand, or white band opening every interior page, in layouts: arch, flip, card, wide, dark, centered, plain. Title rises in, the gold underline draws left to right under the marked phrase, intro and buttons follow with staggered delays.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** white on sand bands, or sand on white bands.
- **Shadow Strategy:** none (see Elevation).
- **Border:** optional hairline `forest-100`.

### Navigation
- Solid header on every page except the home page, whose hero is light. Programs menu with child descriptions.

### Hand-Drawn Underline
- A gold stroke under one phrase of a hero title, drawn by clip-path animation. The only decorative flourish; use once per page.

## Do's and Don'ts

### Do:
- **Do** take every green from the forest scale and keep gold for one emphasis per view.
- **Do** frame the main page photo in the arch.
- **Do** write in Jackie's plain first-person voice with real facts (prices, hours, credentials).
- **Do** keep scroll reveal content visible without JS and under reduced motion.
- **Do** keep a visible 2px green focus ring on every interactive element.

### Don't:
- **Don't** use drop shadows, pill badges, or uppercase letter-spaced eyebrow labels.
- **Don't** use em dashes in site copy.
- **Don't** introduce new accent colors, gradients, or glassy effects.
- **Don't** hardcode hex values in components; use the Tailwind tokens.
- **Don't** invent testimonials, results, or enrollment counts.
