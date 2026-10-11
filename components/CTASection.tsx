import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import { site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  photo?: Photo;
};

/** Closing contact band: the phone number big, plus where we are and when we're open. */
export function CTASection({
  title = "Call us, or fill out the interest form",
  intro = "Tell us about your student and we will suggest a tutor or a program and what it costs.",
  primaryLabel = "Fill out the interest form",
  primaryHref = "/contact",
  photo,
}: CTASectionProps) {
  return (
    <section className="border-t border-forest-100 bg-sand py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="prose-kairos mt-4 max-w-xl text-lg">{intro}</p>
          <a
            href={site.phoneHref}
            className="mt-6 inline-block py-1.5 font-display text-4xl font-semibold text-forest-700 underline decoration-forest-300 decoration-2 underline-offset-8 hover:decoration-forest-700 sm:text-5xl"
          >
            {site.phone}
          </a>
          <div className="mt-6">
            <Link href={primaryHref} className="btn-outline w-full sm:w-auto">
              {primaryLabel}
            </Link>
          </div>
        </div>
        <div>
          {photo && (
            <div className="relative mb-6 hidden aspect-[16/10] overflow-hidden rounded-lg lg:block">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="30vw"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          )}
          <div className="text-sm text-ink/85">
            <p className="font-semibold text-forest-900">Hours</p>
            <p className="mt-1">Monday to Thursday, 9:00 AM to 6:00 PM</p>
            <p>Friday by appointment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
