"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProgramList } from "@/lib/content";
import { programPhotos } from "@/lib/photos";

const rows = getProgramList();

/**
 * Every program on one list: who it's for, when it runs, what it costs.
 * On desktop a photo column beside the list swaps to whichever program is hovered
 * or focused; on phones each row carries a small photo instead.
 */
export function ProgramList() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(rows[0].href);
  const photo = programPhotos[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_15rem]">
      <div className="border-t border-forest-200">
        <div className="hidden grid-cols-[1.2fr_1fr_1.4fr_1fr_auto] gap-6 border-b border-forest-100 px-2 py-3 text-xs font-semibold text-ink/55 md:grid">
          <span>Program</span>
          <span>For</span>
          <span>When</span>
          <span>Price</span>
          <span className="w-4" />
        </div>
        <ul>
          {rows.map((row) => {
            const thumb = programPhotos[row.href];
            return (
              <li key={row.name} className="border-b border-forest-100">
                <Link
                  href={row.href}
                  onMouseEnter={() => setActive(row.href)}
                  onFocus={() => setActive(row.href)}
                  className="group grid grid-cols-[4rem_1fr] gap-x-4 gap-y-1 py-5 transition-colors hover:bg-forest-50/70 md:grid-cols-[1.2fr_1fr_1.4fr_1fr_auto] md:items-center md:gap-6 md:px-2"
                >
                  {thumb && (
                    <span className="relative row-span-4 h-16 w-16 overflow-hidden rounded-md md:hidden">
                      <Image src={thumb.src} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                  )}
                  <span className="font-display text-xl font-semibold text-forest-900 transition-colors group-hover:text-forest-700">
                    {row.name}
                  </span>
                  <span className="text-sm text-ink/75">{row.who}</span>
                  <span className="text-sm text-ink/75">{row.when}</span>
                  <span className="text-sm font-semibold text-forest-800">{row.price}</span>
                  <ArrowRight className="hidden h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Photo column (desktop): follows whichever program is hovered or focused */}
      <div aria-hidden className="hidden lg:block">
        <div className="sticky top-28 aspect-[3/4] overflow-hidden rounded-lg">
          <AnimatePresence initial={false}>
            {photo && (
              <motion.div
                key={photo.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                <Image src={photo.src} alt="" fill sizes="240px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
