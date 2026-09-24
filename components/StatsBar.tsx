import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";

/** The trust bar of headline numbers; countable stats animate up on scroll. */
export function StatsBar({ className }: { className?: string }) {
  return (
    <section className={cn("border-y border-forest-100 bg-cream/60", className)}>
      <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <Icon className="h-6 w-6 text-forest-500" aria-hidden />
              <p className="mt-2 font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
                {stat.count != null ? <CountUp to={stat.count} suffix={stat.suffix} /> : stat.value}
              </p>
              <p className="mt-0.5 text-xs text-ink/60">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
