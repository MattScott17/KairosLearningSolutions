"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import { FlipWords } from "@/components/aceternity/FlipWords";
import { site } from "@/lib/site";
import { heroPhotos } from "@/lib/photos";

const flipWords = ["learning", "reading", "math", "writing", "science"];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  // Slow, looping drift for the decorative arches (static for reduced motion).
  const drift = (distance: number, duration: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -distance, 0], rotate: [0, 2, 0] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="container-page grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            data-reveal=""
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700"
          >
            <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
            Serving Salinas since {site.foundedYear}
          </motion.span>

          <motion.h1
            data-reveal=""
            variants={item}
            className="mt-6 text-[2.6rem] font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Where students fall in love with{" "}
            <span className="relative block text-forest-600 sm:inline">
              <FlipWords words={flipWords} />
              <svg
                className="absolute -bottom-2 left-0 w-[min(100%,11rem)] text-gold-500 sm:w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C40 3 160 3 198 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p data-reveal="" variants={item} className="prose-kairos mt-7 max-w-xl text-lg">
            Kairos Learning Solutions is a Salinas tutoring and homeschool center built around one
            idea: meet every student where they are. Personalized tutoring, flexible homeschool
            support, and our full-time <strong className="text-forest-800">APEX</strong> program —
            all designed to raise confident, capable future world changers.
          </motion.p>

          <motion.div data-reveal="" variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn-primary">
              Explore our services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </motion.div>

          <motion.p data-reveal="" variants={item} className="mt-6 text-sm text-ink/60">
            In-person in Salinas &amp; online · All ages, early reading to AP
          </motion.p>
        </motion.div>

        {/* Arch photo collage — the arch is Kairos's recurring shape */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Decorative arches (desktop only) */}
          <motion.div
            aria-hidden
            className="absolute -right-6 top-6 hidden h-40 w-28 rounded-t-full bg-gold-500/90 lg:block"
            {...drift(14, 7)}
          />
          <motion.div
            aria-hidden
            className="absolute -left-10 bottom-24 hidden h-32 w-24 rounded-t-full bg-forest-200 lg:block"
            {...drift(10, 9)}
          />

          <motion.div
            data-reveal=""
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto aspect-[4/5] w-[85%] overflow-hidden arch shadow-soft lg:w-[78%]"
          >
            <Image
              src={heroPhotos.main.src}
              alt={heroPhotos.main.alt}
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 40vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            data-reveal=""
            initial={{ opacity: 0, y: reduce ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute -bottom-6 left-0 aspect-[3/4] w-[42%] overflow-hidden arch border-4 border-cream shadow-soft lg:w-[38%]"
          >
            <Image
              src={heroPhotos.secondary.src}
              alt={heroPhotos.secondary.alt}
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute right-0 top-8 hidden rounded-2xl bg-forest-800 px-4 py-3 text-cream shadow-soft sm:block lg:-right-3">
            <p className="text-xs uppercase tracking-wide text-forest-200">Now enrolling</p>
            <p className="font-display text-lg font-semibold">APEX · Grades 3–9</p>
          </div>
        </div>
      </div>
    </section>
  );
}
