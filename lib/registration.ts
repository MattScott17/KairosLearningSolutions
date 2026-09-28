import { z } from "zod";

// Fall 2026 student registration (/fall-classes/register). Rebuilt from Jackie's Google Form
// so it matches the site; see lib/registration-google.ts for how answers reach that form.

export const MAX_CHILDREN = 3;

export const gradeOptions = [
  "Kinder",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "Other",
] as const;

export type RegistrationOption = {
  id: string;
  label: string;
  detail: string;
  // Start of the matching checkbox text on the Google Form.
  googleKey: string;
};

export const registrationGroups: { title: string; options: RegistrationOption[] }[] = [
  {
    title: "Programs",
    options: [
      {
        id: "apex",
        label: "APEX, powered by 2 Hour Learning",
        detail: "Grades 3 to 8, Monday to Thursday, 9:00 AM to 2:00 PM",
        googleKey: "APEX",
      },
      {
        id: "leadership-year",
        label: "8th Grade Leadership Year",
        detail: "Full-time APEX or hybrid homeschool pathway",
        googleKey: "8th Grade Leadership",
      },
      {
        id: "homeschool-support",
        label: "Homeschool Support",
        detail: "Grades 3 to 12, Monday to Thursday, 9:00 AM to 2:00 PM, you pick the days and times",
        googleKey: "Homeschool Support",
      },
      {
        id: "tutoring",
        label: "Tutoring",
        detail: "All ages, scheduled with you",
        googleKey: "Tutoring",
      },
    ],
  },
  {
    title: "Early learners",
    options: [
      {
        id: "tk-kinder",
        label: "Kairos TK and Kinder",
        detail: "Tuesday, Wednesday and Thursday, 9:00 AM to 12:00 PM",
        googleKey: "Kairos TK/Kinder",
      },
      {
        id: "first-grade",
        label: "Kairos First Grade",
        detail: "Tuesday, Wednesday and Thursday, 9:00 AM to 12:00 PM",
        googleKey: "Kairos First Grade",
      },
      {
        id: "second-grade",
        label: "Kairos Second Grade",
        detail: "Tuesday and Thursday, 10:00 AM to 12:00 PM",
        googleKey: "Kairos Second Grade",
      },
    ],
  },
  {
    title: "Fall classes",
    options: [
      {
        id: "k2-bundle",
        label: "K to 2 Learning Lab, all three classes",
        detail: "Monday, 9:00 AM to 12:00 PM",
        googleKey: "K-2 Learning Lab Bundle",
      },
      {
        id: "k2-reading-writing",
        label: "K to 2 Learning Lab: Reading and writing",
        detail: "Monday, 9:00 to 10:00 AM",
        googleKey: "K-2 Learning Lab, Reading",
      },
      {
        id: "k2-math-science",
        label: "K to 2 Learning Lab: Math and science",
        detail: "Monday, 10:00 to 11:00 AM",
        googleKey: "K-2 Learning Lab, Math",
      },
      {
        id: "k2-art-music",
        label: "K to 2 Learning Lab: Art, music and enrichment",
        detail: "Monday, 11:00 AM to 12:00 PM",
        googleKey: "K-2 Learning Lab, Art",
      },
      {
        id: "imagination-lab",
        label: "Imagination Lab",
        detail: "Grades K to 3, Wednesday, 10:30 to 11:30 AM",
        googleKey: "Imagination Lab",
      },
      {
        id: "book-to-life-charlottes-web",
        label: "Book to Life: Charlotte's Web",
        detail: "Grades 1 to 3, Wednesday, 12:30 to 2:00 PM, Sep 30 to Oct 28",
        googleKey: "Book to Life: Charlotte",
      },
      {
        id: "book-to-life-winnie-the-pooh",
        label: "Book to Life: Winnie the Pooh",
        detail: "Grades 1 to 3, Wednesday, 12:30 to 2:00 PM, Nov 4 to Dec 16",
        googleKey: "Book to Life: Winnie",
      },
      {
        id: "writing-lab-a",
        label: "Writing Lab A",
        detail: "Grades 3 and 4, Wednesday, 10:00 to 11:00 AM",
        googleKey: "Writing Lab A",
      },
      {
        id: "writing-lab-b",
        label: "Writing Lab B",
        detail: "Grades 5 to 7, Wednesday, 11:00 AM to 12:00 PM",
        googleKey: "Writing Lab B",
      },
      {
        id: "express-and-connect-lab",
        label: "Express & Connect Lab",
        detail: "Grades 3 to 6, Wednesday, 1:00 to 2:00 PM",
        googleKey: "Express & Connect",
      },
      {
        id: "nature-journaling",
        label: "Nature Journaling (Mini Makers)",
        detail: "Grades 3 to 6, Monday, 11:00 AM to 12:00 PM, Sep 14 to Oct 19",
        googleKey: "Nature Journaling",
      },
      {
        id: "visual-arts",
        label: "Visual Arts (Mini Makers)",
        detail: "Grades 3 to 6, Monday, 11:00 AM to 12:00 PM, Oct 26 to Nov 30",
        googleKey: "Visual Arts",
      },
    ],
  },
];

export const registrationOptions = registrationGroups.flatMap((g) => g.options);
const optionIds = registrationOptions.map((o) => o.id) as [string, ...string[]];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const childSchema = z.object({
  firstName: z.string().trim().min(1, "Enter a first name").max(60),
  lastName: z.string().trim().min(1, "Enter a last name").max(60),
  age: z.string().trim().min(1, "Enter an age").max(10),
  grade: z.enum(gradeOptions, { message: "Pick a grade" }),
  school: z.string().trim().min(1, "Enter a school, or home if you homeschool").max(120),
  phone: optionalText(30),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  goals: optionalText(1500),
  concerns: optionalText(1500),
  health: optionalText(1500),
  classes: z.array(z.enum(optionIds)).min(1, "Pick at least one class or program"),
});

export const registrationSchema = z.object({
  parent: z.object({
    firstName: z.string().trim().min(1, "Enter your first name").max(60),
    lastName: z.string().trim().min(1, "Enter your last name").max(60),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().min(7, "Enter a phone number").max(30),
  }),
  children: z.array(childSchema).min(1).max(MAX_CHILDREN),
  // Honeypot: must stay empty (bots fill it in).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type ChildInput = z.infer<typeof childSchema>;

export function optionLabel(id: string) {
  return registrationOptions.find((o) => o.id === id)?.label ?? id;
}
