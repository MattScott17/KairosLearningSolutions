import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z
    .enum([
      "APEX",
      "Private Tutoring",
      "Homeschool Support",
      "Classes & Enrichment",
  "District Partnerships",
      "District Partnerships",
      "Summer Programs",
      "Something else",
    ])
    .optional(),
  studentFirstName: z.string().trim().max(60).optional().or(z.literal("")),
  studentLastName: z.string().trim().max(60).optional().or(z.literal("")),
  studentSchool: z.string().trim().max(120).optional().or(z.literal("")),
  studentGrade: z.string().trim().max(30).optional().or(z.literal("")),
  updatesOptIn: z.boolean().optional(),
  message: z.string().trim().min(10, "Please tell us a little more").max(2000),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const interestOptions = [
  "APEX",
  "Private Tutoring",
  "Homeschool Support",
  "Classes & Enrichment",
  "District Partnerships",
  "Summer Programs",
  "Something else",
] as const;
