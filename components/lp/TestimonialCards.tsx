import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/lib/content";

export function TestimonialCards({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={t.author} delay={i * 0.08}>
          <figure className="flex h-full flex-col rounded-3xl bg-cream p-7 shadow-card">
            <Quote className="h-7 w-7 text-forest-300" />
            <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink/85">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 border-t border-forest-100 pt-4 text-sm">
              <span className="font-semibold text-forest-800">{t.author}</span>
              <span className="block text-ink/60">{t.role}</span>
              {t.result && <span className="mt-1 block text-forest-700">{t.result}</span>}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
