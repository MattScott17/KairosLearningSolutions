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
    short: "One-on-one, any age and subject",
    icon: BookOpen,
    summary:
      "Our tutors work one-on-one with students of every age, from early reading to AP science. We start with a short consultation call so we can match your student with the right tutor.",
    details: [
      "Sessions are at our center on South Main Street in Salinas, or online.",
      "Subjects include early literacy, math, writing, world languages, test prep and AP coursework.",
      "We match each student with a tutor by subject, learning style and personality.",
      "Sessions are $70 to $120 an hour, depending on the subject and tutor. Jackie sets the rate during your consultation.",
      "For a standing weekly session, the monthly plan is $360 for one session a week.",
    ],
    highlights: [
      { label: "Format", value: "In person or online" },
      { label: "Ages", value: "All ages" },
      { label: "Pricing", value: "$70 to $120 an hour" },
    ],
    cta: "Book a consultation",
  },
  {
    slug: "homework-club",
    title: "Homework Club",
    short: "After-school homework help, Monday to Thursday",
    icon: Clock,
    summary:
      "Drop your student off after school and pick them up when the homework is done. We check it before they leave. Choose one to four days a week.",
    details: [
      "Open Monday through Thursday, 2:30 to 5:15 PM.",
      "Monthly plans: 1 day/week $180, 2 days/week $250, 3 days/week $320, 4 days/week $360.",
      "Second child on the same plan: $140, $180, $220, or $260 for the same day counts.",
      "Without a plan, drop in for $20 an hour or $50 a day.",
      "Our teachers keep students on task and check the homework before they head home.",
    ],
    highlights: [
      { label: "Days", value: "Mon to Thu" },
      { label: "Time", value: "2:30 to 5:15 PM" },
      { label: "Pricing", value: "From $180 a month" },
    ],
    cta: "Reserve a spot",
  },
  {
    slug: "homeschool-support",
    title: "Homeschool Support",
    short: "Month-to-month packages for homeschool families",
    icon: Home,
    summary:
      "Four levels of support, from a place to work with occasional help (Level A) to a custom program planned and taught by our teachers (Level D). Memberships are month to month.",
    details: [
      "Level A: a place to work alongside other students, with occasional instruction or tutoring.",
      "Level B: we assess your student, plan the work and teach it at Kairos, with time and space to finish assignments.",
      "Level C: everything in Level B, plus private tutoring.",
      "Level D: every Kairos service, built into a custom program for your student.",
      "Memberships are month to month, with small student-to-teacher ratios and hourly packages. There's no long-term contract.",
    ],
    highlights: [
      { label: "Structure", value: "Levels A to D" },
      { label: "Commitment", value: "Month to month" },
      { label: "Hours", value: "24 to 100 a month" },
    ],
    cta: "Ask about packages",
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
  body: "We run classes through the year in writing, Spanish, STEM and seasonal topics. They fill up fast. Current classes are posted on Instagram and in our seasonal catalog.",
  icon: Sparkles,
};

export const values = [
  {
    icon: Users,
    title: "Individual attention",
    body: "Lessons are planned around each student, one-on-one or in small groups.",
  },
  {
    icon: GraduationCap,
    title: "Experienced teachers",
    body: "Many of our teachers spent 15 to 38 years in classrooms before joining Kairos.",
  },
  {
    icon: HeartHandshake,
    title: "Mentoring",
    body: "We combine tutoring, group lessons and mentoring to build skills and confidence.",
  },
];

