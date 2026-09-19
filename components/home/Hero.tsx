"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import { site } from "@/lib/site";

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      {/* soft brand backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(124,179,66,0.16), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(224,162,60,0.10), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container-page grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700"
          >
            <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
            Serving Salinas since {site.foundedYear}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Where students fall{" "}
            <span className="relative whitespace-nowrap text-forest-600">
              in love
              <svg
                className="absolute -bottom-2 left-0 w-full text-gold-500"
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
            </span>{" "}
            with learning
          </motion.h1>

          <motion.p variants={item} className="prose-kairos mt-6 max-w-xl text-lg">
            Kairos Learning Solutions is a Salinas tutoring and homeschool center built around one
            idea: meet every student where they are. Personalized tutoring, flexible homeschool
            support, and our full-time <strong className="text-forest-800">APEX</strong> program —
            all designed to raise confident, capable future world changers.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn-primary">
              Explore our services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-sm text-ink/60">
            In-person in Salinas &amp; online · All ages, early reading to AP
          </motion.p>
        </motion.div>

        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl shadow-soft sm:aspect-[5/5]">
            <Image
              src="/images/photo-1.jpg"
              alt="Students learning at Kairos Learning Solutions"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-48 rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-forest-100 sm:block">
            <p className="font-display text-3xl font-semibold text-forest-800">30+ yrs</p>
            <p className="mt-1 text-xs text-ink/60">of teaching experience leading the way</p>
          </div>
          <div className="absolute -right-3 top-8 hidden rounded-2xl bg-forest-800 px-4 py-3 text-cream shadow-soft sm:block">
            <p className="text-xs uppercase tracking-wide text-forest-200">Now enrolling</p>
            <p className="font-display text-lg font-semibold">APEX · Grades 3–9</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
