// StoryBrand-framework copy for the homepage concept comps at
// the homepage and the ad landing pages. Each concept tells the same true story — a struggling
// student, Kairos as the guide, a clear plan, a confident kid on the other
// side — with a different structural emphasis. Facts here (grade ranges,
// program names, tuition) come from `lib/content.ts` / `lib/site.ts`; this
// file only adds narrative framing, not new claims.

import type { photos } from "@/lib/photos";

export type ConceptCopy = {
  slug: "a" | "b" | "c" | "d";
  label: string;
  pitch: string;
  // The interaction style this concept tries out, shown on /landingpages.
  explores?: string[];
  heroHeadline: string;
  heroSub: string;
  /** Shorter hero line for phones, where the full heroSub is too much text. */
  heroSubShort?: string;
  problem: {
    external: string;
    internal: string;
    philosophical: string;
  };
  plan: string[];
  // Short headings for each plan step, where a concept shows them.
  planTitles?: string[];
  successVision: string;
  failureStakes: string;
};

export const conceptB: ConceptCopy = {
  slug: "b",
  explores: ['"A day at Kairos" sticky photo scroller', "Drifting photo gallery"],
  label: "Concept B: A day at Kairos",
  pitch:
    "A photo-led homepage that walks through a day at Kairos before asking for anything.",
  heroHeadline: "A day at Kairos, from morning academics to afternoon projects.",
  heroSub:
    "Since 2020 we've taught Salinas students one-on-one and in small groups at 836 South Main Street. Here's what a day here looks like.",
  problem: {
    external: "Nightly homework fights, or a child who dreads going to school.",
    internal: "You're worried this is how it's going to stay.",
    philosophical: "A small group and a teacher who knows your child can change how school feels.",
  },
  plan: [
    "Call to set up a visit and meet the teachers.",
    "We match your student with a tutor or program that fits their pace.",
    "Your student starts at their own level.",
  ],
  successVision: "A student who's glad to walk in the door.",
  failureStakes: "The longer school stays a daily fight, the harder it is to turn around.",
};

export const conceptC: ConceptCopy = {
  slug: "c",
  explores: ['"My student needs…" path-finder', "Photo program cards with focus effect"],
  label: "Concept C: Find your program",
  pitch:
    "A program-finder homepage for parents who arrive already comparing options. It's organized around which program fits, with less story.",
  heroHeadline: "Which Kairos program fits your student?",
  heroSub:
    "We offer everything from an hour of tutoring to a full school day for TK to 9th grade, all at our center in Salinas. Homeschool families can sign up month to month, with no long-term contract. Pick what your student needs below, or call and I'll help you choose.",
  heroSubShort: "From an hour of tutoring to a full school day, with homeschool support month to month.",
  problem: {
    external: "Tutoring, homeschool support, classes and full-time school can sound alike, and it's hard to tell which one your student needs.",
    internal: "You don't want to pay for the wrong one.",
    philosophical: "The right amount of help depends on your student, so start with what they need now.",
  },
  plan: [
    "Pick what your student needs right now.",
    "See the matching program: Private Tutoring, Homeschool Support and Classes, or APEX.",
    "Call us to check the fit before you sign up.",
  ],
  successVision:
    "You know which program to start with, and your student gets the amount of help they need.",
  failureStakes: "Picking the wrong program can cost a semester.",
};


// Concept B's "a day at Kairos" walk-through. Every detail comes from lib/content.ts
// (APEX's 2 Hour Learning model, Early Learners' Tue–Thu mornings, the center's
// Monday to Thursday hours) — no invented schedule times.
export type DayMoment = {
  when: string;
  title: string;
  body: string;
  photo: keyof typeof photos;
};

export const dayAtKairos: DayMoment[] = [
  {
    when: "Morning",
    title: "Core academics",
    body: "APEX students work through core subjects in focused, personalized sessions using the 2 Hour Learning model, each at their own level.",
    photo: "studentsLearning",
  },
  {
    when: "Tuesday to Thursday mornings",
    title: "Early Learners, grouped by skill",
    body: "TK to 2nd graders learn in small, hands-on groups based on what each child is ready for.",
    photo: "craftProject",
  },
  {
    when: "Afternoon",
    title: "Projects and life skills",
    body: "With the core work done, APEX students spend the rest of the day on projects, presentations and life skills.",
    photo: "presenting",
  },
  {
    when: "All year",
    title: "Events and picnics",
    body: "Social events through the year, with teachers who know every student by name.",
    photo: "outdoors",
  },
];