export const apex = {
  name: "APEX",
  tagline: "Full-time school for grades 3 to 9",
  intro:
    "APEX is our full-time program for grades 3 to 9, run in small groups as an alternative to traditional school. Students do personalized, mastery-based academics first, then spend the rest of the day on projects and life skills.",
  gradeRange: "Grades 3 to 9",
  tuition: {
    monthly: "$1,800 / month",
    annual: "$18,000 / year",
    term: "10-month program",
  },
  tiers: [
    {
      name: "APEX (full program)",
      price: "$1,800 / month",
      description: "Academics and workshops.",
    },
    {
      name: "APEX Academics only",
      price: "$1,450 / month",
      description: "The personalized, mastery-based academic block only.",
    },
    {
      name: "APEX Workshops only",
      price: "$650 / month",
      description: "The hands-on project and life-skills workshops only.",
    },
  ],
  model:
    "APEX uses the 2 Hour Learning model, the same approach Alpha Schools use. Students work through core academics in focused, personalized sessions, then spend the rest of the day on real-world skills.",
  pillars: [
    {
      title: "Each student's own pace",
      body: "Each student moves at their own pace, and a student who is ready to move ahead can.",
    },
    {
      title: "Small groups",
      body: "Groups are small, so every teacher knows each student by name and sees their work every day.",
    },
    {
      title: "Short academic blocks",
      body: "Core subjects are covered in short, high-focus blocks sized to a child's attention span.",
    },
    {
      title: "Structure and accountability",
      body: "Daily structure and check-ins help students learn to manage their own work.",
    },
  ],
  included: [
    "Personalized, mastery-based academics",
    "Small groups",
    "Students move ahead when they're ready",
    "Daily structure and accountability",
    "Life skills and hands-on projects",
    "Mentoring toward independence",
  ],
  outcomesNote:
    "Our mid-year data showed APEX students growing faster than national norms, with gains from fall to winter across a wide range of learners.",
  comparison: [
    { traditional: "One pace for everyone", apex: "Each student at their own pace" },
    { traditional: "Limited flexibility", apex: "Flexible structure" },
    { traditional: "Passive learning", apex: "Active, hands-on learning" },
    { traditional: "Hard to feel known", apex: "Teachers know each student well" },
  ],
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  // Headshot path under /public. Until set, cards show a monogram placeholder.
  image?: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Jackie Scott",
    role: "Owner & Lead Teacher",
    bio: "Jackie has taught for more than 30 years, in grades 3 to 12, in many subjects and many kinds of schools. She holds an MA in Educational Leadership and Curriculum & Instruction, and opened Kairos in 2020.",
  },
  {
    name: "Venessa Gilbride",
    role: "Director",
    bio: "Venessa runs program development and community partnerships. Her background is in community engagement, and she started the first science fair at Washington Union School District.",
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
    bio: "Taught kindergarten for 38 years before retiring, and now teaches at Kairos.",
  },
  {
    name: "Lori Grainger",
    role: "Teacher",
    bio: "27 years of teaching experience, mostly in 2nd grade, before retiring from the classroom.",
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
    bio: "15 years of teaching experience. She teaches full time at New Republic Elementary in Salinas and was nominated for Monterey County Teacher of the Year in 2022.",
  },
  {
    name: "Daryl Lyon",
    role: "Subject Specialist",
    bio: "BA in English Education from Southern Oregon University and 24 years teaching grades 11 and 12, with an emphasis on writing and critical thinking.",
  },
  {
    name: "Laura Palmer",
    role: "Subject Specialist",
    bio: "Certified Bilingual Teacher with a BA in Spanish and 28 years of experience, including Dual Immersion and bilingual fine arts instruction.",
  },
  {
    name: "Mendy Amaral",
    role: "Operations",
    bio: "A lifelong Salinas resident and community volunteer for more than 20 years. She runs day-to-day operations at Kairos.",
  },
];

/** Look up leadership/team members by name, in the order given. Throws on a typo. */
export function getTeamMembers(names: string[]): TeamMember[] {
  const everyone = [...leadership, ...team];
  return names.map((name) => {
    const m = everyone.find((p) => p.name === name);
    if (!m) throw new Error(`Unknown team member: ${name}`);
    return m;
  });
}

// Who appears in the homepage-style "meet our tutors" rows.
export const featuredTutors = {
  home: ["Jackie Scott", "Trisha Hill", "Brady Berg", "Laura Palmer"],
  conceptD: ["Venessa Gilbride", "Michelle Ball", "Lisa Bleicher", "Daryl Lyon"],
};

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

export type Stat = {
  icon: LucideIcon;
  // Display text, used as-is wherever the number isn't animated.
  value: string;
  label: string;
  // Optional numeric form for count-up animation: renders `${count}${suffix}`.
  count?: number;
  suffix?: string;
};

