import { NextResponse } from "next/server";
import { escapeHtml, getResendConfig } from "@/lib/email";
import { optionLabel, registrationSchema, type RegistrationInput } from "@/lib/registration";
import { submitToGoogleForm } from "@/lib/registration-google";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function registrationEmail({ parent, children }: RegistrationInput) {
  const row = (label: string, value?: string) =>
    value ? `<p style="margin:4px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

  const childBlocks = children
    .map(
      (c, i) => `
        <h3 style="color:#3d5310; margin:24px 0 8px;">Student ${i + 1}: ${escapeHtml(`${c.firstName} ${c.lastName}`)}</h3>
        ${row("Age", c.age)}
        ${row("Grade", c.grade)}
        ${row("School this fall", c.school)}
        ${row("Student phone", c.phone)}
        ${row("Student email", c.email)}
        <p style="margin:8px 0 4px;"><strong>Signing up for:</strong></p>
        <ul style="margin:0; padding-left:20px;">
          ${c.classes.map((id) => `<li>${escapeHtml(optionLabel(id))}</li>`).join("")}
        </ul>
        ${row("Goals", c.goals)}
        ${row("Concerns", c.concerns)}
        ${row("Allergies or health", c.health)}`
    )
    .join("");

  return `
    <div style="font-family: system-ui, sans-serif; color: #26241d;">
      <h2 style="color:#3d5310;">New Fall 2026 registration</h2>
      ${row("Parent", `${parent.firstName} ${parent.lastName}`)}
      ${row("Email", parent.email)}
      ${row("Phone", parent.phone)}
      ${childBlocks}
    </div>
  `;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  // Honeypot tripped: pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const data = parsed.data;
  const studentNames = data.children.map((c) => c.firstName).join(", ");

  // Two independent deliveries: the Google Form (Jackie's existing response sheet) and an
  // email. Either one reaching her counts as success.
  const [savedToGoogle, emailed] = await Promise.all([
    submitToGoogleForm(data),
    (async () => {
      const { resend, to, from } = getResendConfig();
      if (!resend) return false;
      try {
        const { error } = await resend.emails.send({
          from,
          to,
          replyTo: data.parent.email,
          subject: `Fall 2026 registration: ${studentNames} (${data.parent.lastName})`,
          html: registrationEmail(data),
        });
        if (error) console.error("[register] Resend error:", error);
        return !error;
      } catch (err) {
        console.error("[register] Unexpected email error:", err);
        return false;
      }
    })(),
  ]);

  if (savedToGoogle || emailed) {
    return NextResponse.json({ ok: true });
  }

  console.error("[register] Registration not delivered anywhere.", {
    parent: `${data.parent.firstName} ${data.parent.lastName}`,
    phone: data.parent.phone,
    students: studentNames,
  });
  return NextResponse.json(
    {
      error: `We couldn't send your registration. Please call us at ${site.phone} and we'll sign your student up over the phone.`,
    },
    { status: 503 }
  );
}
