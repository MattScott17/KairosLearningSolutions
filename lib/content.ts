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
      "Flexible scheduling with progress you can actually see.",
    ],
    highlights: [
      { label: "Format", value: "In-person & online" },
      { label: "Ages", value: "All ages" },
      { label: "Getting started", value: "Free consultation" },
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
      "Choose the number of days per week that fit your student's needs.",
      "Supportive educators keep students focused and on task.",
      "Homework gets checked before your student heads home.",
    ],
    highlights: [
      { label: "Days", value: "Mon – Thu" },
      { label: "Time", value: "2:30 – 5:15 PM" },
      { label: "Flexibility", value: "Pick your days" },
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
      "Support levels A–D with flexible hourly packages at a range of price points.",
      "Full curriculum planning, teaching, and assessment — or à la carte help where you need it.",
      "A calm, resource-rich space for independent study and group learning.",
      "Guidance from credentialed educators who know California homeschool paths.",
    ],
    highlights: [
      { label: "Structure", value: "Levels A – D" },
      { label: "Packages", value: "Flexible hours" },
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
  gradeRange: "Grades 3 – 9",
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
  { name: "Michelle Ball", role: "Teacher" },
  { name: "Lisa Bleicher", role: "Teacher" },
  { name: "Lori Grainger", role: "Teacher" },
  { name: "Brady Berg", role: "Tutor" },
  { name: "Ethan Berg", role: "Tutor" },
  { name: "Colin McCardell", role: "Tutor" },
  { name: "Saara Kriplani", role: "Tutor" },
  { name: "Trisha Hill", role: "Subject Specialist" },
  { name: "Daryl Lyon", role: "Subject Specialist" },
  { name: "Laura Palmer", role: "Subject Specialist" },
  { name: "Mendy Amaral", role: "Operations" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
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
    quote: "My child has enthusiasm and excitement to go to school and learn.",
    author: "A.R.",
    role: "Elementary Parent",
  },
  {
    quote: "Kairos is the place I look forward to every day! It is now one of my happy places!",
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
