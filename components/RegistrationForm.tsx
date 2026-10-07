"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, Plus, X } from "lucide-react";
import {
  MAX_CHILDREN,
  confirmationTimeframe,
  gradeNumber,
  gradeOptions,
  optionLabel,
  registrationGroups,
  registrationSchema,
  type RegistrationInput,
} from "@/lib/registration";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg border bg-cream scroll-mt-24 px-4 py-3 text-base text-ink outline-none sm:text-sm transition-colors focus:border-forest-800 focus:ring-2 focus:ring-forest-600";

const childFields = ["firstName", "lastName", "age", "grade", "school", "phone", "email", "goals", "concerns", "health"] as const;

const fieldNames: Record<string, string> = {
  firstName: "first name",
  lastName: "last name",
  age: "age",
  grade: "grade",
  school: "school",
  phone: "phone",
  email: "email",
  classes: "classes or programs",
  goals: "goals",
  concerns: "concerns",
  health: "health notes",
};

type ChildState = { grade: string; picked: string[]; open: boolean };

export function RegistrationForm({ initialClass }: { initialClass?: string }) {
  const [childKeys, setChildKeys] = useState([0]);
  const nextKey = useRef(1);
  const [child, setChild] = useState<Record<number, ChildState>>({
    0: { grade: "", picked: initialClass ? [initialClass] : [], open: true },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);
  const [submitted, setSubmitted] = useState<RegistrationInput | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const serverErrorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to whatever just explained what happened, so keyboard and screen reader users land on it.
  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error" && serverError) serverErrorRef.current?.focus();
  }, [status, serverError]);

  function patchChild(key: number, patch: Partial<ChildState>) {
    setChild((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  }

  function addChild() {
    const key = nextKey.current++;
    setChild((c) => {
      const next = { ...c, [key]: { grade: "", picked: [], open: true } };
      // Fold away students who already have a class picked so the form stays short.
      for (const k of childKeys) if (c[k].picked.length > 0) next[k] = { ...c[k], open: false };
      return next;
    });
    setChildKeys((keys) => [...keys, key]);
  }

  function removeChild(key: number) {
    const index = childKeys.indexOf(key);
    setChildKeys((keys) => keys.filter((k) => k !== key));
    // Keep the other students' messages, shifted to their new positions.
    setErrors((prev) => {
      const next: Record<string, string> = {};
      for (const [name, message] of Object.entries(prev)) {
        const m = name.match(/^children\.(\d+)\.(.+)$/);
        if (!m) {
          next[name] = message;
          continue;
        }
        const n = Number(m[1]);
        if (n === index) continue;
        next[n > index ? `children.${n - 1}.${m[2]}` : name] = message;
      }
      return next;
    });
  }

  function studentName(i: number) {
    return childKeys.length > 1 ? `Student ${i + 1}` : "Your student";
  }

  function errorLabel(name: string) {
    const parent = name.match(/^parent\.(.+)$/);
    if (parent) return `Your ${fieldNames[parent[1]] ?? parent[1]}`;
    const kid = name.match(/^children\.(\d+)\.(.+)$/);
    if (kid) return `${studentName(Number(kid[1]))}: ${fieldNames[kid[2]] ?? kid[2]}`;
    return name;
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
      setServerError("");
      setStatus("error");
      // Open any folded student whose answers need fixing, then land on the summary.
      setChild((c) => {
        const n = { ...c };
        childKeys.forEach((k, i) => {
          if (next[`children.${i}.classes`]) n[k] = { ...n[k], open: true };
        });
        return n;
      });
      setAttempt((a) => a + 1);
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmitted(parsed.data);
        setStatus("success");
        return;
      }
      setStatus("error");
      setServerError(data.error || `We couldn't send your registration. Please call us at ${site.phone}.`);
    } catch {
      setStatus("error");
      setServerError(`We couldn't reach the server. Please call us at ${site.phone}.`);
    }
  }

  if (status === "success" && submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-forest-200 bg-forest-50 p-8 outline-none sm:p-10"
      >
        <CheckCircle2 className="h-10 w-10 text-forest-600" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-semibold">We got your registration. Thank you!</h2>
        <p className="prose-kairos mt-3 max-w-xl text-lg">
          No one loves forms, so thank you for filling this one out. Your spot is not held until we
          confirm it. We&apos;ll be in touch at {submitted.parent.email} or {submitted.parent.phone} to confirm
          your spot and the registration fee
          {confirmationTimeframe ? `, usually within ${confirmationTimeframe}` : ""}.
        </p>
        <ul className="mt-6 max-w-xl space-y-2 border-t border-forest-200 pt-5 text-base text-ink/80">
          {submitted.children.map((c, i) => (
            <li key={i}>
              <span className="font-semibold text-forest-900">{c.firstName}:</span>{" "}
              {c.classes.map(optionLabel).join(", ")}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-ink/80">
          Questions before then? Call{" "}
          <a href={site.phoneHref} className="link-underline inline-block py-2 -my-2">
            {site.phone}
          </a>
          , or{" "}
          <Link href="/fall-classes" className="link-underline inline-block py-2 -my-2">
            look at the fall classes again
          </Link>
          .
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors);
  const errId = (name: string) => `${name}-error`;
  const hintId = (name: string) => `${name}-hint`;
  const describedBy = (name: string, hasHint = false) =>
    [hasHint && !errors[name] ? hintId(name) : null, errors[name] ? errId(name) : null].filter(Boolean).join(" ") ||
    undefined;

  const err = (name: string) =>
    errors[name] ? (
      <p id={errId(name)} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          <span className="sr-only">Error: </span>
          {errors[name]}
        </span>
      </p>
    ) : null;
  const border = (name: string) => (errors[name] ? "border-red-600" : "border-forest-600");

  const tag = (required?: boolean) =>
    required ? (
      <span aria-hidden="true" className="text-red-700">
        *
      </span>
    ) : (
      <span className="font-normal text-ink/65">(optional)</span>
    );

  const textField = (
    name: string,
    label: string,
    opts: { type?: string; required?: boolean; autoComplete?: string; hint?: string; inputMode?: "numeric" } = {}
  ) => (
    <div data-field={name}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {tag(opts.required)}
      </label>
      <input
        id={name}
        name={name}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        required={opts.required}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={describedBy(name, Boolean(opts.hint))}
        className={`${inputBase} ${border(name)}`}
      />
      {opts.hint && !errors[name] && (
        <p id={hintId(name)} className="mt-1 text-sm text-ink/70">
          {opts.hint}
        </p>
      )}
      {err(name)}
    </div>
  );

  const textArea = (name: string, label: string) => (
    <div data-field={name}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {tag(false)}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={describedBy(name)}
        className={`${inputBase} ${border(name)} resize-y`}
      />
      {err(name)}
    </div>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(e) => {
        // A message goes away as soon as that answer changes.
        const name = (e.target as unknown as HTMLInputElement).name;
        if (name && errors[name]) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
          });
        }
      }}
      noValidate
      className="space-y-12"
    >
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="rounded-lg border-2 border-red-600 bg-red-50 p-5 outline-none"
        >
          <h2 id="error-summary-title" className="flex items-center gap-2 text-lg font-semibold text-red-800">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {errorEntries.length === 1 ? "1 answer needs fixing" : `${errorEntries.length} answers need fixing`}
          </h2>
          <ul className="mt-3 space-y-0.5 text-base">
            {errorEntries.map(([name]) => (
              <li key={name}>
                <a
                  href={`#${name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(name) ?? formRef.current?.querySelector<HTMLElement>(`[data-field="${name}"]`);
                    target?.scrollIntoView({ block: "center" });
                    (target?.matches("input, select, textarea") ? target : target?.querySelector<HTMLElement>("input"))?.focus();
                  }}
                  className="inline-flex min-h-11 items-center text-red-800 underline underline-offset-4"
                >
                  {errorLabel(name)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <p className="text-base text-ink/80">
          Required questions are marked with a red star. This takes about 5 minutes for one student, and a couple
          more for each extra student.
        </p>
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
        const state = child[key];
        const gradeNo = gradeNumber(state.grade);
        const pickedLabels = state.picked.map(optionLabel);
        return (
          <fieldset key={key} className="border-t-2 border-forest-800 pt-6">
            <legend className="sr-only">{studentName(i)}</legend>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl font-semibold">{studentName(i)}</h2>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeChild(key)}
                  className="-my-2 inline-flex min-h-11 items-center gap-1 px-2 text-sm text-ink/70 hover:text-red-700"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Remove {studentName(i)}
                </button>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {textField(`${p}.firstName`, "First name", { required: true })}
              {textField(`${p}.lastName`, "Last name", { required: true })}
              {textField(`${p}.age`, "Age", { required: true, inputMode: "numeric" })}
              <div data-field={`${p}.grade`}>
                <label htmlFor={`${p}.grade`} className="mb-1.5 block text-sm font-medium text-ink/80">
                  Grade this fall {tag(true)}
                </label>
                <select
                  id={`${p}.grade`}
                  name={`${p}.grade`}
                  value={state.grade}
                  onChange={(e) => patchChild(key, { grade: e.target.value })}
                  required
                  aria-invalid={errors[`${p}.grade`] ? true : undefined}
                  aria-describedby={describedBy(`${p}.grade`)}
                  className={`${inputBase} ${border(`${p}.grade`)}`}
                >
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

            <details
              open={state.open}
              onToggle={(e) => {
                const open = (e.currentTarget as HTMLDetailsElement).open;
                if (open !== state.open) patchChild(key, { open });
              }}
              className="mt-8"
              data-field={`${p}.classes`}
            >
              <summary className="flex min-h-11 cursor-pointer flex-col justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600">
                <span className="text-lg font-semibold text-forest-900">
                  What is {childKeys.length > 1 ? "this student" : "your student"} signing up for? {tag(true)}
                </span>
                <span className="mt-0.5 text-sm text-ink/70">
                  {pickedLabels.length > 0
                    ? `${pickedLabels.length} chosen: ${pickedLabels.join(", ")}`
                    : "None chosen yet. Check everything that applies."}
                </span>
              </summary>
              <div
                role="group"
                aria-label={`Classes and programs for ${studentName(i)}`}
                aria-describedby={describedBy(`${p}.classes`)}
                className="mt-4"
              >
                <div id={`${p}.classes`} tabIndex={-1} className="outline-none">
                  {err(`${p}.classes`)}
                </div>
                <div className="mt-2 space-y-6">
                  {registrationGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-semibold text-forest-800">{group.title}</p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {group.options.map((o) => {
                          const mismatch =
                            gradeNo !== null && o.grades !== undefined && (gradeNo < o.grades[0] || gradeNo > o.grades[1]);
                          return (
                            <label
                              key={o.id}
                              className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:border-forest-600 has-[:checked]:border-forest-700 has-[:checked]:bg-forest-50 ${
                                mismatch ? "border-forest-200 bg-sand" : "border-forest-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                name={`${p}.classes`}
                                value={o.id}
                                checked={state.picked.includes(o.id)}
                                onChange={(e) =>
                                  patchChild(key, {
                                    picked: e.target.checked
                                      ? [...state.picked, o.id]
                                      : state.picked.filter((id) => id !== o.id),
                                  })
                                }
                                className="mt-0.5 h-5 w-5 shrink-0 accent-forest-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700"
                              />
                              <span>
                                <span className="block text-sm font-medium text-ink">{o.label}</span>
                                <span className="block text-sm text-ink/70">{o.detail}</span>
                                {mismatch && (
                                  <span className="mt-1 block text-sm font-medium text-forest-800">
                                    Meant for different grades than {state.grade}
                                  </span>
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <details
              className="mt-8"
              open={Boolean(errors[`${p}.goals`] || errors[`${p}.concerns`] || errors[`${p}.health`]) || undefined}
            >
              <summary className="flex min-h-11 cursor-pointer items-center rounded-lg text-lg font-semibold text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600">
                More about {childKeys.length > 1 ? "this student" : "your student"}{" "}
                <span className="ml-2 text-sm font-normal text-ink/65">(optional)</span>
              </summary>
              <div className="mt-4 grid gap-5">
                {textArea(`${p}.goals`, "What are your main goals for your child?")}
                {textArea(`${p}.concerns`, "Any concerns?")}
                {textArea(`${p}.health`, "Any allergies or health issues we should know about?")}
              </div>
            </details>
          </fieldset>
        );
      })}

      {childKeys.length < MAX_CHILDREN && (
        <button type="button" onClick={addChild} className="btn-outline w-full sm:w-auto">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add another child (up to {MAX_CHILDREN})
        </button>
      )}

      <div className="border-t border-forest-100 pt-8">
        <div className="mb-6 rounded-lg bg-sand p-5 text-base text-ink/80">
          <h2 className="text-lg font-semibold text-forest-900">What happens next</h2>
          <p className="mt-2">
            Sending this form does not charge you or hold a spot yet. We&apos;ll be in touch to confirm your spot and
            the registration fee
            {confirmationTimeframe ? `, usually within ${confirmationTimeframe}` : ""}. Prefer to talk it through?
            Call{" "}
            <a href={site.phoneHref} className="link-underline inline-block py-2 -my-2">
              {site.phone}
            </a>
            .
          </p>
        </div>
        {status === "error" && serverError && (
          <div
            ref={serverErrorRef}
            tabIndex={-1}
            role="alert"
            className="mb-5 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-base text-red-800 outline-none"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{serverError}</span>
          </div>
        )}
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full px-8 py-4 text-base sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Submit registration"
          )}
        </button>
        <p className="mt-3 text-sm text-ink/70">
          We only use this to plan classes and contact you about your student.
        </p>
      </div>
    </form>
  );
}
