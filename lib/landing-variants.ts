// Offer-first ("Hormozi-style") copy for the mobile landing variants at
// /lp/{tutoring,apex}/{a,b,c}. One `ProgramOffer` per program holds the
// shared offer (stack, who it's for, obstacles, FAQ); each variant only adds
// its own hero framing. Facts trace back to `lib/content.ts` / `lib/site.ts`.
// Deliberately absent until real ones exist: guarantees, scarcity counts,
// dollar "values" on stack items, and named student results.

import { apex, leadership, services } from "@/lib/content";
import { site } from "@/lib/site";
import { apexLanding, tutoringLanding, type LandingCopy } from "@/lib/landing-content";

export type VariantSlug = "a" | "b" | "c";
export type ProgramSlug = "tutoring" | "apex";

export type StackItem = { title: string; body: string };
export type Obstacle = { fear: string; fix: string };
export type Faq = { q: string; a: string };

export type VariantHero = {
  headline: string;
  // A short phrase inside `headline` to highlight (must appear verbatim).
  highlight?: string;
  subhead: string;
};

export type ProgramOffer = {
  slug: ProgramSlug;
  form: LandingCopy;
  stackTitle: string;
  stack: StackItem[];
  // Bottom line of the stack: real price (APEX) or the real first step (tutoring).
  priceLine: { label: string; value: string; note: string };
  riskReversal: { title: string; body: string };
  forYou: string[];
  notForYou: string[];
  obstacles: Obstacle[];
  faqs: Faq[];
  quickBullets: string[];
  testimonialIds: string[];
  photo: { src: string; alt: string };
  heroes: Record<VariantSlug, VariantHero>;
};

const lead = leadership[0];
const tutoringHighlights = services.find((s) => s.slug === "private-tutoring")!.highlights;
const tutoringPrice = tutoringHighlights.find((h) => h.label === "Pricing")!.value;
const money = (v: string) => v.replace(" / ", " a ");
const hoursLine = site.hours
  .filter((h) => h.time !== "Closed")
  .map((h) => `${h.day}: ${h.time}`)
  .join(" · ");

export const tutoringOffer: ProgramOffer = {
  slug: "tutoring",
  form: tutoringLanding,
  stackTitle: "Here's everything your student gets",
  stack: [
    {
      title: "A free consultation call",
      body: "We start by learning exactly where your student is stuck, before anyone books a session.",
    },
    {
      title: "A tutor matched to your student, one-on-one",
      body: "Matched on subject, learning style, and personality, then true one-on-one sessions at your student's pace.",
    },
    {
      title: "In person or online, every subject",
      body: "At our Salinas center on South Main Street, or online. Early literacy, math, writing, world languages, test prep, and AP coursework.",
    },
    {
      title: "A team led by a 30-year teacher",
      body: `${lead.name} brings 30+ years of teaching experience and an MA in Educational Leadership and Curriculum & Instruction.`,
    },
  ],
  priceLine: {
    label: "Step one costs",
    value: "$0",
    note: "The consultation call is free. We'll walk you through options and scheduling on the call.",
  },
  riskReversal: {
    title: "Zero risk to find out",
    body: "The first step is a free consultation call. You don't commit to anything until you know it's the right fit.",
  },
  forYou: [
    "Your student is stuck on a specific subject or skill.",
    "Grades are slipping and you don't know where to start.",
    "You want test prep or AP support from someone who knows the material.",
    "You tried a tutor before and it just didn't click.",
  ],
  notForYou: [
    "You want someone to do the homework for your student.",
    "You're looking for a one-size-fits-all worksheet program.",
  ],
  obstacles: [
    {
      fear: "“I don't even know what's actually wrong.”",
      fix: "That's what the free consultation call is for. We figure out where your student is stuck first.",
    },
    {
      fear: "“We tried a tutor. It didn't click.”",
      fix: "We match on learning style and personality, not just subject and schedule.",
    },
    {
      fear: "“Our week is already packed.”",
      fix: "Flexible scheduling, in person in Salinas or online from home.",
    },
    {
      fear: "“How will I know it's working?”",
      fix: "Progress you can actually see, not just hours on an invoice.",
    },
  ],
  faqs: [
    {
      q: "How much does tutoring cost?",
      a: `Sessions are ${tutoringPrice}, depending on the subject and tutor. For a standing weekly session, the monthly plan is $360 for one session a week. Your free consultation call comes first, with no commitment.`,
    },
    {
      q: "How do you pick the tutor?",
      a: "We match each student with a tutor based on subject, learning style, and personality.",
    },
    {
      q: "When are you open?",
      a: `${hoursLine}.`,
    },
  ],
  quickBullets: [
    "One-on-one, every subject, every age",
    "Tutor matched to how your student learns",
    "In person in Salinas or online",
  ],
  testimonialIds: ["jamie-s", "kristine-a", "angelina-d"],
  photo: { src: "/images/photo-2.jpg", alt: "A Kairos tutor working with a student" },
  heroes: {
    a: {
      headline: "Get your student unstuck with a tutor matched to how they actually learn.",
      highlight: "unstuck",
      subhead:
        "One-on-one help for every age and subject, in Salinas or online, starting with a free consultation call.",
    },
    b: {
      headline: "Grades slipping? Homework fights every night? It's usually not your kid. It's the fit.",
      highlight: "It's the fit.",
      subhead:
        "Most students who struggle don't need more hours of the same thing. They need the right person explaining it the right way. That's what we do.",
    },
    c: {
      headline: "A tutor who actually fits your student.",
      highlight: "actually fits",
      subhead: "Private tutoring in Salinas and online. Tell us where to call and we'll set up your free consultation.",
    },
  },
};

