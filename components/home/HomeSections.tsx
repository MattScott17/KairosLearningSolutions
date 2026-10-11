import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import Link from "next/link";
import { getTestimonials, testimonials, values } from "@/lib/content";
import { galleryPhotos, photos, type Photo } from "@/lib/photos";
import { conceptB } from "@/lib/storybrand";

/** Sections shared by both homepages (/ and /classic), liked from the other drafts. */

export function PhotosFromKairos({ exclude = [] }: { exclude?: Photo[] }) {
  return (
    <Section className="hidden overflow-hidden !py-12 sm:block sm:!py-16">
      <SectionHeading title="Photos from Kairos" />
      <div
        className="mt-8 grid gap-4 sm:grid-cols-3"
        role="group"
        aria-label="Photos from Kairos"
      >
        {galleryPhotos.filter((p) => !exclude.some((e) => e.src === p.src)).slice(0, 3).map((photo, i) => (
          <div
            key={photo.src + i}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 33vw, 24rem"
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
  const spotlight = getTestimonials(["jocelyn-w", "molly-b"]);
  return (
    <section className="bg-sand/50 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title="How to get started" />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
        <ol className="max-w-2xl space-y-6">
          {conceptB.plan.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4">
              <span aria-hidden="true" className="font-display text-4xl font-semibold leading-none text-forest-700">
                {i + 1}
              </span>
              <p className="text-lg leading-relaxed text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-ink/80">
          Prefer to write first?{" "}
          <Link href="/contact" className="link-underline inline-flex min-h-11 items-center">
            Fill out the interest form
          </Link>
        </p>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg lg:block">
            <Image
              src={photos.presenting.src}
              alt={photos.presenting.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="container-page mt-20">
        <h3 className="mb-6 font-display text-2xl font-semibold text-forest-900 sm:text-3xl">What parents say</h3>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {spotlight.map((review) => (
            <figure key={review.id} className="rounded-lg border border-forest-100 bg-cream p-5">
              <blockquote className="text-lg leading-relaxed text-ink">
                &ldquo;{review.pull}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-forest-800">
                {review.author} · {review.role}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
          <Link href="/about#reviews" className="link-underline inline-flex min-h-11 items-center text-sm">
            Read all {testimonials.length} parent reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
