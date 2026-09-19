import { NextResponse } from "next/server";
import { landingSchema } from "@/lib/landing-schema";
import { escapeHtml, getResendConfig } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = landingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, phone, program, page, company } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const { apiKey, to, from, resend } = getResendConfig();

  // If email isn't configured yet, don't hard-fail the visitor: log and return a
  // clear, actionable status so the page still "works" with the call fallback.
  if (!apiKey || !resend) {
    console.warn("[lp-callback] RESEND_API_KEY is not set — submission not emailed.", {
      name,
      phone,
      program,
      page,
    });
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error:
          "Our callback form isn't fully set up yet. Please call us directly and we'll get right back to you.",
      },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #26241d;">
      <h2 style="color:#3d5310;">New callback request — ${escapeHtml(program)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Program:</strong> ${escapeHtml(program)}</p>
      <p><strong>Landing page:</strong> ${escapeHtml(page)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New callback request — ${program} — ${name}`,
      html,
    });

    if (error) {
      console.error("[lp-callback] Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your request. Please call us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lp-callback] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}
