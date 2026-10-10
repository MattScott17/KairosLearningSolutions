// Real business content — services, programs, team, testimonials, values.
// Reused and polished from the existing Kairos site. Edit freely.

import type { LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import type { FaqItem } from "@/lib/seo";
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
      "Subjects include early literacy, math, writing, world languages, test prep and AP coursework.",
      "We match each student with a tutor by subject, learning style and personality.",
      "Jackie sets the hourly rate during your consultation. For a standing weekly session, the monthly plan is $360 for one session a week.",
    ],
    highlights: [
      { label: "Format", value: "In person or online" },
      { label: "Ages", value: "All ages" },
      { label: "Pricing", value: "$70 to $120 an hour" },
    ],
    cta: "Book a consultation",
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
      "Small student-to-teacher ratios and hourly packages, month to month.",
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

export type FallClass = {
  slug: string;
  title: string;
  grades: string;
  // The same range as numbers (Kinder = 0), so a parent can ask which classes fit their student.
  gradeRange: [number, number];
  // Which list the class appears in on /fall-classes.
  group: "younger" | "older";
  day: string;
  time: string;
  // Only for classes that don't run the whole term.
  dates?: string;
  price: string;
  description: string;
  // Set when a partner organization teaches the class.
  partner?: string;
  // Classes made of separately bookable hour blocks (the K-2 Learning Lab).
  blocks?: { label: string; time: string }[];
};

// Fall 2026 classes, from Jackie's 2026-2027 Google Doc catalog. The term runs
// site.fallClassesDateRange.
export const fallClasses: FallClass[] = [
  {
    slug: "k2-learning-lab",
    title: "K to 2 Learning Lab",
    grades: "Kindergarten to 2nd",
    gradeRange: [0, 2],
    group: "younger",
    day: "Monday",
    time: "9:00 AM to 12:00 PM",
    price: "$160 a month per class, or $250 a month for all three",
    description:
      "Three one-hour classes in small, mixed-age groups, with each child working at their own level. Book one hour or the whole morning.",
    blocks: [
      { label: "Reading and writing", time: "9:00 to 10:00 AM" },
      { label: "Math and science", time: "10:00 to 11:00 AM" },
      { label: "Art, music and enrichment", time: "11:00 AM to 12:00 PM" },
    ],
  },
  {
    slug: "imagination-lab",
    title: "Imagination Lab",
    grades: "Kindergarten to 3rd",
    gradeRange: [0, 3],
    group: "younger",
    day: "Wednesday",
    time: "10:30 to 11:30 AM",
    dates: "Starts October 7",
    price: "$160 a month",
    description:
      "An hour to build whatever they dream up. Kids get recycled materials, paper towel rolls and the run of the art space, and they decide what to make.",
  },
  {
    slug: "book-to-life",
    title: "Book to Life",
    grades: "1st to 3rd",
    gradeRange: [1, 3],
    group: "younger",
    day: "Wednesday",
    time: "12:30 to 2:00 PM",
    dates: "Charlotte's Web, Sep 30 to Oct 28. Winnie the Pooh, Nov 4 to Dec 16.",
    price: "$250 a session",
    description:
      "We read a classic book aloud together and bring it to life with projects and activities. It builds comprehension and a love of stories. This is literature enrichment, not reading instruction.",
  },
  {
    slug: "writing-lab-a",
    title: "Writing Lab A",
    grades: "3rd and 4th",
    gradeRange: [3, 4],
    group: "older",
    day: "Wednesday",
    time: "10:00 to 11:00 AM",
    price: "$160 a month",
    description:
      "Strong sentences, then paragraphs, then short pieces. Students practice narrative, opinion and informational writing and get more confident putting ideas on paper.",
  },
  {
    slug: "writing-lab-b",
    title: "Writing Lab B",
    grades: "5th to 7th",
    gradeRange: [5, 7],
    group: "older",
    day: "Wednesday",
    time: "11:00 AM to 12:00 PM",
    price: "$160 a month",
    description:
      "Multi-paragraph writing, essays and projects, with a focus on structure, organization and voice. Students also work on grammar and revising their own writing.",
  },
  {
    slug: "express-and-connect-lab",
    title: "Express & Connect Lab",
    grades: "3rd to 6th",
    gradeRange: [3, 6],
    group: "older",
    day: "Wednesday",
    time: "1:00 to 2:00 PM",
    price: "$160 a month",
    description:
      "For kids who go quiet in a group. Each class has a short skill lesson, then speaking practice with coaching in the moment, so students learn to organize their thoughts and say them clearly.",
  },
  {
    slug: "nature-journaling",
    title: "Nature Journaling",
    grades: "3rd to 6th",
    gradeRange: [3, 6],
    group: "older",
    day: "Monday",
    time: "11:00 AM to 12:00 PM",
    dates: "6 weeks, Sep 14 to Oct 19",
    price: "$265 for the 6 weeks",
    partner: "Mini Makers Collective",
    description:
      "Students study field guides, draw from life and sketch local plants and wildlife in watercolor and colored pencil, learning to look closely and record what they find.",
  },
  {
    slug: "visual-arts",
    title: "Visual Arts",
    grades: "3rd to 6th",
    gradeRange: [3, 6],
    group: "older",
    day: "Monday",
    time: "11:00 AM to 12:00 PM",
    dates: "6 weeks, Oct 26 to Nov 30",
    price: "$265 for the 6 weeks",
    partner: "Mini Makers Collective",
    description:
      "Drawing, sculpture, textile art and mixed media, plus color theory and a look at artists who changed how we see.",
  },
];

