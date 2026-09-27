import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { photos } from "@/lib/photos";
import { CTASection } from "@/components/CTASection";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Google reviews from Kairos Learning Solutions families in Salinas, CA, about tutoring, homeschool support, Early Learners and APEX, quoted in full.",
};

export default function TestimonialsPage() {
  const featured = testimonials.find((t) => t.id === "melissa-d") ?? testimonials[0];

  return (
    <>
      <PageHero
        title="Reviews from Kairos families"
        intro={`These are ${testimonials.length} Google reviews from Kairos parents and grandparents, quoted word for word. Names are shortened to a last initial.`}
      />

      {/* Featured story, with a real photo, before the full wall of quotes */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={photos.smallGroup.src}
                alt={photos.smallGroup.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <blockquote className="font-display text-2xl leading-snug text-forest-900 sm:text-3xl">
              “{featured.pull}”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-forest-800">
              {featured.author} <span className="font-normal text-ink/60">· {featured.role}</span>
            </p>
          </div>
        </div>
      </Section>

      {/* A moving sample of every review before the full wall */}
      <section className="overflow-hidden pb-4">
        <ReviewMarquee />
      </section>

      <Section className="bg-sand/50">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t) => (
            <div key={t.id}>
              <figure className="rounded-lg border border-forest-100 bg-cream p-7">
                <blockquote className="text-lg leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-forest-100 pt-4 text-sm">
                  <span className="font-semibold text-forest-800">{t.author}</span>
                  <span className="block text-ink/60">
                    {t.role}
                    {t.source && <> · {t.source} review</>}
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
