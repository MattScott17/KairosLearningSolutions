// StoryBrand-framework copy for the three homepage concept comps at
// /concepts/a, /b, /c. Each concept tells the same true story — a struggling
// student, Kairos as the guide, a clear plan, a confident kid on the other
// side — with a different structural emphasis. Facts here (grade ranges,
// program names, tuition) come from `lib/content.ts` / `lib/site.ts`; this
// file only adds narrative framing, not new claims.

export type ConceptCopy = {
  slug: "a" | "b" | "c";
  label: string;
  pitch: string;
  heroHeadline: string;
  heroSub: string;
  problem: {
    external: string;
    internal: string;
    philosophical: string;
  };
  plan: string[];
  successVision: string;
  failureStakes: string;
};

export const conceptA: ConceptCopy = {
  slug: "a",
  label: "Concept A — The Direct Guide",
  pitch:
    "A direct-response homepage: one problem, one guide, one plan, one CTA — repeated until it's impossible to miss.",
  heroHeadline: "Your child is capable of more than their current classroom can give them.",
  heroSub:
    "Kairos is a Salinas tutoring and homeschool center built around one idea: meet every student exactly where they are, then help them go further. Book a free call and we'll help you find the right fit — a tutor, a program, or APEX, our full-time alternative to traditional school.",
  problem: {
    external: "Falling behind, disengaged, or stuck in a classroom that moves at one speed for everyone.",
    internal: "You worry you've run out of ways to help, or that you're not enough on your own.",
    philosophical: "Every kid deserves an education built around them, not the other way around.",
  },
  plan: [
    "Book a free call — tell us where your student is struggling or what they need.",
    "We match your student with the right tutor or program.",
    "Watch them build the confidence and skills to keep going on their own.",
  ],
  successVision:
    "A student who looks forward to learning again — confident, capable, and supported by people who know their name.",
  failureStakes:
    "Left unaddressed, small gaps become years of frustration — for your student, and for you.",
};

export const conceptB: ConceptCopy = {
  slug: "b",
  label: "Concept B — A Day at Kairos",
  pitch:
    "A narrative, photo-led homepage that walks a visitor through what a day at Kairos actually feels like, before asking for anything.",
  heroHeadline: "Where students fall in love with learning again.",
  heroSub:
    "Since 2020, Kairos has helped Salinas families turn homework battles and school-day dread into something calmer — one student, one relationship, one small win at a time.",
  problem: {
    external: "A student who dreads school, homework, or falling further behind each semester.",
    internal: "The quiet fear that this is just how it's going to be for your family.",
    philosophical: "Kids don't need to be fixed — they need a place built for how they actually learn.",
  },
  plan: [
    "Come see the space and meet the team — book a free call to start.",
    "Your student is matched with a tutor or program that fits their pace and personality.",
    "Progress you can actually see, session by session.",
  ],
  successVision:
    "A student who walks in the door glad to be there, and walks out a little more sure of themselves than the day before.",
  failureStakes:
    "The longer the daily struggle goes unaddressed, the more it becomes about identity, not just academics.",
};

export const conceptC: ConceptCopy = {
  slug: "c",
  label: "Concept C — Find Your Path",
  pitch:
    "A path-finder homepage for visitors who arrive already comparing options — structured around 'which program fits your family' rather than a single narrative.",
  heroHeadline: "Every family's path through Kairos looks a little different. Here's how to find yours.",
  heroSub:
    "From an hour of homework help to a full-time alternative to traditional school, Kairos offers a level of support that grows with your student — all in Salinas, all built around the individual, none of it one-size-fits-all.",
  problem: {
    external: "Too many options that all sound the same, and no clear way to tell which one your student actually needs.",
    internal: "Not wanting to guess wrong on something this important.",
    philosophical: "The right amount of support is the one that fits your specific student — not the most popular one.",
  },
  plan: [
    "Answer one question: how much support does your student need right now?",
    "See the program that fits — Private Tutoring, Homework Club, Homeschool Support, or full-time APEX.",
    "Book a free call to confirm the fit before committing to anything.",
  ],
  successVision:
    "A family that knows exactly which door to walk through, and a student getting exactly the right level of support.",
  failureStakes:
    "Guessing wrong costs a semester of momentum — and the confidence to try again.",
};

export const concepts: ConceptCopy[] = [conceptA, conceptB, conceptC];
