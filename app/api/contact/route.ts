import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, interest, message, company } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Kairos Website <onboarding@resend.dev>";

  // If email isn't configured yet, don't hard-fail the visitor: log and return a
  // clear, actionable status so the form still "works" with the call/email fallback.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set — submission not emailed.", {
      name,
      email,
      interest,
    });
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error:
          "Our contact form isn't fully set up yet. Please call or email us directly and we'll get right back to you.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #26241d;">
      <h2 style="color:#3d5310;">New inquiry from the Kairos website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${interest ? `<p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry${interest ? ` — ${interest}` : ""} from ${name}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please call or email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call or email us directly." },
      { status: 500 }
    );
  }
}
