import type { ReactNode } from "react";

type PageHeroProps = {
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Consistent interior-page header used across every non-home page. */
export function PageHero({ title, intro, children }: PageHeroProps) {
  return (
    <section className="bg-forest-900 pb-14 pt-32 text-cream sm:pb-16 sm:pt-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-cream sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
