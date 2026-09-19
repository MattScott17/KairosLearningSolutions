import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  container?: "page" | "narrow" | "none";
};

const containers = {
  page: "container-page",
  narrow: "container-narrow",
  none: "",
};

export function Section({ children, id, className = "", container = "page" }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      {container === "none" ? children : <div className={containers[container]}>{children}</div>}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-gold-500" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {intro && <p className="prose-kairos mt-4 text-lg">{intro}</p>}
    </div>
  );
}
