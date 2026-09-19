// Shared helpers for the site's Resend-backed API routes (contact form, landing
// page callback form). Keeping these here avoids each route redefining them.

import { Resend } from "resend";
import { site } from "@/lib/site";

export function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Kairos Website <onboarding@resend.dev>";
  return { apiKey, to, from, resend: apiKey ? new Resend(apiKey) : null };
}
