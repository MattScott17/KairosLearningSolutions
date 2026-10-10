"use client";

import { useId, useState } from "react";

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

/** "My student is in…" picks a grade (or two, for siblings) and the schedule shows only the classes that fit, by day. */
export function FallClassFinder({ classes }: { classes: FinderClass[] }) {
  const [grade, setGrade] = useState("");
  const [grade2, setGrade2] = useState("");
  const [second, setSecond] = useState(false);
  const selectId = useId();
  const selectId2 = useId();

  const picked = [grade, second ? grade2 : ""].filter((g) => g !== "").map(Number);
  const fits = (c: FinderClass) =>
    picked.length === 0 || picked.some((g) => g >= c.gradeRange[0] && g <= c.gradeRange[1]);
  const shown = classes.filter(fits);
  const label = picked.map((g) => gradeChoices.find((c) => c.value === String(g))?.label).join(" or ");

  const days = dayOrder
    .map((day) => ({
      day,
      items: shown.filter((c) => c.day === day).sort((a, b) => startMinutes(a.time) - startMinutes(b.time)),
    }))
    .filter((d) => d.items.length > 0);

  const gradeSelect = (id: string, value: string, set: (v: string) => void, text: string, empty: string) => (
    <div className="w-full sm:max-w-[14rem]">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-cream/90">
        {text}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full rounded-lg border border-cream/40 bg-cream px-4 py-3 text-base text-ink focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 sm:text-sm"
      >
        <option value="">{empty}</option>
        {gradeChoices.map((g) => (
          <option key={g.value} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mt-8 rounded-lg bg-forest-800 p-6 text-cream sm:p-8">
      <h3 className="text-2xl font-semibold text-cream">Find a class for your student</h3>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        {gradeSelect(selectId, grade, setGrade, "My student is in", "Show every class")}
        {second && gradeSelect(selectId2, grade2, setGrade2, "My other student is in", "Choose a grade")}
        {!second && (
          <button
            type="button"
            onClick={() => setSecond(true)}
            className="inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold text-cream underline underline-offset-4 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Add a second student
          </button>
        )}
        {second && (
          <button
            type="button"
            onClick={() => {
              setSecond(false);
              setGrade2("");
            }}
            className="inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold text-cream underline underline-offset-4 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Remove second student
          </button>
        )}
      </div>

      <div aria-live="polite" className="mt-5">
        <p className="text-sm font-medium text-cream/90">
          {picked.length === 0
            ? `${classes.length} classes, by day`
            : shown.length > 0
              ? `${shown.length} ${shown.length === 1 ? "class fits" : "classes fit"} ${label}`
              : `No fall class is made for ${label}. Call us and we will help you find something.`}
        </p>
        <div className="mt-3 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {days.map(({ day, items }) => (
            <div key={day}>
              <h4 className="border-b-2 border-gold-500 pb-2 font-display text-xl font-semibold text-cream">{day}s</h4>
              <ul>
                {items.map((c) => (
                  <li key={c.slug} className="border-b border-cream/20">
                    <a
                      href={`#${c.slug}`}
                      className="block rounded-md py-3 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                    >
                      <span className="block text-sm font-semibold text-gold-400">{c.time}</span>
                      <span className="mt-0.5 block text-base text-cream">
                        <span className="font-semibold underline decoration-cream/40 underline-offset-4">{c.title}</span>
                        <span> · {c.grades}</span>
                        <span className="sr-only">. Go to the class details</span>
                      </span>
                      {c.dates ? <span className="mt-0.5 block text-sm text-cream/85">{c.dates}</span> : null}
                    </a>
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
