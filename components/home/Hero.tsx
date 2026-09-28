"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { FlipWords } from "@/components/aceternity/FlipWords";
import { site } from "@/lib/site";
import { heroPhotos } from "@/lib/photos";

const flipWords = ["learning", "reading", "math", "writing", "science"];

/** `banner` is the announcement card, rendered on the server and passed in. */
export function Hero({ banner }: { banner?: ReactNode }) {
  return (
    <section className="pt-24 sm:pt-28">
      {banner}
      <div className="container-page grid items-center gap-12 py-10 lg:grid-cols-[1.1fr_1fr] lg:py-14">
        <div>
          {/* "Fall in love with learning" is Jackie's own phrase; the last word cycles through subjects. */}
          <h1 className="text-[2.6rem] font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Where students fall in love with{" "}
            <span className="block text-forest-700 sm:inline">
              <FlipWords words={flipWords} />
            </span>
          </h1>

          <p className="prose-kairos mt-7 max-w-xl text-lg">
            I&apos;m Jackie Scott. I taught grades 3 through 12 for more than 30 years, and in{" "}
            {site.foundedYear} I opened Kairos on South Main Street so kids in Salinas could learn at
            their own pace. We tutor every subject from early reading to AP, run an after-school
            homework club, support homeschool families, and teach{" "}
            <Link href="/apex" className="font-semibold text-forest-800 underline underline-offset-4">
              APEX
            </Link>
            , our full-time program for grades 3 to 9.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn-primary">
              See programs and prices
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>

          <p className="mt-6 text-sm text-ink/60">
            {site.address.street}, {site.address.city} · In person or online
          </p>
        </div>

        {/* Two real photos, slightly overlapped */}
        <div className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-[85%] overflow-hidden rounded-lg lg:w-[80%]">
            <Image
              src={heroPhotos.main.src}
              alt={heroPhotos.main.alt}
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-[3/4] w-[42%] overflow-hidden rounded-lg border-4 border-white lg:w-[38%]">
            <Image
              src={heroPhotos.secondary.src}
              alt={heroPhotos.secondary.alt}
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
