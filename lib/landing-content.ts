// Copy for the paid-traffic landing pages (Facebook ads → /lp/apex,
// /lp/tutoring, and their site-chrome variants). Every claim here traces
// back to `lib/content.ts` (services, apex) — nothing is invented.

export type LandingCopy = {
  program: "APEX" | "Private Tutoring";
  eyebrow: string;
  headline: string;
  subhead: string;
  painPoints: string[];
  proofPoints: string[];
  planSteps: string[];
  ctaLabel: string;
};

export const apexLanding: LandingCopy = {
  program: "APEX",
  eyebrow: "Now enrolling — Grades 3–9",
  headline: "A full-time alternative to traditional school, built around your child.",
  subhead:
    "APEX is a small-group, mastery-based program in Salinas — students master core academics in focused, personalized sessions, then spend the rest of the day building real-world skills and confidence.",
  painPoints: [
    "Traditional school moving too fast, or too slow, for your student.",
    "A classroom of 30 where your child can't get the individual attention they need.",
    "Wanting more for your student than a one-size-fits-all school day.",
  ],
  proofPoints: [
    "Personalized, mastery-based academics — students move at their own pace.",
    "Small-group, community-driven environment where every student is known by name.",
    "A free consultation call before you commit to anything.",
  ],
  planSteps: [
    "Book a free call to see if APEX is the right fit.",
    "Meet the team and see the space in Salinas.",
    "Enroll your student in a program built around them.",
  ],
  ctaLabel: "Book a free APEX call",
};

export const tutoringLanding: LandingCopy = {
  program: "Private Tutoring",
  eyebrow: "All ages, every subject",
  headline: "One-on-one tutoring that meets your student exactly where they are.",
  subhead:
    "From early reading to AP coursework, our experienced tutors work one-on-one with your student — in person in Salinas or online — starting with a short consultation call to find the right match.",
  painPoints: [
    "A specific subject or skill your student is stuck on.",
    "Grades slipping and not knowing where to start.",
    "Wanting a tutor who actually fits your student's personality, not just their schedule.",
  ],
  proofPoints: [
    "In-person sessions at our Salinas center or online — whatever fits your family.",
    "Every subject, every level: early literacy, math, writing, world languages, test prep, AP.",
    "Matched to a tutor based on subject, learning style, and personality.",
  ],
  planSteps: [
    "Book a free consultation call.",
    "We match your student with the right tutor.",
    "Start seeing progress, session by session.",
  ],
  ctaLabel: "Book a free consultation",
};
