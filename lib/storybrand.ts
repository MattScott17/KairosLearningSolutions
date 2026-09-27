// StoryBrand-framework copy for the homepage concept comps at
// /concepts/a–d. Each concept tells the same true story — a struggling
// student, Kairos as the guide, a clear plan, a confident kid on the other
// side — with a different structural emphasis. Facts here (grade ranges,
// program names, tuition) come from `lib/content.ts` / `lib/site.ts`; this
// file only adds narrative framing, not new claims.

import type { photos } from "@/lib/photos";

export type ConceptCopy = {
  slug: "a" | "b" | "c" | "d";
  label: string;
  pitch: string;
  // The interaction style this concept tries out, shown on /concepts.
  explores?: string[];
  heroHeadline: string;
  heroSub: string;
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

export const conceptA: ConceptCopy = {
  slug: "a",
  explores: ["Scroll-progress timeline", "Count-up stats", "Phone call bar"],
  label: "Concept A: Direct",
  pitch:
    "A direct-response homepage. It names the problem, introduces Jackie and Kairos, lays out three steps, and repeats one call to action.",
  heroHeadline: "Tutoring, homeschool support and full-time school in Salinas, planned around your child.",
  heroSub:
    "I'm Jackie Scott. I've taught for more than 30 years, and in 2020 I opened Kairos on South Main Street. Call me and tell me about your student. I'll suggest a tutor, a program, or APEX, our full-time program for grades 3 to 9.",
  problem: {
    external: "Your student is behind, or bored, in a class that moves at one speed.",
    internal: "You've tried helping at home and it isn't working.",
    philosophical: "School should move at your child's pace.",
  },
  plan: [
    "Call or send a message and tell us what your student is struggling with.",
    "We match your student with a tutor or program.",
    "Your student starts at their own level and moves on when they're ready.",
  ],
  planTitles: ["Call us", "Get matched", "Start"],
  successVision: "A student who knows the material and walks into class ready.",
  failureStakes: "Gaps in reading and math are easier to close early.",
};

export const conceptB: ConceptCopy = {
  slug: "b",
  explores: ['"A day at Kairos" sticky photo scroller', "Drifting photo gallery"],
  label: "Concept B: A day at Kairos",
  pitch:
    "A photo-led homepage that walks through a day at Kairos before asking for anything.",
  heroHeadline: "A day at Kairos, from morning academics to Homework Club.",
  heroSub:
    "Since 2020 we've taught Salinas students one-on-one and in small groups at 836 South Main Street. Here's what a day here looks like.",
  problem: {
    external: "Homework fights every night, or a child who dreads going to school.",
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
    "We offer everything from an hour of homework help to a full school day for grades 3 to 9, all at our center in Salinas. Pick what your student needs below, or call and I'll help you choose.",
  problem: {
    external: "Tutoring, homework help, homeschool support and full-time school can sound alike, and it's hard to tell which one your student needs.",
    internal: "You don't want to pay for the wrong one.",
    philosophical: "The right amount of help depends on your student, so start with what they need now.",
  },
  plan: [
    "Pick what your student needs right now.",
    "See the matching program: Private Tutoring, Homework Club, Homeschool Support or APEX.",
    "Call us to check the fit before you sign up.",
  ],
  successVision:
    "You know which program to start with, and your student gets the amount of help they need.",
  failureStakes: "Picking the wrong program can cost a semester.",
};

export const conceptD: ConceptCopy = {
  slug: "d",
  explores: ["Looping classroom video hero", "Tap-to-open photo gallery", "Review marquee & tutor cards"],
  label: "Concept D: See it first",
  pitch:
    "A looping classroom video, a photo gallery, Google reviews and tutor cards come first. The pitch comes last.",
  heroHeadline: "Inside Kairos, on South Main Street in Salinas.",
  heroSub:
    "Tutoring, homeschool support and APEX, our full-time program for grades 3 to 9. This is a real class at Kairos.",
  problem: {
    external: "It's hard to judge a program from a brochure.",
    internal: "You want to picture your child here before you sign up.",
    philosophical: "Photos from ordinary days at Kairos.",
  },
  plan: [
    "Call and tell us about your student.",
    "Visit to see the space and meet the teachers.",
    "Start with the tutor or program that fits.",
  ],
  planTitles: ["Call", "Visit", "Start"],
  successVision: "Your student comes home wanting to tell you what they learned.",
  failureStakes: "A semester in the wrong setting is hard to get back.",
};

export const concepts: ConceptCopy[] = [conceptA, conceptB, conceptC, conceptD];

// Concept B's "a day at Kairos" walk-through. Every detail comes from lib/content.ts
// (APEX's 2 Hour Learning model, Early Learners' Tue–Thu mornings, Homework Club's
// 2:30–5:15 PM hours) — no invented schedule times.
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
    when: "2:30 to 5:15 PM",
    title: "Homework Club",
    body: "After school, students come in to finish their homework, and we check it before they go home.",
    photo: "homework",
  },
  {
    when: "All year",
    title: "Events and picnics",
    body: "Social events through the year, with teachers who know every student by name.",
    photo: "outdoors",
  },
];