export const apexOffer: ProgramOffer = {
  slug: "apex",
  form: apexLanding,
  stackTitle: "Here's everything that comes with APEX",
  stack: [
    {
      title: "Focused, mastery-based academics",
      body: "Core subjects mastered in efficient, high-focus blocks using the 2 Hour Learning model.",
    },
    {
      title: "Your child's pace, not the class's",
      body: "Ready to move ahead? Go for it. Need more time? Take it. Students move on when they've mastered it.",
    },
    {
      title: "A small group where they're known by name",
      body: "A close community where every student is seen and supported day to day.",
    },
    {
      title: "Real-world skills and mentorship",
      body: "Life skills and hands-on, project-based learning once core academics are done, with educators who build confidence and independence.",
    },
  ],
  priceLine: {
    label: "Your first step",
    value: "Free call and tour",
    // Non-breaking spaces keep "Grades 3 – 9" from splitting across lines.
    note: `${apex.tuition.term} · ${apex.gradeRange.replace(/ /g, "\u00a0")}`,
  },
  riskReversal: {
    title: "See it before you decide",
    body: "Start with a free call and a tour. You don't commit to anything until you've seen APEX and know it's right for your child.",
  },
  forYou: [
    `Your child is in ${apex.gradeRange.toLowerCase()}.`,
    "School is moving too fast, or too slow, for them.",
    "They're getting lost in a big classroom.",
    "You want more for them than a one-size-fits-all school day.",
  ],
  notForYou: [
    "You want a traditional lecture-style classroom.",
    "You're looking for part-time help. Private tutoring or homeschool support fits better.",
  ],
  obstacles: [
    {
      fear: "“School moves at the wrong speed for my kid.”",
      fix: "Each student moves at their own pace, not the pace of the class.",
    },
    {
      fear: "“My child disappears in a class that big.”",
      fix: "A small-group environment where every student is known by name.",
    },
    {
      fear: "“Will they actually learn the academics?”",
      fix: "Mastery-based: students master core subjects before they move on, in focused daily blocks.",
    },
    {
      fear: "“Homeschooling full-time is too much for me alone.”",
      fix: "APEX is a full-time program. We handle the structure, teaching, and accountability.",
    },
  ],
  faqs: [
    {
      q: "What is the 2 Hour Learning model?",
      a: apex.model,
    },
    {
      q: "How much does APEX cost?",
      a: `The full program is ${money(apex.tiers[0].price)} for a ${apex.tuition.term.toLowerCase()}, or ${money(apex.tuition.annual)}. Academics only is ${money(apex.tiers[1].price)}, and workshops only is ${money(apex.tiers[2].price)}. Call us or book a free tour and we'll go over it with you.`,
    },
    {
      q: "What does the rest of the day look like?",
      a: "Once core academics are mastered, students spend the day on life skills, hands-on project-based learning, and mentorship.",
    },
  ],
  quickBullets: [
    `Full-time, small-group · ${apex.gradeRange}`,
    "Mastery-based academics at your child's pace",
    "Real-world skills and mentorship every day",
  ],
  testimonialIds: ["jocelyn-w", "maria-r", "andrea-r"],
  photo: { src: "/images/photo-4.jpg", alt: "APEX students learning together at Kairos" },
  heroes: {
    a: {
      headline: "A school day built around your child, not a classroom of 30.",
      highlight: "built around your child",
      subhead:
        `Now enrolling ${apex.gradeRange.toLowerCase()}. Full-time, small-group learning in Salinas. Core academics in focused sessions, then real-world skills the rest of the day.`,
    },
    b: {
      headline: "Is your child bored, behind, or lost in the crowd?",
      highlight: "lost in the crowd?",
      subhead:
        "Traditional school moves one speed for everyone. APEX moves at your child's, and uses the time it saves to build the skills school never gets to.",
    },
    c: {
      headline: "Full-time school, at your child's pace.",
      highlight: "your child's pace.",
      subhead: `APEX is full-time school in Salinas for ${apex.gradeRange.toLowerCase()}. Tell us where to call and we'll set up a free call and tour.`,
    },
  },
};

export const programOffers: Record<ProgramSlug, ProgramOffer> = {
  tutoring: tutoringOffer,
  apex: apexOffer,
};

export const variantMeta: Record<VariantSlug, { label: string; pitch: string }> = {
  a: {
    label: "A: Grand Slam Offer",
    pitch: "Bold dream-outcome hero, the full offer stack, who it's for / not for, risk reversal, then the form.",
  },
  b: {
    label: "B: Problem → Fix",
    pitch: "Leads with the parent's frustration, answers each objection with a fix, proof, then the form.",
  },
  c: {
    label: "C: Short & Fast",
    pitch: "One-line promise and the callback form above the fold. Three bullets, proof, FAQ. Built for thumbs.",
  },
};

export const variantSlugs = Object.keys(variantMeta) as VariantSlug[];
