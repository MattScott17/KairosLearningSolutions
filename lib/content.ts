// Real business content — services, programs, team, testimonials, values.
// Reused and polished from the existing Kairos site. Edit freely.

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
  Home,
  Clock,
  HeartHandshake,
  Compass,
  Trophy,
  Lightbulb,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  summary: string;
  details: string[];
  highlights: { label: string; value: string }[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "private-tutoring",
    title: "Private Tutoring",
    short: "One-on-one, all ages and subjects",
    icon: BookOpen,
    summary:
      "Our team of experienced, friendly tutors work one-on-one with students of every age and subject — from early reading to AP science courses. We start with a short consultation call to match your student with the right tutor.",
    details: [
      "In-person sessions at our Salinas center or online — whatever fits your family.",
      "Every subject, every level: early literacy, math, writing, world languages, test prep, and AP coursework.",
      "We match each student with a tutor based on subject, learning style, and personality.",
      "$70–$120 per hour, depending on subject and tutor — set during your consultation with Jackie.",
      "Prefer a standing weekly session? A 1 session/week monthly plan is $360/month.",
    ],
    highlights: [
      { label: "Format", value: "In-person & online" },
      { label: "Ages", value: "All ages" },
      { label: "Pricing", value: "$70–$120 / hour" },
    ],
    cta: "Book a consultation",
  },
  {
    slug: "homework-club",
    title: "Homework Club",
    short: "After-school homework, handled",
    icon: Clock,
    summary:
      "Let us take the stress out of after-school homework. Choose how many days a week your student needs, drop them off after school, and pick them up when the work is done — reviewed and complete.",
    details: [
      "Open Monday through Thursday, 2:30–5:15 PM.",
      "Monthly plans: 1 day/week $180, 2 days/week $250, 3 days/week $320, 4 days/week $360.",
      "Second child on the same plan: $140, $180, $220, or $260 for the same day counts.",
      "No plan yet? Drop in for $20/hour or $50/day.",
      "Supportive educators keep students focused and on task, and homework gets checked before your student heads home.",
    ],
    highlights: [
      { label: "Days", value: "Mon – Thu" },
      { label: "Time", value: "2:30 – 5:15 PM" },
      { label: "Pricing", value: "From $180 / mo" },
    ],
    cta: "Reserve a spot",
  },
  {
    slug: "homeschool-support",
    title: "Homeschool Support",
    short: "Flexible packages for homeschool families",
    icon: Home,
    summary:
      "Every homeschooling journey is unique. Whether you want full curriculum planning and teaching or simply a flexible workspace for independent study, our tiered packages meet you where you are.",
    details: [
      "Level A — a safe, supportive space with socialization and occasional instruction or tutoring.",
      "Level B — full assessment, planning, and instruction at Kairos, plus time and space to complete work.",
      "Level C — everything in Level B, plus private tutoring, for a highly individualized plan.",
      "Level D — every Kairos benefit, for families who want a fully custom program built around their student.",
      "Month-to-month memberships, low student-to-teacher ratios, and flexible hourly packages — no long-term commitment required.",
    ],
    highlights: [
      { label: "Structure", value: "Levels A – D" },
      { label: "Commitment", value: "Month-to-month" },
      { label: "Support", value: "As much as you need" },
    ],
    cta: "Find your package",
  },
];

// Homeschool Support membership pricing — hours per month x Level A-D.
export const homeschoolPricing = {
  hoursPerMonth: [24, 32, 48, 64, 80, 100],
  levels: {
    A: [528, 690, 999, 1280, 1599, 1899],
    B: [816, 1050, 1399, 1728, 1999, 2550],
    C: [1320, 1760, 2400, 2990, 3680, 4500],
    D: [1968, 2560, 3800, 4990, 6160, 7600],
  },
};

export const registrationFees = [
  { label: "New Homeschool Support / APEX student", value: "$150 / year" },
  { label: "Returning Homeschool Support / APEX student", value: "$75 / year" },
  { label: "Tutor / enrichment registration", value: "$75 / semester" },
];

export type EnrichmentNote = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const enrichment: EnrichmentNote = {
  title: "Enrichment Classes",
  body: "Throughout the year Kairos hosts enrichment courses — writing, Spanish, STEM, and seasonal activities — so students can hone a skill or feed their curiosity. Spaces fill quickly; current offerings are posted on Instagram and in our seasonal catalogs.",
  icon: Sparkles,
};

