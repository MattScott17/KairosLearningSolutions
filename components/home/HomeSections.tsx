import { ParallaxGallery } from "@/components/ParallaxGallery";
import { Section, SectionHeading } from "@/components/ui/Section";
import Link from "next/link";
import { getTestimonials, testimonials, values } from "@/lib/content";
import { galleryPhotos } from "@/lib/photos";
import { conceptB } from "@/lib/storybrand";

/** Sections shared by both homepages (/ and /classic), liked from the other drafts. */

export function PhotosFromKairos() {
  return (
    <Section className="overflow-hidden">
      <SectionHeading title="Photos from Kairos" />
      <div className="mt-12">
        <ParallaxGallery photos={galleryPhotos} />
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
