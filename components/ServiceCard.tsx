import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-forest-100 bg-cream p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-soft"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700 transition-colors group-hover:bg-forest-800 group-hover:text-cream">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-forest-600">{service.short}</p>
      <p className="prose-kairos mt-3 flex-1 text-sm">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
