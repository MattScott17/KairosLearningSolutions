"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, interestOptions } from "@/lib/contact-schema";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      for (const [key, val] of Object.entries(flat)) {
        if (val && val[0]) next[key] = val[0];
      }
      setFieldErrors(next);
      setStatus("error");
      setErrorMsg("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      setErrorMsg(
        data.error ||
          "We couldn't send your message. Please call or email us and we'll respond quickly."
      );
    } catch {
      setStatus("error");
      setErrorMsg(
        "We couldn't reach the server. Please call or email us and we'll respond quickly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-forest-200 bg-forest-50 p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest-600" />
        <h3 className="mt-4 text-2xl font-semibold">Message sent!</h3>
        <p className="prose-kairos mx-auto mt-2 max-w-md">
          Thanks for reaching out. We'll get back to you as soon as we can — usually within one
          business day. Need something sooner? Call us at{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-cream px-4 py-3 text-sm text-ink shadow-sm outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-500/30";

  const errClass = (field: string) =>
    fieldErrors[field] ? "border-red-400" : "border-forest-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from users, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink/80">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`${inputBase} ${errClass("name")}`}
            placeholder="Your name"
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink/80">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${inputBase} ${errClass("email")}`}
            placeholder="you@example.com"
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink/80">
            Phone <span className="text-ink/40">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${inputBase} ${errClass("phone")}`}
            placeholder="(831) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-ink/80">
            I'm interested in
          </label>
          <select id="interest" name="interest" defaultValue="" className={`${inputBase} border-forest-200`}>
            <option value="" disabled>
              Choose one…
            </option>
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink/80">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${inputBase} ${errClass("message")} resize-y`}
          placeholder="Tell us about your student — their age, what they need, and any questions you have."
        />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
      </div>

      {status === "error" && errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>

      <p className="text-xs text-ink/50">
        We'll only use your information to respond to your inquiry.
      </p>
    </form>
  );
}
