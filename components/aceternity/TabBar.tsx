"use client";

// Sliding tab bar adapted from Aceternity UI "Tabs" (https://ui.aceternity.com/components/tabs),
// free tier. Only the animated highlight (shared layoutId) is kept; the stacked absolutely-positioned
// panels were dropped because they overlap content on phones. Adds proper tablist semantics,
// arrow-key navigation and a row that wraps so every tab is visible on small screens.

import { useId, useRef, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  /** Shorter wording shown on phones so the pills fit two to a row */
  shortLabel?: string;
};

export function TabBar({
  tabs,
  active,
  onChange,
  panelId,
  label,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  /** id of the tabpanel these tabs control */
  panelId: string;
  label: string;
  className?: string;
}) {
  const pillId = useId();
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center",
        className
      )}
    >
      {tabs.map((tab, i) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${panelId}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative min-h-11 rounded-md border px-3 py-2.5 sm:px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              selected
                ? "border-transparent text-cream"
                : "border-forest-200 bg-cream text-forest-800 hover:bg-forest-50"
            )}
          >
            {selected && (
              <motion.span
                layoutId={pillId}
                aria-hidden
                className="absolute inset-0 rounded-md bg-forest-800"
                transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            {tab.shortLabel ? (
              <>
                <span className="relative whitespace-nowrap sm:hidden">{tab.shortLabel}</span>
                <span className="relative hidden whitespace-nowrap sm:inline">{tab.label}</span>
              </>
            ) : (
              <span className="relative whitespace-nowrap">{tab.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