export const stats: Stat[] = [
  { icon: Clock, value: "Since 2020", label: "Serving Salinas families" },
  { icon: Users, value: "13+", count: 13, suffix: "+", label: "Educators & tutors" },
  { icon: Lightbulb, value: "All ages", label: "Early reading to AP" },
  { icon: GraduationCap, value: "30+ yrs", count: 30, suffix: "+ yrs", label: "Lead teacher experience" },
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
    dates: "July 20 to 23 and July 27 to 30, 2026",
    description:
      "Reading, math and language arts sessions, with some enrichment activities, so students don't lose ground over the summer and start the school year ready.",
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
    note: "Spots are limited. Call or send a message to reserve one.",
  },
  {
    slug: "love-note-music-camp",
    title: "Love Note Music Camp",
    dates: "June 22 to 25 and June 29 to July 2, 2026",
    description:
      "A music camp with instructor Jenny Cogswell: violin, ukulele, guitar and voice. All skill levels are welcome, and students can borrow an instrument.",
    schedule: [
      { label: "Violin, Jun 22–25", value: "9:00 AM – 12:00 PM" },
      { label: "Ukulele, Jun 22–25", value: "1:00 – 4:00 PM" },
      { label: "Guitar, Jun 29–Jul 2", value: "9:00 AM – 12:00 PM" },
      { label: "Voice, Jun 29–Jul 2", value: "1:00 – 4:00 PM" },
    ],
    pricing: [{ label: "Earlybird (register by May 31)", value: "$240" }],
    hostedBy: "Love Note Music Studio",
    contactEmail: "lovenotemusicstudio@gmail.com",
    contactPhone: "(831) 288-8221",
  },
];

export const earlyLearners = {
  name: "Early Learners",
  tagline: "Grouped by skill instead of grade, so each child can move ahead or take more time",
  ageRange: "TK to 2nd grade",
  intro:
    "A half-day program for TK through 2nd grade, Tuesday to Thursday mornings. We group children by skill instead of age or grade, so a child who is ready can move ahead and a child who needs more time gets it.",
  groups: [
    {
      name: "Explorers",
      body: "Children just starting on foundational skills. Lots of hands-on play, at a comfortable pace.",
    },
    {
      name: "Navigators",
      body: "Children getting more confident and independent with core skills, moving on as they master each one.",
    },
    {
      name: "Discoverers",
      body: "Children ready for more challenge and more independence, moving as fast as they are ready to go.",
    },
  ],
  schedule: [
    { label: "Core program", value: "Tuesday to Thursday, 9:00 AM to 12:00 PM" },
    { label: "Monday enrichment (optional)", value: "An extra day, priced separately" },
  ],
  pricing: [
    { label: "Core program", value: "$600 / month" },
    { label: "Monday enrichment (optional)", value: "$250 / month" },
  ],
};

// One line per program, for the at-a-glance price list on the homepage and /services.
// Built from the data above so prices and hours only live in one place.
export type ProgramRow = { name: string; href: string; who: string; when: string; price: string };

export function getProgramList(): ProgramRow[] {
  const [tutoring, homework, homeschool] = services;
  return [
    {
      name: tutoring.title,
      href: `/services/${tutoring.slug}`,
      who: "Any age, any subject",
      when: "Weekly or as needed, in person or online",
      price: "$70 to $120 an hour",
    },
    {
      name: homework.title,
      href: `/services/${homework.slug}`,
      who: "School-age kids with homework",
      when: "Monday to Thursday, 2:30 to 5:15 PM",
      price: "From $180 a month",
    },
    {
      name: homeschool.title,
      href: `/services/${homeschool.slug}`,
      who: "Homeschool families",
      when: `Month to month, ${homeschoolPricing.hoursPerMonth[0]} to ${homeschoolPricing.hoursPerMonth[homeschoolPricing.hoursPerMonth.length - 1]} hours`,
      price: `From $${homeschoolPricing.levels.A[0]} a month`,
    },
    {
      name: earlyLearners.name,
      href: "/early-learners",
      who: "TK to 2nd grade",
      when: "Tuesday to Thursday, 9 AM to noon",
      price: earlyLearners.pricing[0].value.replace(" / ", " a "),
    },
    {
      name: "APEX",
      href: "/apex",
      who: "Grades 3 to 9",
      when: `Full school day, ${apex.tuition.term.toLowerCase()}`,
      price: apex.tuition.monthly.replace(" / ", " a "),
    },
    {
      name: "Classes and enrichment",
      href: "/fall-classes",
      who: "All ages",
      when: "Each season: writing, Spanish, STEM and more",
      price: "Priced per class",
    },
  ];
}
