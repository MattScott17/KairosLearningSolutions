import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pathways } from "@/lib/content";
import { photos } from "@/lib/photos";

/** The four ways to work with Kairos: APEX, tutoring, homeschool support and classes, districts. */
export function Pathways({
  title = "Four ways to work with Kairos",
  intro = "Every program starts with a call. Tell us about your student or your school and we'll point you to the right one.",
  className = "",
}: {
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <Section className={className}>
      <SectionHeading title={title} intro={intro} />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pathways.map((p) => (
          <li key={p.title}>
            <Link
              href={p.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-forest-100 bg-cream transition-colors hover:border-forest-300"
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={photos[p.photo].src}
                  alt={photos[p.photo].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-display text-xl font-semibold text-forest-900">{p.title}</span>
                <span className="prose-kairos mt-2 flex-1 text-sm">{p.body}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                  {p.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
