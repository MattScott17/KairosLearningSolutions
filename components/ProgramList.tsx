import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProgramList } from "@/lib/content";

/** Every program on one list: who it's for, when it runs, what it costs. */
export function ProgramList() {
  const rows = getProgramList();
  return (
    <div className="border-t border-forest-200">
      <div className="hidden grid-cols-[1.2fr_1fr_1.4fr_1fr_auto] gap-6 border-b border-forest-100 py-3 text-xs font-semibold text-ink/55 md:grid">
        <span>Program</span>
        <span>For</span>
        <span>When</span>
        <span>Price</span>
        <span className="w-4" />
      </div>
      <ul>
        {rows.map((row) => (
          <li key={row.name} className="border-b border-forest-100">
            <Link
              href={row.href}
              className="group grid gap-1 py-5 transition-colors hover:bg-forest-50/60 md:grid-cols-[1.2fr_1fr_1.4fr_1fr_auto] md:items-center md:gap-6 md:px-2"
            >
              <span className="font-display text-xl font-semibold text-forest-900">{row.name}</span>
              <span className="text-sm text-ink/75">{row.who}</span>
              <span className="text-sm text-ink/75">{row.when}</span>
              <span className="text-sm font-semibold text-forest-800">{row.price}</span>
              <ArrowRight className="hidden h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1 md:block" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
