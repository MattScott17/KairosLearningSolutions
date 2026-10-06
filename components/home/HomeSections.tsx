import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import Link from "next/link";
import { getTestimonials, testimonials, values } from "@/lib/content";
import { galleryPhotos } from "@/lib/photos";
import { conceptB } from "@/lib/storybrand";

/** Sections shared by both homepages (/ and /classic), liked from the other drafts. */

export function PhotosFromKairos() {
  return (
    <Section className="overflow-hidden !py-12 sm:!py-16">
      <SectionHeading title="Photos from Kairos" />
      <div
        className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6"
        tabIndex={0}
        role="region"
        aria-label="Photos from Kairos, scroll sideways"
      >
        {galleryPhotos.map((photo, i) => (
          <div
            key={photo.src + i}
            className="relative aspect-[4/3] w-[75vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-lg sm:w-80"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 75vw, 20rem"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HowWeTeach() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-3xl font-semibold sm:text-4xl">How we teach</h2>
        <dl className="border-t border-forest-200">
          {values.map((value) => (
            <div
              key={value.title}
              className="grid gap-1 border-b border-forest-100 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
            >
              <dt className="font-semibold text-forest-900">{value.title}</dt>
              <dd className="prose-kairos">{value.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/** Three simple steps that flow into a parent quote. */
export function GetStarted() {
  const [spotlight] = getTestimonials(["melissa-c"]);
  return (
    <section className="bg-sand/50 py-16 sm:py-24">
      <div className="container-narrow">
        <SectionHeading title="How to get started" />
        <div className="mt-10 space-y-8 border-l-2 border-forest-200 pl-8">
          {conceptB.plan.map((step, i) => (
            <div key={step} className="relative">
              <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 font-display text-sm font-semibold text-cream">
                {i + 1}
              </span>
              <p className="prose-kairos text-lg">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page mx-auto mt-20 max-w-2xl text-center">
        <blockquote className="text-2xl leading-relaxed text-ink/85">&ldquo;{spotlight.pull}&rdquo;</blockquote>
        <p className="mt-5 text-sm font-semibold text-forest-800">
          {spotlight.author} · {spotlight.role}
        </p>
        <Link href="/about#reviews" className="link-underline mt-4 inline-block text-sm">
          Read all {testimonials.length} parent reviews
        </Link>
      </div>
    </section>
  );
}