export const values = [
  {
    icon: Users,
    title: "Specialized Attention",
    body: "Our entire model is built around the individual needs of your child — not a one-size-fits-all classroom.",
  },
  {
    icon: GraduationCap,
    title: "Professional Educators",
    body: "Our teachers and tutors bring deep experience in their subjects — and they're warm, patient, and genuinely fun to learn from.",
  },
  {
    icon: HeartHandshake,
    title: "Goal-Oriented Mentorship",
    body: "We blend tutoring, group instruction, and mentoring to grow both academic skills and confident, capable people.",
  },
];

export const apex = {
  name: "APEX",
  tagline: "A full-time learning program, reimagined",
  intro:
    "APEX is a full-time alternative to traditional school — a small-group program where your child is seen, supported, and challenged. We combine personalized academics, real life skills, and hands-on learning so students grow in both ability and confidence.",
  gradeRange: "Grades 3 – 9",
  tuition: {
    monthly: "$1,800 / month",
    annual: "$18,000 / year",
    term: "10-month program",
  },
  tiers: [
    {
      name: "APEX (full program)",
      price: "$1,800 / month",
      description: "The complete program — academics plus workshops.",
    },
    {
      name: "APEX Academics only",
      price: "$1,450 / month",
      description: "Just the personalized, mastery-based academic block.",
    },
    {
      name: "APEX Workshops only",
      price: "$650 / month",
      description: "Just the hands-on projects and life-skills workshops.",
    },
  ],
  model:
    "APEX uses the 2 Hour Learning model — the same approach used at Alpha Schools — where students master core academics in focused, personalized sessions, then spend the rest of the day building real-world skills.",
  pillars: [
    {
      icon: Compass,
      title: "Personalized pace",
      body: "Each student moves at their own pace — not the pace of the class. Ready to move ahead? Go for it.",
    },
    {
      icon: Users,
      title: "Small-group environment",
      body: "A close community where every student is known by name and supported day to day.",
    },
    {
      icon: Clock,
      title: "Focused academics",
      body: "Core subjects are mastered in efficient, high-focus blocks that respect a child's attention and energy.",
    },
    {
      icon: Trophy,
      title: "Confidence & independence",
      body: "Structure and accountability that help students become capable, self-directed learners.",
    },
  ],
  included: [
    "Personalized, mastery-based academics",
    "Small-group, community-driven environment",
    "Flexible pacing that lets students accelerate",
    "Built-in structure and accountability",
    "Life-skills and hands-on, project-based learning",
    "Mentorship that develops confidence and independence",
  ],
  outcomesNote:
    "Mid-year academic data shows APEX students outperforming national growth norms, with achievement gains from fall to winter across a wide range of learners.",
  comparison: [
    { traditional: "One pace for everyone", apex: "Personalized pace and progress" },
    { traditional: "Limited flexibility", apex: "Flexible, responsive structure" },
    { traditional: "Passive learning", apex: "Active, engaging learning" },
    { traditional: "Hard to feel known", apex: "Strong relationships and support" },
  ],
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Jackie Scott",
    role: "Owner & Lead Teacher",
    bio: "Jackie brings more than 30 years of teaching experience across grades 3–12, many subjects, and a range of educational settings. She holds an MA in Educational Leadership and Curriculum & Instruction, and her passion is helping students fall in love with learning.",
  },
  {
    name: "Venessa Gilbride",
    role: "Director",
    bio: "Venessa leads program development and community partnerships, drawing on a background in community engagement — including launching the first science fair at Washington Union School District.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Michelle Ball",
    role: "Teacher",
    bio: "Multiple Subject Credential with a Child Development emphasis from CSU Chico, and 17 years of classroom experience.",
  },
  {
    name: "Lisa Bleicher",
    role: "Teacher",
    bio: "38 years of kindergarten teaching experience before recently retiring — now bringing that same warmth to Kairos.",
  },
  {
    name: "Lori Grainger",
    role: "Teacher",
    bio: "27 years of teaching experience, primarily in 2nd grade, before retiring from the classroom.",
  },
  {
    name: "Brady Berg",
    role: "Tutor",
    bio: "B.S. in Biomedical Engineering and Mathematics from Cal Poly SLO, currently pursuing a Ph.D. in Mathematical, Computational Systems Biology at UC Irvine.",
  },
  {
    name: "Ethan Berg",
    role: "Online Tutor",
    bio: "A recent college graduate tutoring elementary through high school math and science.",
  },
  {
    name: "Colin McCardell",
    role: "Tutor",
    bio: "Math major at CSU Monterey Bay, tutoring through Calculus 3 with a focus on applied mathematics.",
  },
  {
    name: "Saara Kriplani",
    role: "Online Tutor",
    bio: "B.S. in Bioengineering: Bioinformatics from UC San Diego, teaching math from preschool through calculus.",
  },
  {
    name: "Trisha Hill",
    role: "Subject Specialist",
    bio: "15 years of teaching experience, full-time at New Republic Elementary in Salinas — nominated for Monterey County Teacher of the Year in 2022.",
  },
  {
    name: "Daryl Lyon",
    role: "Subject Specialist",
    bio: "BA in English Education from Southern Oregon University and 24 years teaching grades 11–12, with an emphasis on writing and critical thinking.",
  },
  {
    name: "Laura Palmer",
    role: "Subject Specialist",
    bio: "Certified Bilingual Teacher with a BA in Spanish and 28 years of experience, including Dual Immersion and bilingual fine arts instruction.",
  },
  {
    name: "Mendy Amaral",
    role: "Operations",
    bio: "A lifelong Salinas resident and 20+ year community volunteer who keeps everything at Kairos running.",
  },
];

