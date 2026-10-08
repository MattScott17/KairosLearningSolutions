"use client";

import { useState, type ReactNode } from "react";

/** Shows its children always on large screens, and on phones behind a button so they do not push the page down. */
export function CollapsibleOnMobile({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="btn-outline w-full border-cream text-cream hover:bg-cream hover:text-forest-800 lg:hidden"
      >
        {open ? "Hide the call-back form" : label}
      </button>
      <div className={open ? "mt-4 block" : "hidden lg:block"}>{children}</div>
    </div>
  );
}
