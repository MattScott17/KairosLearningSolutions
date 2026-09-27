"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TabBar } from "@/components/aceternity/TabBar";
import type { Photo } from "@/lib/photos";

export type Path = {
  id: string;
  /** Finishes the sentence "My student needs…" */
  need: string;
  program: string;
  summary: string;
  facts: { label: string; value: string }[];
  href: string;
  cta: string;
  photo: Photo;
};

/** "My student needs…" → the matching program, one tab at a time. */
export function PathFinder({ paths }: { paths: Path[] }) {
  const [active, setActive] = useState(paths[0].id);
  const reduce = useReducedMotion();
  const path = paths.find((p) => p.id === active) ?? paths[0];
  const panelId = "path-finder-panel";

  return (
    <div>
      <p className="text-center font-display text-xl font-semibold text-forest-900 sm:text-2xl">
        My student needs…
      </p>
      <TabBar
        tabs={paths.map((p) => ({ id: p.id, label: p.need }))}
        active={active}
        onChange={setActive}
        panelId={panelId}
        label="What does your student need?"
        className="mt-5"
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${panelId}-tab-${path.id}`}
        className="mt-8 rounded-lg border border-forest-100 bg-cream p-5 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-10"
          >
            <div className="arch relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
              <Image
                src={path.photo.src}
                alt={path.photo.alt}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold">{path.program}</h3>
              <p className="prose-kairos mt-3">{path.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-forest-100 pt-5 sm:grid-cols-3">
                {path.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-ink/60">{f.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-forest-800">{f.value}</dd>
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
