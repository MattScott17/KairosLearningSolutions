import { z } from "zod";

export const landingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  program: z.enum(["APEX", "Private Tutoring", "Fall Classes"]),
  page: z.string().trim().max(100),
  // Fall class sign-ups only: the student's grade and the class they picked.
  grade: z.string().trim().max(30).optional().or(z.literal("")),
  classInterest: z.string().trim().max(100).optional().or(z.literal("")),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LandingInput = z.infer<typeof landingSchema>;
