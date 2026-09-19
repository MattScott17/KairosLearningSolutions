"use client";

import { useState } from "react";
import type { ZodType } from "zod";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

// Shared submit/validate/error-state machinery behind ContactForm and
// CallbackForm — both post a zod-validated JSON body to an API route and
// track the same idle/submitting/success/error lifecycle. Each component
// keeps only its own field markup; this owns the behavior that was
// previously copy-adapted between the two.
export function useFormSubmit<T>(schema: ZodType<T>, endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(raw: Record<string, unknown>) {
    setFieldErrors({});
    setErrorMsg("");

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
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
      const res = await fetch(endpoint, {
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
        data.error || "We couldn't send your request. Please call or email us and we'll respond quickly."
      );
    } catch {
      setStatus("error");
      setErrorMsg("We couldn't reach the server. Please call or email us and we'll respond quickly.");
    }
  }

  return { status, errorMsg, fieldErrors, submit };
}