export type EnrichmentNote = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const enrichment: EnrichmentNote = {
  title: "Enrichment Classes",
  body: "Small weekly enrichment classes for grades K to 7 in writing, speaking, art and reading. They fill up fast, so call to save a spot.",
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
    "APEX uses the 2 Hour Learning model. Students do two hours of focused core academics each day, then spend the rest of the day on workshops and real-world skills.",
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
      title: "Fills in gaps",
      body: "If a student has a gap, say from first grade, the program finds it and fills it in before moving on.",
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
    "In our 2025-26 pilot year, APEX students grew 3.6 times their projected growth in reading and math, and the class's average national ranking went from the 43rd to the 78th percentile.",
  day: [
    { time: "9:00", what: "Launch: a group activity tied to the workshop" },
    { time: "9:20", what: "Academics" },
    { time: "10:20", what: "Physical challenge toward a monthly goal each student chooses" },
    { time: "10:25", what: "Break and snack" },
    { time: "10:40", what: "Life skills discussion" },
    { time: "10:55", what: "Journaling, with an optional prompt from life skills" },
    { time: "11:05", what: "Academics" },
    { time: "12:05", what: "Lunch" },
    { time: "12:30", what: "Silent reading, a book of their choice" },
    { time: "12:45", what: "Workshops, then cleanup" },
    { time: "2:00", what: "Dismissal" },
  ],
  workshops: {
    intro:
      "Workshops fill the rest of the day, Monday through Thursday. Here is what is on the 2026-27 calendar.",
    groups: [
      {
        title: "Money and business",
        items: [
          {
            name: "Budgeting with Purpose",
            body: "Students build a personal budget, then plan a vacation budget.",
          },
          {
            name: "Young Entrepreneur Lab",
            body: "Students plan and run a small business, including our Holiday Craft Fair.",
          },
        ],
      },
      {
        title: "Work and leadership",
        items: [
          {
            name: "Manage Yourself",
            body: "Managing time and routine, plus working in Google Docs, Sheets, Slides and Gmail.",
          },
          {
            name: "Better Together",
            body: "Team projects, like producing a podcast and building a game board.",
          },
          {
            name: "Employment and Leadership",
            body: "Skills for working with others, finished with a mock interview with a guest.",
          },
        ],
      },
      {
        title: "The world and community",
        items: [
          {
            name: "Around the World Cultural Explorers",
            body: "A country at a time: Japan, Brazil, Morocco, India and New Zealand.",
          },
          {
            name: "Government Studies",
            body: "How government works, ending with a mock trial.",
          },
          {
            name: "Community Service and Personal Goals",
            body: "Giving back, and setting and checking in on goals through the year.",
          },
        ],
      },
      {
        title: "Life skills",
        items: [
          {
            name: "AI as Your Assistant, Not Your Replacement",
            body: "How to use AI tools well and still do your own thinking.",
          },
          {
            name: "Health and Safety",
            body: "Everyday health and safety skills.",
          },
        ],
      },
    ],
    eventsIntro: "Through the year we also hold",
    events: [
      "Grandparent's Day celebration",
      "Halloween party",
      "Thanksgiving Around the Table",
      "Holiday Craft Fair",
      "The Polar Express",
      "Valentine's Day community experience",
      "Multi Cultural Fair",
      "Mother's Day tea",
    ],
  },
  results: {
    basis: "Based on fall-to-spring NWEA MAP Growth assessments in reading and math, 2025-26 pilot year.",
    stats: [
      { value: "3.6x", label: "Students achieved 3.6 times their projected academic growth." },
      {
        value: "83%",
        label: "Of valid reading and math results met or exceeded twice the students' projected growth.",
      },
      {
        value: "43rd to 78th",
        label: "Increase in the class's average national achievement ranking, in percentile.",
      },
      {
        value: "57%",
        label:
          "Of valid results ranked at or above the 90th percentile for growth among academically similar students nationwide.",
      },
    ],
    spectrum:
      "APEX helped students across the academic spectrum. Students who began below grade level made real progress, and students who began ahead kept accelerating.",
  },
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
    role: "Owner, Teacher",
    bio: "Jackie has been an educator for more than 30 years, teaching everything from 3rd grade to high school, English to math, public to private and even homeschool. That background prepared her for everything we do at Kairos. She holds an MA in Educational Leadership and Curriculum & Instruction, opened Kairos in 2020, and loves helping students fall in love with learning. She is also a mom to three young-adult kids and volunteers in the community.",
    image: "/images/team/jackie-scott.jpg",
  },
  {
    name: "Alissa Scott",
    role: "Executive Director",
    bio: "Alissa earned her BA in Elementary Education and a Multiple Subject Teaching Credential from Grand Canyon University. After a year of tutoring and teaching, she became Executive Director in 2026 and took over daily operations from Jackie. She grew up at Kairos as a student, tutor and teacher, and wants every student to fall in love with learning and feel the same sense of belonging she found here.",
    image: "/images/team/alissa-scott.jpg",
  },
];

