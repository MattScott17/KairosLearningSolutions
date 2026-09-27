"use client";

// Adapted from Aceternity UI "Flip Words" (https://ui.aceternity.com/components/flip-words),
// free tier. Changes: framer-motion import, brand colors, first word rendered statically on
// the server (no hidden text before hydration), reduced motion = no cycling, width reserved
// for the longest word so the headline never reflows, and a screen-reader-friendly label.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FlipWordsProps = {
  words: string[];
  duration?: number;
  className?: string;
};

export function FlipWords({ words, duration = 2800, className }: FlipWordsProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // False until the first flip, so the server-rendered first word is fully visible.
  const [cycled, setCycled] = useState(false);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => {
      setCycled(true);
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [reduce, words.length, duration]);

  const word = words[index];

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      {/* Screen readers get one stable word, not a letter-by-letter stream. */}
      <span className="sr-only">{words[0]}</span>

      {/* Invisible copies of every word reserve the width of the longest one. */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={cycled ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {word.split("").map((letter, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={cycled ? { opacity: 0, y: 8, filter: "blur(6px)" } : false}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
