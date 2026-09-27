import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";

/** The row of headline numbers; countable stats animate up on scroll. */
export function StatsBar({ className }: { className?: string }) {
  return (
    <section className={cn("border-y border-forest-100", className)}>
      <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-forest-100 pl-4">
            <dd className="font-display text-3xl font-semibold text-forest-800 lg:text-4xl">
              {stat.count != null ? <CountUp to={stat.count} suffix={stat.suffix} /> : stat.value}
            </dd>
            <dt className="mt-1 text-sm text-ink/65">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
