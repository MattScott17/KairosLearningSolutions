import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

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
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ title, intro, center = false, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {intro && <p className="prose-kairos mt-4 text-lg">{intro}</p>}
    </Reveal>
  );
}