export const team: TeamMember[] = [
  {
    name: "Michelle Ball",
    role: "Director of Homeschool",
    bio: "Michelle earned her Multiple Subject Credential with an emphasis in Child Development from CSU Chico. She taught for 17 years at Spreckels School before staying home with her three children. Teaching is a passion of hers. She loves connecting with her students and helping them grow academically, socially and emotionally.",
    image: "/images/team/michelle-ball.jpg",
  },
  {
    name: "Lisa Bleicher",
    role: "Teacher",
    bio: "Taught kindergarten for 38 years before retiring, and now teaches at Kairos.",
  },
  {
    name: "Lori Grainger",
    role: "Teacher/Tutor",
    bio: "Lori is a retired teacher with 27 years of experience, most of it with 2nd graders. She is thrilled to be part of the Kairos family and enjoys using her knowledge to support our students. She is married to Joe, a mother of two daughters and a Gramma to four grandchildren.",
    image: "/images/team/lori-grainger.jpg",
  },
  {
    name: "Brady Berg",
    role: "Tutor",
    bio: "B.S. in Biomedical Engineering and Mathematics from Cal Poly SLO, currently pursuing a Ph.D. in Mathematical, Computational Systems Biology at UC Irvine.",
  },
  {
    name: "Colin McCardell",
    role: "Tutor",
    bio: "Math major at CSU Monterey Bay, tutoring through Calculus 3 with a focus on applied mathematics.",
  },
  {
    name: "Saara Kriplani",
    role: "Tutor (Online)",
    bio: "Saara holds a B.S. in Bioengineering: Bioinformatics from UC San Diego. She has tutored since middle school and loves helping and teaching others. She has worked at every level of math, from preschool basics to advanced calculus, and is a valuable mentor to students at every stage.",
    image: "/images/team/saara-kriplani.jpg",
  },
  {
    name: "Daryl Lyon",
    role: "Subject Specialist",
    bio: "BA in English Education from Southern Oregon University and 24 years teaching grades 11 and 12, with an emphasis on writing and critical thinking.",
  },
  {
    name: "Laura Palmer",
    role: "Spanish Teacher/Tutor",
    bio: "Laura (Maestra Palmer) is a certified Bilingual Teacher with a BA in Spanish and 28 years of experience in education. She was a Dual Immersion teacher, then a bilingual fine arts teacher of art, music, dance and drama. Since 2009 she has taught Spanish to children of all ages and tutored children and adults privately through Learn with Laura, Education for Enrichment.",
    image: "/images/team/laura-palmer.jpg",
  },
  {
    name: "Mendy Amaral",
    role: "Director of Tutoring",
    bio: "Mendy is a lifelong Salinas resident from a many-generation Salinas family. She has spent the last 20+ years raising three children and volunteering extensively in the community. She brings countless skills and talent to Kairos, not the least of which is her ability to do anything and everything that needs to be done.",
    image: "/images/team/mendy-amaral.jpg",
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
  home: ["Jackie Scott", "Brady Berg", "Michelle Ball", "Lisa Bleicher"],
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
export type ProgramRow = {
  name: string;
  href: string;
  who: string;
  when: string;
  price: string;
  blurb: string;
};

const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

export function getProgramList(): ProgramRow[] {
  const [tutoring, homeschool] = services;
  return [
    {
      name: tutoring.title,
      href: `/services/${tutoring.slug}`,
      who: "Any age, any subject",
      when: "Weekly or as needed, in person or online",
      price: "$70 to $120 an hour",
      blurb: firstSentence(tutoring.summary),
    },
    {
      name: homeschool.title,
      href: `/services/${homeschool.slug}`,
      who: "Homeschool families",
      when: `Month to month, ${homeschoolPricing.hoursPerMonth[0]} to ${homeschoolPricing.hoursPerMonth[homeschoolPricing.hoursPerMonth.length - 1]} hours`,
      price: `From $${homeschoolPricing.levels.A[0]} a month`,
      blurb: firstSentence(homeschool.summary),
    },
    {
      name: earlyLearners.name,
      href: "/early-learners",
      who: "TK to 2nd grade",
      when: "Tuesday to Thursday, 9 AM to noon",
      price: earlyLearners.pricing[0].value.replace(" / ", " a "),
      blurb: firstSentence(earlyLearners.intro),
    },
    {
      name: "APEX",
      href: "/apex",
      who: "Grades 3 to 9",
      when: `Full school day, ${apex.tuition.term.toLowerCase()}`,
      price: "Call for a tour",
      blurb: firstSentence(apex.intro),
    },
    {
      name: "Enrichment classes",
      href: "/fall-classes",
      who: "Grades K to 7",
      when: "Weekly: writing, speaking, art and reading",
      price: "From $160 a month",
      blurb: firstSentence(enrichment.body),
    },
  ];
}

// The five ways families and schools work with Kairos. The homepage and the homepage drafts
// all show this same list, so Kairos leads and APEX is one option among four.
export type Pathway = {
  title: string;
  body: string;
  href: string;
  cta: string;
  photo: "threeDPrinting" | "readingTogether" | "studentsLearning" | "presenting" | "craftProject";
};

export const pathways: Pathway[] = [
  {
    title: "APEX",
    body: `Our full-time program for ${apex.gradeRange.toLowerCase()}, run in small groups as an alternative to traditional school.`,
    href: "/apex",
    cta: "How APEX works",
    photo: "threeDPrinting",
  },
  {
    title: "Early Learners",
    body: "A half-day program for TK through 2nd grade, grouped by skill instead of grade, Tuesday to Thursday mornings.",
    href: "/early-learners",
    cta: "See Early Learners",
    photo: "craftProject",
  },
  {
    title: "Tutoring",
    body: "One-on-one help for any age and subject, from early reading to AP, in person or online.",
    href: "/services/private-tutoring",
    cta: "See tutoring",
    photo: "readingTogether",
  },
  {
    title: "Homeschool support and classes",
    body: "Month-to-month support packages for homeschool families, plus small weekly enrichment classes.",
    href: "/services/homeschool-support",
    cta: "See homeschool support",
    photo: "studentsLearning",
  },
  {
    title: "District partnerships",
    body: "We work with school districts to bring Kairos teaching to students outside our center.",
    href: "/district-partnerships",
    cta: "Partner with us",
    photo: "presenting",
  },
];

// Questions families ask before calling. Shown on each page and sent to search engines as
// FAQPage markup, so every answer must stay true to the data above.
const newFee = registrationFees[0].value.replace(" / ", " a ");
const returningFee = registrationFees[1].value.replace(" / ", " a ");

export const faqs: Record<"apex" | "earlyLearners" | "tutoring" | "homeschool", FaqItem[]> = {
  apex: [
    {
      question: "What is APEX?",
      answer: `APEX is our full-time program for ${apex.gradeRange.toLowerCase()} in Salinas, run in small groups as an alternative to traditional school. Students do personalized, mastery-based academics first, then spend the rest of the day on projects and life skills.`,
    },
    {
      question: "How much does APEX cost?",
      answer: `The full program is ${apex.tuition.monthly} (${apex.tuition.annual}) over a ${apex.tuition.term}. Academics only is ${apex.tiers[1].price}, and workshops only is ${apex.tiers[2].price}. There is also a registration fee of ${newFee} for a new student or ${returningFee} for a returning one.`,
    },
    {
      question: "What is the 2 Hour Learning model?",
      answer: apex.model,
    },
    {
      question: "How do we get started?",
      answer: `Call us at ${site.phone} to set up a free call and tour. We're at ${site.address.full}.`,
    },
  ],
  earlyLearners: [
    {
      question: "Which children is Early Learners for?",
      answer: `Early Learners is a half-day program for ${earlyLearners.ageRange}. We group children by skill instead of grade, so a child who is ready can move ahead and a child who needs more time gets it.`,
    },
    {
      question: "What are the hours?",
      answer: `${earlyLearners.schedule[0].value}. Monday enrichment is an optional extra day.`,
    },
    {
      question: "How much does it cost?",
      answer: `The core program is ${earlyLearners.pricing[0].value.replace(" / ", " a ")}, and optional Monday enrichment is ${earlyLearners.pricing[1].value.replace(" / ", " a ")}.`,
    },
    {
      question: "How are the groups set up?",
      answer: `Children join one of three groups by skill: ${earlyLearners.groups.map((g) => g.name).join(", ")}. They move up as they master each skill.`,
    },
  ],
  tutoring: [
    {
      question: "Where do tutoring sessions happen?",
      answer: `At our center at ${site.address.full}, or online.`,
    },
    {
      question: "How much does tutoring cost?",
      answer: `${services[0].details[3]} ${services[0].details[4]}`,
    },
    {
      question: "What subjects do you tutor?",
      answer:
        "Early literacy, math, writing, world languages, test prep and AP coursework, for students of every age.",
    },
    {
      question: "How do I get started?",
      answer: `Call ${site.phone} for a short consultation. We'll match your student with a tutor by subject, learning style and personality.`,
    },
  ],
  homeschool: [
    {
      question: "How does Homeschool Support work?",
      answer:
        "There are four levels. Level A is a place to work alongside other students with occasional help. Level B adds assessment, planning and teaching from our teachers. Level C adds private tutoring. Level D is a custom program built from every Kairos service.",
    },
    {
      question: "Is there a contract?",
      answer:
        "No. Memberships are month to month, with small student-to-teacher ratios and hourly packages.",
    },
    {
      question: "How much does it cost?",
      answer: `It depends on the level and the hours per month, from ${homeschoolPricing.hoursPerMonth[0]} to ${homeschoolPricing.hoursPerMonth[homeschoolPricing.hoursPerMonth.length - 1]} hours. Level A starts at $${homeschoolPricing.levels.A[0]} a month. Registration is ${newFee} for a new student or ${returningFee} for a returning one.`,
    },
  ],
};
