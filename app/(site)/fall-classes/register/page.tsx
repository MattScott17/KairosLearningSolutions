import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { RegistrationForm } from "@/components/RegistrationForm";
import { registrationFees } from "@/lib/content";
import { registrationOptions } from "@/lib/registration";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fall 2026 Registration",
  description:
    "Register for Fall 2026 at Kairos in Salinas, CA: APEX, homeschool support, tutoring, early learners and fall classes. Spots are first come, first served.",
};

type Props = { searchParams: Promise<{ class?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const requested = (await searchParams).class;
  const initialClass = registrationOptions.some((o) => o.id === requested) ? requested : undefined;

  return (
    <>
      <PageHero
        title="Fall 2026 registration"
        intro="Fill this out once for each family, with up to three students. It saves your student's spot, and spots are first come, first served. Rather do it on the phone? Call me and we'll do it together."
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <RegistrationForm initialClass={initialClass} />

          <aside className="order-first lg:order-none">
            <div className="rounded-lg bg-sand p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Good to know</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-forest-900">Registration fees</dt>
                  <dd className="mt-1 space-y-1 text-ink/80">
                    {registrationFees.map((f) => (
                      <p key={f.label} className="flex justify-between gap-3">
                        <span>{f.label}</span>
                        <span className="shrink-0 font-semibold text-forest-800">{f.value}</span>
                      </p>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-900">Charter school funds</dt>
                  <dd className="mt-1 text-ink/80">Let your ES know. Nothing is due until the charter approves it.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-900">Class sizes</dt>
                  <dd className="mt-1 text-ink/80">Each class needs a minimum number of students to run.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-900">Questions?</dt>
                  <dd className="mt-1 text-ink/80">
                    Call{" "}
                    <a href={site.phoneHref} className="link-underline">
                      {site.phone}
                    </a>{" "}
                    or{" "}
                    <a href={site.emailHref} className="link-underline">
                      email Jackie
                    </a>
                    .
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
