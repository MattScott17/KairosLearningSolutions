"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TabBar } from "@/components/aceternity/TabBar";
import type { Photo } from "@/lib/photos";

export type Path = {
  id: string;
  /** Finishes the sentence "My student needs…" */
  need: string;
  /** Shorter wording for the phone-sized tab */
  needShort?: string;
  program: string;
  summary: string;
  facts: { label: string; value: string }[];
  href: string;
  cta: string;
  photo: Photo;
};

const listeners = new Set<() => void>();
function subscribe(fn: () => void) {
  listeners.add(fn);
  window.addEventListener("popstate", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("popstate", fn);
  };
}
function readPathParam() {
  return new URLSearchParams(window.location.search).get("path");
}

/** "My student needs…" → the matching program, one tab at a time. */
export function PathFinder({ paths }: { paths: Path[] }) {
  const reduce = useReducedMotion();

  // The chosen tab lives in the URL (?path=) so a refresh or a shared link lands on the same program.
  const urlId = useSyncExternalStore(subscribe, readPathParam, () => null);
  const active = urlId && paths.some((p) => p.id === urlId) ? urlId : paths[0].id;

  const choose = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("path", id);
    window.history.replaceState(null, "", url);
    listeners.forEach((fn) => fn());
  };
  const path = paths.find((p) => p.id === active) ?? paths[0];
  const panelId = "path-finder-panel";

  return (
    <div>
      <p className="text-center font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
        My student needs…
      </p>
      <TabBar
        tabs={paths.map((p) => ({ id: p.id, label: p.need, shortLabel: p.needShort }))}
        active={active}
        onChange={choose}
        panelId={panelId}
        label="What does your student need?"
        className="mt-6"
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${panelId}-tab-${path.id}`}
        className="mx-auto mt-6 max-w-5xl rounded-lg border border-forest-200 bg-forest-100 p-4 sm:p-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-6 md:grid-cols-[0.85fr_1.15fr] md:gap-12"
          >
            <div className="arch relative aspect-[4/3] overflow-hidden border-[6px] border-cream ring-1 ring-forest-300 md:aspect-[5/6]">
              <Image
                src={path.photo.src}
                alt={path.photo.alt}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="md:pr-4">
              <h3 className="text-3xl font-semibold">{path.program}</h3>
              <p className="prose-kairos mt-3">{path.summary}</p>
              <dl className="mt-6 grid gap-3 border-t border-forest-300/70 pt-5 sm:grid-cols-3 sm:gap-4">
                {path.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 sm:block">
                    <dt className="text-sm text-ink/70">{f.label}</dt>
                    <dd className="text-right font-display text-lg sm:mt-1 sm:text-left font-semibold text-forest-800">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={path.href} className="btn-primary mt-7">
                {path.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
