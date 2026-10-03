import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, type FaqItem } from "@/lib/seo";

/** Visible question list plus matching FAQPage markup, both from the same items. */
export function Faq({ items, title = "Common questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <Section container="narrow">
      <JsonLd data={faqJsonLd(items)} />
      <SectionHeading title={title} />
      <div className="mt-8 divide-y divide-forest-100 border-y border-forest-100">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-display text-xl font-semibold text-forest-900 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-600 [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-forest-600 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="prose-kairos mt-3 text-lg">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