export type Testimonial = {
  // Stable handle so pages can pick specific reviews without relying on order.
  id: string;
  // The full review, verbatim.
  quote: string;
  // A short verbatim excerpt (… marks a cut) for cards and featured spots.
  pull: string;
  author: string;
  role: string;
  // A concrete, named before/after result (e.g. "raised her math grade from a
  // D to a B in one semester"). Left undefined until real ones are collected —
  // never fabricated.
  result?: string;
  // Where the quote was published, when it's a public review.
  source?: "Google";
};

// Real Google reviews, quoted verbatim. Names are shortened to a last initial.
export const testimonials: Testimonial[] = [
  {
    id: "melissa-d",
    quote:
      "Kairos has truly been life-changing and nothing short of God-sent for our family. My son, who is now in 7th grade, struggled throughout his entire elementary school journey. For years, school was a daily challenge. From the very first day at Kairos, we saw a shift. Every single day has brought growth, encouragement, and renewed hope for his future. The environment at Kairos is rooted in purpose, structure, and care, and it has made an immeasurable difference in his life. His motivation, confidence, and belief in himself have improved dramatically. Academically and in life skills, the progress he has made in such a short time has been remarkable. He now approaches learning with confidence and a sense of direction that we had not seen before. What Kairos has given our son is truly priceless. We are deeply grateful for the support, leadership, and heart behind this program and highly recommend it to any family seeking a transformative educational experience.",
    pull: "Kairos has truly been life-changing and nothing short of God-sent for our family… His motivation, confidence, and belief in himself have improved dramatically.",
    author: "Melissa D.",
    role: "Parent of a 7th grader",
    source: "Google",
  },
  {
    id: "jocelyn-w",
    quote:
      "In the summer of 2025, I started looking for a tutor for my soon-to-be 4th grader because I knew he was capable of more. That search led us to Kairos and I'm so grateful it did. We began with a Kairos tutor who was amazing, and soon after learned about their unique 2 Hour Learning (APEX) model — a focused, mastery-based academic approach that gets the core stuff done in just two hours a day. Within weeks we made the decision to disenroll our 4th grader from public school. We enrolled him in the program, and the growth we've seen has been incredible. He's more confident, happier, and actually excited about learning. Mornings are easier, there's no pushback about school, and his overall attitude has completely changed. He's genuinely growing into his own learner in a way we never saw before. I asked him what he liked about Kairos. He told me, 'I like Kairos because all the teachers are nice and they really want to help us learn.' Everyone there is truly lovely and that made all the difference for us.",
    pull: "He's more confident, happier, and actually excited about learning. Mornings are easier, there's no pushback about school, and his overall attitude has completely changed.",
    author: "Jocelyn W.",
    role: "APEX Parent",
    source: "Google",
  },
  {
    id: "jamie-s",
    quote:
      "We've been part of Kairos for five years, and the experience has been great. We've worked with a few different tutors during our time, and every one of them has been wonderful. Most recently, my son has been working with Mrs. Mendy. She's patient, supportive and truly committed to helping him understand the material in a way that keeps him engaged. Kairos has played a big role in building his confidence both in and out of the classroom. He never feels judged or uncomfortable when he's there, and the change in his attitude toward school has been noticeable. His grades are up, he feels good about himself, and we're grateful for the positive impact this team has had on him.",
    pull: "His grades are up, he feels good about himself, and we're grateful for the positive impact this team has had on him.",
    author: "Jamie S.",
    role: "Tutoring Parent",
    source: "Google",
  },
  {
    id: "crystal-h",
    quote:
      "I cannot share enough good things about Kairos! Both of my kids have attended (homeschool support, TK and Kinder classes). Jackie and the entire staff are exceptional at meeting kids right where they are academically, supporting kids learning and helping them to see their strengths and potential. The energy, warmth, fun and joy are felt the moment you walk through the door. They make it a point to ensure every child feels welcomed and supported. Whatever you choose for your child with Kairos, you will not be disappointed!",
    pull: "The energy, warmth, fun and joy are felt the moment you walk through the door.",
    author: "Crystal H.",
    role: "Homeschool Support & Early Learners Parent",
    source: "Google",
  },
  {
    id: "maria-r",
    quote:
      "We've been with Kairos since last year. My Granddaughter struggled with math and the time spent with Miss Mendy and Jackie are short of remarkable. All the tutors sincerely care about your child and focus on making them the best they can be. We are now involved with the APEX program and cannot say enough about it. The projects they pursue after the school work is completed are about real life such as budgeting and learning to manage a real business. It's a very progressive approach to learning and we feel very fortunate to be a part of it!",
    pull: "All the tutors sincerely care about your child and focus on making them the best they can be. We are now involved with the APEX program and cannot say enough about it.",
    author: "Maria R.",
    role: "APEX Grandparent",
    source: "Google",
  },
  {
    id: "andrea-r",
    quote:
      "Kairos has been a pivotal partner in my niece's educational journey. The educators and staff take into account the individual needs of each student and truly work with them to build confidence and focus on their unique strengths and how best to help them succeed. My niece has attended tutoring sessions in the past and is now enrolled in the wonderfully innovative Apex program. Apex pairs traditional learning with modern teaching methods, and provides a solid foundation of core curriculum whilst also giving students the opportunity to participate in essential life building lessons focused on leadership skills and entrepreneurial endeavors. We are immensely grateful for this program and the incredible opportunities it provides.",
    pull: "Apex pairs traditional learning with modern teaching methods, and provides a solid foundation of core curriculum whilst also giving students the opportunity to participate in essential life building lessons focused on leadership skills and entrepreneurial endeavors.",
    author: "Andrea R.",
    role: "APEX Family",
    source: "Google",
  },
  {
    id: "angelina-d",
    quote:
      "We are so grateful to be a part of Kairos. My boys have attended the kinder, first, art and science classes, and done private tutoring over the last few years. Jackie and all of the teachers at Kairos have always been so sweet and beyond helpful in accommodating our families needs. We plan on attending for many more years to come!",
    pull: "Jackie and all of the teachers at Kairos have always been so sweet and beyond helpful in accommodating our families needs.",
    author: "Angelina D.",
    role: "Parent · Classes & Tutoring",
    source: "Google",
  },
  {
    id: "molly-b",
    quote:
      "My kids love Kairos! (Assisted homeschooling) They get individual attention in every subject and if they are struggling, I know right away and they come up with the best plan of action to help improve where it's needed. Everyone in there is optimistic, caring and great to work with! Highly recommend for those looking for tutoring or assisting in homeschool.",
    pull: "They get individual attention in every subject and if they are struggling, I know right away and they come up with the best plan of action to help improve where it's needed.",
    author: "Molly B.",
    role: "Homeschool Parent",
    source: "Google",
  },
  {
    id: "melissa-c",
    quote:
      "Kairos was a great space for my kiddos! My daughter's reading and writing improved while in Mrs. Grainger's 2nd grade superstars class, and my son enjoyed his time in the Kinder class with Mrs. Torres. Friendly staff and lots of social events throughout the year. We hope to return if our schedule allows.",
    pull: "My daughter's reading and writing improved while in Mrs. Grainger's 2nd grade superstars class, and my son enjoyed his time in the Kinder class with Mrs. Torres.",
    author: "Melissa C.",
    role: "Elementary & Kinder Parent",
    source: "Google",
  },
  {
    id: "ericka-g",
    quote:
      "Mama of 7 here - We've been with Kairos for several years now, for our elementary thru high school kids. We're so grateful to have such caring and wonderful educators supporting our homeschool journey. The G Family",
    pull: "We're so grateful to have such caring and wonderful educators supporting our homeschool journey.",
    author: "Ericka G.",
    role: "Homeschool Parent of 7",
    source: "Google",
  },
  {
    id: "erica-r",
    quote:
      "This is our 1st year at Kairos and the experience has been phenomenal! My daughter is thriving and LOVES school now. I only regret not attending sooner. The staff is so caring and encouraging.",
    pull: "My daughter is thriving and LOVES school now. I only regret not attending sooner.",
    author: "Erica R.",
    role: "Parent",
    source: "Google",
  },
  {
    id: "kristine-a",
    quote:
      "My kids have always had a great experience with the tutors at Kairos. Highly recommend for anyone looking for a tutor.",
    pull: "My kids have always had a great experience with the tutors at Kairos. Highly recommend for anyone looking for a tutor.",
    author: "Kristine A.",
    role: "Tutoring Parent",
    source: "Google",
  },
];

