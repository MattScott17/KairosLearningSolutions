"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Plus, X } from "lucide-react";
import {
  MAX_CHILDREN,
  gradeOptions,
  registrationGroups,
  registrationSchema,
} from "@/lib/registration";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg border bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-500/30";

const childFields = ["firstName", "lastName", "age", "grade", "school", "phone", "email", "goals", "concerns", "health"] as const;

export function RegistrationForm({ initialClass }: { initialClass?: string }) {
  const [childKeys, setChildKeys] = useState([0]);
  const nextKey = useRef(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function addChild() {
    setChildKeys((keys) => [...keys, nextKey.current++]);
  }

  function removeChild(key: number) {
    setChildKeys((keys) => keys.filter((k) => k !== key));
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (name: string) => String(fd.get(name) ?? "");

    const raw = {
      parent: {
        firstName: get("parent.firstName"),
        lastName: get("parent.lastName"),
        email: get("parent.email"),
        phone: get("parent.phone"),
      },
      children: childKeys.map((_, i) => ({
        ...Object.fromEntries(childFields.map((f) => [f, get(`children.${i}.${f}`)])),
        classes: fd.getAll(`children.${i}.classes`).map(String),
      })),
      company: get("company"),
    };

    const parsed = registrationSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setErrorMsg("A few answers are missing. They're marked in red above.");
      // Bring the first problem into view.
      const first = formRef.current?.querySelector<HTMLElement>(`[data-field="${Object.keys(next)[0]}"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setStatus("error");
      setErrorMsg(data.error || `We couldn't send your registration. Please call us at ${site.phone}.`);
    } catch {
      setStatus("error");
      setErrorMsg(`We couldn't reach the server. Please call us at ${site.phone}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-forest-200 bg-forest-50 p-8 sm:p-10">
        <CheckCircle2 className="h-10 w-10 text-forest-600" />
        <h2 className="mt-4 text-3xl font-semibold">You&apos;re registered. Thank you!</h2>
        <p className="prose-kairos mt-3 max-w-xl text-lg">
          No one loves forms, so thank you for filling this one out. We&apos;ll be in touch to confirm
          your spot and the registration fee. If you have questions before then, call{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-600" role="alert">
        {errors[name]}
      </p>
    ) : null;
  const border = (name: string) => (errors[name] ? "border-red-400" : "border-forest-200");

  const textField = (
    name: string,
    label: string,
    opts: { type?: string; required?: boolean; autoComplete?: string; hint?: string; inputMode?: "numeric" } = {}
  ) => (
    <div data-field={name}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {opts.required ? <span className="text-red-500">*</span> : <span className="text-ink/40">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        className={`${inputBase} ${border(name)}`}
      />
      {opts.hint && !errors[name] && <p className="mt-1 text-xs text-ink/50">{opts.hint}</p>}
      {err(name)}
    </div>
  );

  const textArea = (name: string, label: string) => (
    <div data-field={name}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} <span className="text-ink/40">(optional)</span>
      </label>
      <textarea id={name} name={name} rows={3} className={`${inputBase} ${border(name)} resize-y`} />
      {err(name)}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="border-t-2 border-forest-800 pt-6">
        <legend className="sr-only">Parent or guardian</legend>
        <h2 className="text-2xl font-semibold">Parent or guardian</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {textField("parent.firstName", "First name", { required: true, autoComplete: "given-name" })}
          {textField("parent.lastName", "Last name", { required: true, autoComplete: "family-name" })}
          {textField("parent.email", "Email", { required: true, type: "email", autoComplete: "email" })}
          {textField("parent.phone", "Cell phone", { required: true, type: "tel", autoComplete: "tel" })}
        </div>
      </fieldset>

      {childKeys.map((key, i) => {
        const p = `children.${i}`;
        return (
          <fieldset key={key} className="border-t-2 border-forest-800 pt-6">
            <legend className="sr-only">Student {i + 1}</legend>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl font-semibold">
                {childKeys.length > 1 ? `Student ${i + 1}` : "Your student"}
              </h2>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeChild(key)}
                  className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  Remove
                </button>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {textField(`${p}.firstName`, "First name", { required: true })}
              {textField(`${p}.lastName`, "Last name", { required: true })}
              {textField(`${p}.age`, "Age", { required: true, inputMode: "numeric" })}
              <div data-field={`${p}.grade`}>
                <label htmlFor={`${p}.grade`} className="mb-1.5 block text-sm font-medium text-ink/80">
                  Grade this fall <span className="text-red-500">*</span>
                </label>
                <select id={`${p}.grade`} name={`${p}.grade`} defaultValue="" className={`${inputBase} ${border(`${p}.grade`)}`}>
                  <option value="" disabled>
                    Choose a grade
                  </option>
                  {gradeOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {err(`${p}.grade`)}
              </div>
              <div className="sm:col-span-2">
                {textField(`${p}.school`, "School this fall", {
                  required: true,
                  hint: "If you homeschool, write home, OGCS, YV or Kairos.",
                })}
              </div>
              {textField(`${p}.phone`, "Student's cell phone", { type: "tel" })}
              {textField(`${p}.email`, "Student's email", { type: "email" })}
            </div>

            <div className="mt-8" data-field={`${p}.classes`}>
              <h3 className="text-lg font-semibold">
                What is {childKeys.length > 1 ? "this student" : "your student"} signing up for?{" "}
                <span className="text-red-500">*</span>
              </h3>
              <p className="mt-1 text-sm text-ink/60">Check everything that applies.</p>
              {err(`${p}.classes`)}
              <div className="mt-4 space-y-6">
                {registrationGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold text-forest-800">{group.title}</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {group.options.map((o) => (
                        <label
                          key={o.id}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border border-forest-100 p-3 transition-colors hover:border-forest-300 has-[:checked]:border-forest-600 has-[:checked]:bg-forest-50"
                        >
                          <input
                            type="checkbox"
                            name={`${p}.classes`}
                            value={o.id}
                            defaultChecked={i === 0 && o.id === initialClass}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest-300 text-forest-700 focus:ring-forest-500/30"
                          />
                          <span>
                            <span className="block text-sm font-medium text-ink">{o.label}</span>
                            <span className="block text-xs text-ink/60">{o.detail}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {textArea(`${p}.goals`, "What are your main goals for your child?")}
              {textArea(`${p}.concerns`, "Any concerns?")}
              {textArea(`${p}.health`, "Any allergies or health issues we should know about?")}
            </div>
          </fieldset>
        );
      })}

      {childKeys.length < MAX_CHILDREN && (
        <button type="button" onClick={addChild} className="btn-outline w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add another child
        </button>
      )}

      <div className="border-t border-forest-100 pt-8">
        {status === "error" && errorMsg && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {errorMsg}
          </div>
        )}
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full px-8 py-4 text-base sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Submit registration"
          )}
        </button>
        <p className="mt-3 text-xs text-ink/50">
          We only use this to plan classes and contact you about your student.
        </p>
      </div>
    </form>
  );
}
