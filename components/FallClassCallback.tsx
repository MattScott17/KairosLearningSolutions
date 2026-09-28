"use client";

import { usePathname } from "next/navigation";
import { CheckCircle2, Loader2, PhoneCall } from "lucide-react";
import { landingSchema } from "@/lib/landing-schema";
import { site } from "@/lib/site";
import { useFormSubmit } from "@/lib/useFormSubmit";

const inputBase =
  "w-full rounded-lg border bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-500/30";

/** Short "call us back" form for /fall-classes. Goes to the same inbox as the ad landing pages. */
export function FallClassCallback({ classTitles }: { classTitles: string[] }) {
  const pathname = usePathname();
  const { status, errorMsg, fieldErrors, submit } = useFormSubmit(landingSchema, "/api/lp-callback");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submit({ ...Object.fromEntries(formData.entries()), program: "Fall Classes", page: pathname });
  }

  if (status === "success") {
    return (
      <div id="call-me" className="rounded-lg bg-cream p-7 text-ink">
        <CheckCircle2 className="h-10 w-10 text-forest-600" />
        <h2 className="mt-3 text-2xl font-semibold">Thanks, we&apos;ll call you soon</h2>
        <p className="prose-kairos mt-2">
          We call back during our hours, Monday to Thursday. Can&apos;t wait? Call{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const border = (field: string) => (fieldErrors[field] ? "border-red-400" : "border-forest-200");

  return (
    <form id="call-me" onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg bg-cream p-6 text-ink sm:p-7">
      <div>
        <h2 className="text-2xl font-semibold">Save a spot</h2>
        <p className="mt-1 text-sm text-ink/70">
          Leave your number and we&apos;ll call you to find the right class and sign your student up.
        </p>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="cb-name" className="mb-1.5 block text-sm font-medium text-ink/80">
          Your name <span className="text-red-500">*</span>
        </label>
        <input id="cb-name" name="name" type="text" autoComplete="name" className={`${inputBase} ${border("name")}`} />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="cb-phone" className="mb-1.5 block text-sm font-medium text-ink/80">
          Phone <span className="text-red-500">*</span>
        </label>
        <input id="cb-phone" name="phone" type="tel" autoComplete="tel" className={`${inputBase} ${border("phone")}`} />
        {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cb-grade" className="mb-1.5 block text-sm font-medium text-ink/80">
            Student&apos;s grade
          </label>
          <input id="cb-grade" name="grade" type="text" placeholder="e.g. 3rd" className={`${inputBase} border-forest-200`} />
        </div>
        <div>
          <label htmlFor="cb-class" className="mb-1.5 block text-sm font-medium text-ink/80">
            Class
          </label>
          <select id="cb-class" name="classInterest" defaultValue="" className={`${inputBase} border-forest-200`}>
            <option value="">Not sure yet</option>
            {classTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" && errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <PhoneCall className="h-4 w-4" />
            Request a call
          </>
        )}
      </button>
      <p className="text-center text-xs text-ink/50">
        Or call now:{" "}
        <a href={site.phoneHref} className="font-semibold text-forest-700 hover:underline">
          {site.phone}
        </a>
      </p>
    </form>
  );
}
