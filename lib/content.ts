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
  gradeRange: "Grades 3 – 8",
  tuition: {
    monthly: "$1,800 / month",
    annual: "$18,000 / year",
    term: "10-month program",
  },
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
  quote: string;
  author: string;
  role: string;
  // A concrete, named before/after result (e.g. "raised her math grade from a
  // D to a B in one semester"). Left undefined until real ones are collected —
  // never fabricated.
  result?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Kairos has been the silver lining for our family during the past year.",
    author: "J.F.",
    role: "High School Parent",
  },
  {
    quote: "Kairos was the lifeline that my middle schoolers needed to keep them afloat.",
    author: "C.C.",
    role: "Middle School Parent",
  },
  {
    quote:
      "It gave us community, amazing educational support, and most of all, made a tough year better!",
    author: "C.R.",
    role: "High School Parent",
  },
  {
    quote: "Kairos has been our saving grace this past year!",
    author: "A.R.",
    role: "Elementary Parent",
  },
  {
    quote: "Kairos is the place I look forward to everyday!",
    author: "E.F.",
    role: "High School Sophomore",
  },
  {
    quote: "Kairos has not only helped me succeed but helped me as an individual.",
    author: "N.H.",
    role: "High School Student",
  },
  {
    quote: "It has given me the opportunity to make so many close friendships.",
    author: "W.H.",
    role: "High School Junior",
  },
  {
    quote: "We love Kairos because our teachers have helped us get through hard times.",
    author: "M.M. & R.B.",
    role: "Elementary Students",
  },
  {
    quote: "I have been taught 6th grade math as a 5th grader. I love Kairos!",
    author: "A.",
    role: "Elementary Student",
  },
];

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
