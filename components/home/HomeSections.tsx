import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import Link from "next/link";
import { getTestimonials, testimonials, values } from "@/lib/content";
import { galleryPhotos, photos } from "@/lib/photos";
import { conceptB } from "@/lib/storybrand";

/** Sections shared by both homepages (/ and /classic), liked from the other drafts. */

export function PhotosFromKairos() {
  return (
    <Section className="overflow-hidden !py-12 sm:!py-16">
      <SectionHeading title="Photos from Kairos" intro="Students at work in our Salinas center." />
      <div
        className="-mx-5 mt-8 flex scroll-px-5 snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
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
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">How we teach</h2>
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-lg lg:block">
            <Image
              src={photos.homework.src}
              alt={photos.homework.alt}
              fill
              sizes="(min-width: 1024px) 28rem, 0px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
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
      <div className="container-page">
        <SectionHeading title="How to get started" />
        <ol className="mt-10 max-w-2xl space-y-6">
          {conceptB.plan.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4">
              <span aria-hidden="true" className="font-display text-4xl font-semibold leading-none text-forest-700">
                {i + 1}
              </span>
              <p className="prose-kairos text-lg">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-page mx-auto mt-20 max-w-2xl text-center">
        <blockquote className="font-display text-2xl italic leading-relaxed text-forest-800 sm:text-3xl">&ldquo;{spotlight.pull}&rdquo;</blockquote>
        <p className="mt-5 text-sm font-semibold text-forest-800">
          {spotlight.author} · {spotlight.role}
        </p>
        <Link href="/about#reviews" className="link-underline mt-2 inline-flex min-h-11 items-center text-sm">
          Read all {testimonials.length} parent reviews
        </Link>
      </div>
    </section>
  );
}
