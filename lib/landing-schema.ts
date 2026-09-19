import { z } from "zod";

export const landingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  program: z.enum(["APEX", "Private Tutoring"]),
  page: z.string().trim().max(100),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LandingInput = z.infer<typeof landingSchema>;
