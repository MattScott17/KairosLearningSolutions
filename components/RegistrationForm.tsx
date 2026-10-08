"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, Plus, X } from "lucide-react";
import {
  MAX_CHILDREN,
  charterNote,
  confirmationTimeframe,
  feeLineFor,
  gradeNumber,
  gradeOptions,
  optionLabel,
  registrationGroups,
  registrationOptions,
  type RegistrationGroup,
  type RegistrationOption,
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

type ChildState = { grade: string; picked: string[]; open: boolean; otherOpen: boolean; browse: boolean };

// A draft lives in sessionStorage only: it clears when the tab closes, which matters because the
// form can hold a child's name and health notes. Reading it is explicit, never silent.
const DRAFT_KEY = "kairos-registration-draft";
type Draft = { fields: Record<string, string>; kids: { grade: string; picked: string[] }[] };
let draftAtLoad: Draft | null | undefined;
function readDraftOnce(): Draft | null {
  if (draftAtLoad === undefined) {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      draftAtLoad = raw ? (JSON.parse(raw) as Draft) : null;
    } catch {
      draftAtLoad = null;
    }
  }
  return draftAtLoad ?? null;
}
const noSubscribe = () => () => {};
function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage can be blocked; the form still works without it */
  }
}

export function RegistrationForm({
  initialClass,
  fees,
}: {
  initialClass?: string;
  fees: { label: string; value: string }[];
}) {
  const [childKeys, setChildKeys] = useState([0]);
  const nextKey = useRef(1);
  const [child, setChild] = useState<Record<number, ChildState>>({
    0: { grade: "", picked: initialClass ? [initialClass] : [], open: true, otherOpen: false, browse: Boolean(initialClass) },
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
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const keysRef = useRef(childKeys);
  const childRef = useRef(child);
  const pendingFields = useRef<Record<string, string> | null>(null);
  const prefill = useRef<{ lastName: string; school: string } | null>(null);
  const [prefilled, setPrefilled] = useState<number[]>([]);
  const [restoreTick, setRestoreTick] = useState(0);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  // What has been typed, mirrored from the form so the recap above Submit can show it.
  const [fields, setFields] = useState<Record<string, string>>({});
  const focusNewStudent = useRef(false);
  const savedDraft = useSyncExternalStore(noSubscribe, readDraftOnce, () => null);

  function readFields() {
    const out: Record<string, string> = {};
    const form = formRef.current;
    if (!form) return out;
    new FormData(form).forEach((v, k) => {
      if (k !== "company" && !k.endsWith(".classes")) out[k] = String(v);
    });
    return out;
  }

  function saveDraft() {
    const form = formRef.current;
    if (!form) return;
    const fields: Record<string, string> = {};
    let any = false;
    new FormData(form).forEach((v, k) => {
      if (k === "company" || k.endsWith(".classes")) return;
      const text = String(v);
      fields[k] = text;
      if (text.trim()) any = true;
    });
    const kids = keysRef.current.map((k) => ({
      grade: childRef.current[k]?.grade ?? "",
      picked: childRef.current[k]?.picked ?? [],
    }));
    if (kids.some((k) => k.grade || k.picked.length)) any = true;
    // Never clear here: an untouched form must not wipe a draft the visitor has not restored yet.
    if (!any) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ fields, kids } satisfies Draft));
    } catch {
      /* storage can be blocked; the form still works without it */
    }
  }

  function restoreDraft(draft: Draft) {
    const count = Math.min(Math.max(draft.kids.length, 1), MAX_CHILDREN);
    const keys = Array.from({ length: count }, (_, i) => i);
    const known = new Set(registrationOptions.map((o) => o.id));
    nextKey.current = count;
    setChildKeys(keys);
    setChild(
      Object.fromEntries(
        keys.map((k) => {
          const kid = draft.kids[k];
          const picked = (kid?.picked ?? []).filter((id) => known.has(id));
          return [k, { grade: kid?.grade ?? "", picked, open: picked.length === 0 || k === count - 1, otherOpen: false, browse: picked.length > 0 }];
        })
      )
    );
    pendingFields.current = draft.fields;
    setFields(draft.fields);
    setErrors({});
    setPrefilled([]);
    setBannerDismissed(true);
    setRestoreTick((t) => t + 1);
    document.getElementById("parent.firstName")?.focus();
  }

  // Keep the draft fresh when the picked classes, grades or number of students change.
  useEffect(() => {
    keysRef.current = childKeys;
    childRef.current = child;
    saveDraft();
  }, [childKeys, child]);

  // Forget the cached draft on the way out so coming back later reads storage again.
  useEffect(
    () => () => {
      draftAtLoad = undefined;
    },
    []
  );

  // Fill the typed answers back in once the restored students have rendered.
  useEffect(() => {
    const fields = pendingFields.current;
    const form = formRef.current;
    if (!fields || !form) return;
    pendingFields.current = null;
    for (const [name, value] of Object.entries(fields)) {
      const el = form.elements.namedItem(name);
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.value = value;
    }
  }, [restoreTick]);

  // A new student starts with the last name and school already typed for the first one.
  useEffect(() => {
    const copy = prefill.current;
    const form = formRef.current;
    if (focusNewStudent.current && form) {
      focusNewStudent.current = false;
      const first = form.elements.namedItem(`children.${childKeys.length - 1}.firstName`);
      if (first instanceof HTMLInputElement) first.focus();
    }
    if (!copy || !form) return;
    prefill.current = null;
    const last = form.elements.namedItem(`children.${childKeys.length - 1}.lastName`);
    const school = form.elements.namedItem(`children.${childKeys.length - 1}.school`);
    if (last instanceof HTMLInputElement && copy.lastName && !last.value) last.value = copy.lastName;
    if (school instanceof HTMLInputElement && copy.school && !school.value) school.value = copy.school;
    saveDraft();
  }, [childKeys]);
  const [removedTick, setRemovedTick] = useState(0);

  // Move focus to whatever just explained what happened, so keyboard and screen reader users land on it.
  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);
  // After removing a student the Remove button is gone, so hand focus to the summary or the add button.
  useEffect(() => {
    if (removedTick > 0) (summaryRef.current ?? addButtonRef.current)?.focus();
  }, [removedTick]);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error" && serverError) serverErrorRef.current?.focus();
  }, [status, serverError]);

  function patchChild(key: number, patch: Partial<ChildState>) {
    setChild((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  }

  function addChild() {
    const key = nextKey.current++;
    const form = formRef.current;
    const read = (name: string) => {
      const el = form?.elements.namedItem(name);
      return el instanceof HTMLInputElement ? el.value.trim() : "";
    };
    const copy = { lastName: read("children.0.lastName"), school: read("children.0.school") };
    if (copy.lastName || copy.school) {
      prefill.current = copy;
      setPrefilled((p) => [...p, key]);
      const n = childKeys.length;
      setFields((f) => ({ ...f, [`children.${n}.lastName`]: copy.lastName, [`children.${n}.school`]: copy.school }));
    }
    focusNewStudent.current = true;
    setChild((c) => {
      const next = { ...c, [key]: { grade: "", picked: [], open: true, otherOpen: false, browse: false } };
      // Fold away students who already have a class picked so the form stays short.
      for (const k of childKeys) if (c[k].picked.length > 0) next[k] = { ...c[k], open: false };
      return next;
    });
    setChildKeys((keys) => [...keys, key]);
  }

  function removeChild(key: number) {
    const index = childKeys.indexOf(key);
    setChildKeys((keys) => keys.filter((k) => k !== key));
    setRemovedTick((t) => t + 1);
    // The recap mirrors typed answers by position, so shift them down like the errors below.
    setFields((prev) => {
      const next: Record<string, string> = {};
      for (const [name, value] of Object.entries(prev)) {
        const m = name.match(/^children\.(\d+)\.(.+)$/);
        if (!m) next[name] = value;
        else if (Number(m[1]) < index) next[name] = value;
        else if (Number(m[1]) > index) next[`children.${Number(m[1]) - 1}.${m[2]}`] = value;
      }
      return next;
    });
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

  function errorLabel(name: string, short = false) {
    const parent = name.match(/^parent\.(.+)$/);
    if (parent) return `Your ${fieldNames[parent[1]] ?? parent[1]}`;
    const kid = name.match(/^children\.(\d+)\.(.+)$/);
    if (kid) {
      const field = fieldNames[kid[2]] ?? kid[2];
      return short ? `Their ${field}` : `${studentName(Number(kid[1]))}: ${field}`;
    }
    return name;
  }

  function sectionTitle(name: string) {
    const kid = name.match(/^children\.(\d+)\./);
    return kid ? studentName(Number(kid[1])) : "Parent or guardian";
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
        clearDraft();
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

  // The recap above Submit appears once there is something to show, so an empty form is not full of "not filled in yet".
  const recapStarted =
    Object.values(fields).some((v) => v.trim() !== "") || childKeys.some((k) => child[k].picked.length > 0);
  const errorEntries = Object.entries(errors);
  const summarySections = Array.from(new Set(errorEntries.map(([name]) => sectionTitle(name)))).map((title) => ({
    title,
    items: errorEntries.filter(([name]) => sectionTitle(name) === title),
  }));
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
    opts: { type?: string; required?: boolean; autoComplete?: string; hint?: string; inputMode?: "numeric" | "tel" } = {}
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

  const renderGroups = (groups: RegistrationGroup[], key: number, p: string, state: ChildState) =>
    groups.map((group) => (
      <div key={group.title}>
        <p className="text-sm font-semibold text-forest-800">{group.title}</p>
        <p className="mt-0.5 text-sm text-ink/70">
          {group.blurb}
          {group.links?.map((l) => (
            <span key={l.href}>
              {" "}
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-block py-2 -my-2"
              >
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </span>
          ))}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {group.options.map((o) => (
            <label
              key={o.id}
              className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-forest-300 p-3 transition-colors hover:border-forest-600 has-[:checked]:border-forest-700 has-[:checked]:bg-forest-50"
            >
              <input
                type="checkbox"
                name={`${p}.classes`}
                value={o.id}
                checked={state.picked.includes(o.id)}
                onChange={(e) =>
                  patchChild(key, {
                    picked: e.target.checked ? [...state.picked, o.id] : state.picked.filter((id) => id !== o.id),
                    browse: true,
                  })
                }
                className="mt-0.5 h-5 w-5 shrink-0 accent-forest-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700"
              />
              <span>
                <span className="block text-sm font-medium text-ink">{o.label}</span>
                <span className="block text-sm text-ink/70">{o.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    ));

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(e) => {
        setFields(readFields());
        saveDraft();
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
          <div className="mt-3 space-y-3">
            {summarySections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-semibold text-red-900">{section.title}</p>
                <ul className="mt-0.5 text-base">
                  {section.items.map(([name]) => (
                    <li key={name}>
                      <a
                        href={`#${name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const target =
                            document.getElementById(name) ??
                            formRef.current?.querySelector<HTMLElement>(`[data-field="${name}"]`);
                          target?.scrollIntoView({ block: "center" });
                          const focusable = target?.matches("input, select, textarea, [tabindex]")
                            ? target
                            : target?.querySelector<HTMLElement>("input, select, textarea");
                          focusable?.focus();
                        }}
                        className="inline-flex min-h-11 items-center text-red-800 underline underline-offset-4"
                      >
                        {errorLabel(name, true)}: {errors[name]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedDraft && !bannerDismissed && (
        <div role="region" aria-label="Saved answers" className="rounded-lg border border-forest-300 bg-forest-50 p-5">
          <h2 className="text-lg font-semibold text-forest-900">We saved your answers from earlier</h2>
          <p className="mt-1 text-base text-ink/80">
            They are kept only in this browser tab, and are cleared when you close it or send the form.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={() => restoreDraft(savedDraft)} className="btn-primary">
              Put them back
            </button>
            <button
              type="button"
              onClick={() => {
                clearDraft();
                setBannerDismissed(true);
                document.getElementById("parent.firstName")?.focus();
              }}
              className="btn-outline"
            >
              Start fresh
            </button>
          </div>
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
          Questions marked * are required. This takes about 5 minutes for one student, and a couple more for each
          extra student.
        </p>
      </div>

      <fieldset className="border-t-2 border-forest-800 pt-6">
        <legend className="sr-only">Parent or guardian</legend>
        <h2 className="text-2xl font-semibold">Parent or guardian</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {textField("parent.firstName", "First name", { required: true, autoComplete: "given-name" })}
          {textField("parent.lastName", "Last name", { required: true, autoComplete: "family-name" })}
          {textField("parent.email", "Email", { required: true, type: "email", autoComplete: "email" })}
          {textField("parent.phone", "Cell phone", {
            required: true,
            type: "tel",
            autoComplete: "tel",
            inputMode: "tel",
            hint: "10 digits, like 831-555-0123.",
          })}
        </div>
      </fieldset>

      {childKeys.map((key, i) => {
        const p = `children.${i}`;
        const state = child[key];
        const gradeNo = gradeNumber(state.grade);
        const pickedLabels = state.picked.map(optionLabel);
        const fits = (o: RegistrationOption) =>
          gradeNo === null || !o.grades || (gradeNo >= o.grades[0] && gradeNo <= o.grades[1]);
        const split = (keep: boolean) =>
          registrationGroups
            .map((g) => ({ ...g, options: g.options.filter((o) => fits(o) === keep) }))
            .filter((g) => g.options.length > 0);
        const fitting = split(true);
        const other = gradeNo === null ? [] : split(false);
        const otherPicked = other.reduce((n, g) => n + g.options.filter((o) => state.picked.includes(o.id)).length, 0);
        const first = child[childKeys[0]];
        const canCopyClasses =
          i > 0 && first.picked.length > 0 && first.picked.join() !== state.picked.join();
        const showList =
          gradeNo !== null || state.grade === "Other" || state.picked.length > 0 || state.browse || Boolean(errors[`${p}.classes`]);
        return (
          <fieldset key={key} className="border-t-2 border-forest-800 pt-6">
            <legend className="sr-only">{studentName(i)}</legend>
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`student-${i}`} tabIndex={-1} className="text-2xl font-semibold outline-none">
                {studentName(i)}
                {childKeys.length > 1 && " "}
                {childKeys.length > 1 && (
                  <span className="ml-1 text-base font-normal text-ink/75">of {childKeys.length}</span>
                )}
              </h2>
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

            {prefilled.includes(key) && (
              <p className="mt-3 text-sm text-ink/70">
                We copied the last name and school from Student 1 to save you typing. Change them if they are
                different.
              </p>
            )}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {textField(`${p}.firstName`, "First name", { required: true })}
              {textField(`${p}.lastName`, "Last name", { required: true })}
              <div data-field={`${p}.grade`}>
                <label htmlFor={`${p}.grade`} className="mb-1.5 block text-sm font-medium text-ink/80">
                  Grade this fall {tag(true)}
                </label>
                <select
                  id={`${p}.grade`}
                  name={`${p}.grade`}
                  value={state.grade}
                  onChange={(e) => {
                    const n = gradeNumber(e.target.value);
                    const outside = state.picked.some((id) => {
                      const g = registrationOptions.find((o) => o.id === id)?.grades;
                      return n !== null && g !== undefined && (n < g[0] || n > g[1]);
                    });
                    patchChild(key, { grade: e.target.value, otherOpen: state.otherOpen || outside });
                  }}
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
              {textField(`${p}.age`, "Age", { required: true, inputMode: "numeric", hint: "A number, like 8." })}
              <div className="sm:col-span-2">
                {textField(`${p}.school`, "School this fall", {
                  required: true,
                  hint: "If you homeschool, write home, OGCS, YV or Kairos.",
                })}
              </div>
              <details
                className="sm:col-span-2"
                open={Boolean(errors[`${p}.phone`] || errors[`${p}.email`]) || undefined}
              >
                <summary className="flex min-h-11 cursor-pointer items-center rounded-lg text-base font-semibold text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600">
                  The student&apos;s own phone and email{" "}
                  <span className="ml-2 text-sm font-normal text-ink/65">(optional)</span>
                </summary>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {textField(`${p}.phone`, "Student's cell phone", { type: "tel", inputMode: "tel" })}
                  {textField(`${p}.email`, "Student's email", { type: "email" })}
                </div>
              </details>
            </div>

            {canCopyClasses && (
              <button
                type="button"
                onClick={() => {
                  const outside = first.picked.some((id) => {
                    const g = registrationOptions.find((o) => o.id === id)?.grades;
                    const n = gradeNumber(state.grade);
                    return n !== null && g !== undefined && (n < g[0] || n > g[1]);
                  });
                  patchChild(key, { picked: [...first.picked], browse: true, otherOpen: state.otherOpen || outside });
                }}
                className="btn-outline mt-8 w-full sm:w-auto"
              >
                Pick the same classes as Student 1
              </button>
            )}
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
                {!showList && (
                  <div className="mt-2 rounded-lg bg-sand px-4 py-3 text-base text-ink/80">
                    <p>
                      Choose {childKeys.length > 1 ? "this student's" : "your student's"} grade above and the classes that
                      fit come first.
                    </p>
                    <button
                      type="button"
                      onClick={() => patchChild(key, { browse: true })}
                      className="link-underline mt-1 inline-flex min-h-11 items-center text-sm"
                    >
                      Or browse every class
                    </button>
                  </div>
                )}
                {showList && gradeNo !== null && (
                  <p className="mt-2 text-sm font-medium text-forest-900">Classes and programs for {state.grade}</p>
                )}
                {showList && <div className="mt-2 space-y-6">{renderGroups(fitting, key, p, state)}</div>}
                {showList && other.length > 0 && (
                  <details
                    open={state.otherOpen}
                    onToggle={(e) => {
                      const open = (e.currentTarget as HTMLDetailsElement).open;
                      if (open !== state.otherOpen) patchChild(key, { otherOpen: open });
                    }}
                    className="mt-6 rounded-lg border border-forest-300"
                  >
                    <summary className="flex min-h-11 cursor-pointer items-center rounded-lg px-4 text-base font-semibold text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600">
                      Other classes, meant for different grades
                      {otherPicked > 0 ? ` (${otherPicked} chosen)` : ""}
                    </summary>
                    <div className="space-y-6 px-4 pb-4 pt-2">{renderGroups(other, key, p, state)}</div>
                  </details>
                )}
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
        <button ref={addButtonRef} type="button" onClick={addChild} className="btn-outline w-full sm:w-auto">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add another child (up to {MAX_CHILDREN})
        </button>
      )}

      <div className="border-t border-forest-100 pt-8">
        {recapStarted && (
        <div className="mb-6 rounded-lg border border-forest-300 p-5" aria-labelledby="recap-title" role="region">
          <h2 id="recap-title" className="text-lg font-semibold text-forest-900">
            Check before you send
          </h2>
          <dl className="mt-3 space-y-4 text-base text-ink/80">
            <div>
              <dt className="font-semibold text-forest-900">Parent or guardian</dt>
              <dd>
                {[fields["parent.firstName"], fields["parent.lastName"]].filter(Boolean).join(" ") || (
                  <span className="text-ink/70">Name not filled in yet</span>
                )}
                <br />
                {[fields["parent.email"], fields["parent.phone"]].filter(Boolean).join(", ") || (
                  <span className="text-ink/70">Email and phone not filled in yet</span>
                )}
              </dd>
            </div>
            {childKeys.map((key, i) => {
              const state = child[key];
              const name =
                [fields[`children.${i}.firstName`], fields[`children.${i}.lastName`]].filter(Boolean).join(" ") ||
                studentName(i);
              const lines = Array.from(new Set(state.picked.map(feeLineFor).filter(Boolean)));
              return (
                <div key={key}>
                  <dt className="flex items-center justify-between gap-3 font-semibold text-forest-900">
                    <span>
                      {name}
                      {state.grade ? `, ${state.grade === "Kinder" || state.grade === "Other" ? state.grade : `${state.grade} grade`}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        patchChild(key, { open: true });
                        const heading = document.getElementById(`student-${i}`);
                        heading?.scrollIntoView({ block: "start" });
                        heading?.focus();
                      }}
                      className="link-underline inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-medium"
                    >
                      Edit<span className="sr-only"> {name}</span>
                    </button>
                  </dt>
                  <dd>
                    {state.picked.length > 0 ? (
                      state.picked.map(optionLabel).join(", ")
                    ) : (
                      <span className="text-ink/70">No classes or programs chosen yet</span>
                    )}
                    {lines.length > 0 && (
                      <span className="mt-1 block text-sm text-ink/70">
                        Registration fee line: {lines.join(" and ")}
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
        )}

        <div className="mb-6 rounded-lg bg-sand p-5 text-base text-ink/80">
          <h2 className="text-lg font-semibold text-forest-900">What happens next</h2>
          <p className="mt-2">
            Sending this form does not charge you or hold a spot yet. We&apos;ll be in touch to confirm your spot and
            the registration fee
            {confirmationTimeframe ? `, usually within ${confirmationTimeframe}` : ""}.
          </p>
          <div className="lg:hidden">
            <p className="mt-4 text-sm font-semibold text-forest-900">Registration fees</p>
            <ul className="mt-1 space-y-1 text-sm">
              {fees.map((f) => (
                <li key={f.label} className="flex justify-between gap-4">
                  <span>{f.label}</span>
                  <span className="shrink-0 font-semibold text-forest-800">{f.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-forest-900">Charter school funds</p>
            <p className="mt-1 text-sm">{charterNote}</p>
          </div>
          <p className="mt-4">
            Prefer to talk it through?{" "}
            <a href={site.phoneHref} className="link-underline inline-flex min-h-11 items-center">
              Call {site.phone}
            </a>
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
