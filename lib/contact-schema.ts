import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  interest: z
    .enum([
      "APEX",
      "Private Tutoring",
      "Homework Club",
      "Homeschool Support",
      "Classes & Enrichment",
      "Summer Programs",
      "Something else",
    ])
    .optional(),
  message: z.string().trim().min(10, "Please tell us a little more").max(2000),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const interestOptions = [
  "APEX",
  "Private Tutoring",
  "Homework Club",
  "Homeschool Support",
  "Classes & Enrichment",
  "Summer Programs",
  "Something else",
] as const;
