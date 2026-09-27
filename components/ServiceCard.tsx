import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceRowProps = {
  href: string;
  title: string;
  short: string;
  summary: string;
};

/** One program as a divided list row: name and one-liner on the left, summary on the right. */
export function ServiceCard({ href, title, short, summary }: ServiceRowProps) {
  return (
    <li className="border-b border-forest-100">
      <Link
        href={href}
        className="group grid gap-2 py-6 transition-colors hover:bg-forest-50/60 md:grid-cols-[1fr_1.6fr] md:gap-10 md:px-2"
      >
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-forest-900">
            {title}
            <ArrowRight className="h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1" />
          </h3>
          <p className="mt-1 text-sm text-ink/60">{short}</p>
        </div>
        <p className="prose-kairos">{summary}</p>
      </Link>
    </li>
  );
}
