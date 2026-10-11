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
  ctaLabel: string;
  // Reviews shown in the proof strip (ids from `testimonials` in lib/content.ts).
  testimonialIds: string[];
};

export const apexLanding: LandingCopy = {
  program: "APEX",
  eyebrow: "Now enrolling grades 3 to 9",
  headline: "A full-time alternative to traditional school, built around your child.",
  subhead:
    "Small groups. Personalized academics in the morning, projects and life skills the rest of the day. 9 a.m. to 2 p.m., Monday to Thursday.",
  painPoints: [
    "Your student moves at their own pace.",
    "Every student is known by name.",
    "A free tour before you commit to anything.",
  ],
  proofPoints: [
    "Personalized, mastery-based academics, so students move at their own pace.",
    "Small-group, community-driven environment where every student is known by name.",
    "A free tour before you commit to anything.",
  ],
  ctaLabel: "Send my interest form",
  testimonialIds: ["melissa-d", "andrea-r", "erica-r"],
};

export const tutoringLanding: LandingCopy = {
  program: "Private Tutoring",
  eyebrow: "All ages, every subject",
  headline: "One-on-one tutoring that meets your student exactly where they are.",
  subhead:
    "Experienced tutors, one-on-one, in person in Salinas or online. We match your student with the right tutor.",
  painPoints: [
    "Every subject, early reading to AP.",
    "In person in Salinas or online.",
    "Matched to your student's personality.",
  ],
  proofPoints: [
    "In-person sessions at our Salinas center or online, whatever fits your family.",
    "Every subject, every level: early literacy, math, writing, world languages, test prep, AP.",
    "Matched to a tutor based on subject, learning style, and personality.",
  ],
  ctaLabel: "Send my interest form",
  testimonialIds: ["kristine-a", "angelina-d", "molly-b"],
};