export function getTestimonials(ids: string[]): Testimonial[] {
  return ids.map((id) => {
    const t = testimonials.find((t) => t.id === id);
    if (!t) throw new Error(`Unknown testimonial id: ${id}`);
    return t;
  });
}

export const stats = [
  { icon: Clock, value: "Since 2020", label: "Serving Salinas families" },
  { icon: Users, value: "13+", label: "Educators & tutors" },
  { icon: Lightbulb, value: "All ages", label: "Early reading to AP" },
  { icon: GraduationCap, value: "30+ yrs", label: "Lead teacher experience" },
];

export type SummerProgram = {
  slug: string;
  title: string;
  dates: string;
  description: string;
  schedule: { label: string; value: string }[];
  pricing: { label: string; value: string }[];
  note?: string;
  hostedBy?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export const summerPrograms: SummerProgram[] = [
  {
    slug: "back-to-school-boot-camp",
    title: "Back-to-School Boot Camp",
    dates: "July 20 – 23 & July 27 – 30, 2026",
    description:
      "Focused sessions in reading, math, and language arts — plus enrichment activities — designed to beat the summer slide and start the school year strong.",
    schedule: [
      { label: "Morning session", value: "9:30 AM – 12:00 PM" },
      { label: "Afternoon session", value: "1:00 – 3:30 PM" },
    ],
    pricing: [
      { label: "1 session (one week, 4 sessions)", value: "$185" },
      { label: "Full day, one week (8 sessions)", value: "$340" },
      { label: "1 session, both weeks (8 sessions)", value: "$350" },
      { label: "Full day, both weeks (16 sessions)", value: "$650" },
      { label: "Individual sessions", value: "$50 each" },
    ],
    note: "Spots are limited — reach out to reserve a spot.",
  },
  {
    slug: "love-note-music-camp",
    title: "Love Note Music Camp",
    dates: "June 22 – 25 & June 29 – July 2, 2026",
    description:
      "A hosted music camp with experienced instructor Jenny Cogswell — violin, ukulele, guitar, and voice. All skill levels welcome, and instruments are available to borrow.",
    schedule: [
      { label: "Violin — Jun 22–25", value: "9:00 AM – 12:00 PM" },
      { label: "Ukulele — Jun 22–25", value: "1:00 – 4:00 PM" },
      { label: "Guitar — Jun 29–Jul 2", value: "9:00 AM – 12:00 PM" },
      { label: "Voice — Jun 29–Jul 2", value: "1:00 – 4:00 PM" },
    ],
    pricing: [{ label: "Earlybird (register by May 31)", value: "$240" }],
    hostedBy: "Love Note Music Studio",
    contactEmail: "lovenotemusicstudio@gmail.com",
    contactPhone: "(831) 288-8221",
  },
];

export const earlyLearners = {
  name: "Early Learners",
  tagline: "Grouped by skill, not by grade — so every student can go further, or go at their own pace",
  ageRange: "TK – 2nd grade",
  intro:
    "For our youngest students, we group by skill instead of age or grade. A child who's ready to stretch further can — and a child who needs more time gets it, without ever feeling behind. Small groups, hands-on learning, and a half-day program built around how each student actually learns.",
  groups: [
    {
      name: "Explorers",
      body: "For students just starting to build foundational skills — lots of hands-on, playful discovery, at a pace that feels right for them.",
    },
    {
      name: "Navigators",
      body: "For students building confidence and independence with core skills, moving forward as they master each one.",
    },
    {
      name: "Discoverers",
      body: "For students ready to stretch further — more challenge, more independence, as fast as they're ready to go.",
    },
  ],
  schedule: [
    { label: "Core program", value: "Tuesday – Thursday, 9:00 AM – 12:00 PM" },
    { label: "Monday enrichment (optional)", value: "Additional day, extra cost" },
  ],
  pricing: [
    { label: "Core program", value: "$600 / month" },
    { label: "Monday enrichment (optional)", value: "$250 / month" },
  ],
};
