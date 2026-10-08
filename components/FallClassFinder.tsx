"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

export type FinderClass = {
  slug: string;
  title: string;
  grades: string;
  gradeRange: [number, number];
  day: string;
  time: string;
  dates?: string;
  href: string;
};

const gradeChoices = [
  { value: "0", label: "Kindergarten" },
  { value: "1", label: "1st grade" },
  { value: "2", label: "2nd grade" },
  { value: "3", label: "3rd grade" },
  { value: "4", label: "4th grade" },
  { value: "5", label: "5th grade" },
  { value: "6", label: "6th grade" },
  { value: "7", label: "7th grade" },
];

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/** Minutes after midnight for the start of "10:30 to 11:30 AM" or "12:30 to 2:00 PM". */
function startMinutes(time: string) {
  const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return 0;
  let hour = Number(m[1]) % 12;
  const suffix = (m[3] ?? time.match(/(AM|PM)\s*$/i)?.[1] ?? "AM").toUpperCase();
  if (suffix === "PM") hour += 12;
  return hour * 60 + Number(m[2]);
}

/** "My student is in…" picks a grade and the schedule below shows only the classes that fit, by day. */
export function FallClassFinder({ classes }: { classes: FinderClass[] }) {
  const [grade, setGrade] = useState("");
  const selectId = useId();
  const chosen = grade === "" ? null : Number(grade);
  const shown = classes.filter((c) => chosen === null || (chosen >= c.gradeRange[0] && chosen <= c.gradeRange[1]));
  const label = gradeChoices.find((g) => g.value === grade)?.label;

  const days = dayOrder
    .map((day) => ({
      day,
      items: shown.filter((c) => c.day === day).sort((a, b) => startMinutes(a.time) - startMinutes(b.time)),
    }))
    .filter((d) => d.items.length > 0);

  return (
    <div className="mt-8 rounded-lg border border-forest-300 p-5 sm:p-6">
      <h3 className="text-xl font-semibold text-forest-900">Find a class for your student</h3>
      <div className="mt-4 max-w-xs">
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink/80">
          My student is in
        </label>
        <select
          id={selectId}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full rounded-lg border border-forest-600 bg-cream px-4 py-3 text-base text-ink focus:border-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 sm:text-sm"
        >
          <option value="">Show every class</option>
          {gradeChoices.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div aria-live="polite" className="mt-5">
        <p className="text-sm font-medium text-ink/75">
          {chosen === null
            ? `${classes.length} classes, by day`
            : shown.length > 0
              ? `${shown.length} ${shown.length === 1 ? "class fits" : "classes fit"} ${label}`
              : `No fall class is made for ${label}. Call us and we will help you find something.`}
        </p>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          {days.map(({ day, items }) => (
            <div key={day}>
              <h4 className="border-b-2 border-forest-800 pb-2 font-display text-lg font-semibold text-forest-900">
                {day}s
              </h4>
              <ul>
                {items.map((c) => (
                  <li key={c.slug} className="border-b border-forest-100 py-3">
                    <p className="text-sm font-semibold text-forest-800">
                      {c.time}
                      {c.dates ? <span className="font-normal text-ink/75"> · {c.dates}</span> : null}
                    </p>
                    <p className="mt-0.5 text-base text-ink">
                      <a href={`#${c.slug}`} className="link-underline inline-flex min-h-11 items-center font-medium">
                        {c.title}
                      </a>
                      <span className="text-ink/75"> · {c.grades}</span>
                    </p>
                    <Link
                      href={c.href}
                      className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-forest-800 hover:text-forest-600"
                    >
                      Register
                      <span className="sr-only"> for {c.title}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
