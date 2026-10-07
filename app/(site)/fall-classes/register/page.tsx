import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { RegistrationForm } from "@/components/RegistrationForm";
import { registrationFees } from "@/lib/content";
import { registrationOptions } from "@/lib/registration";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Fall 2026 Registration",
    description:
      "Register for Fall 2026 at Kairos in Salinas, CA: APEX, homeschool support, tutoring, early learners and fall classes. Spots are first come, first served.",
    path: "/fall-classes/register",
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ class?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const requested = (await searchParams).class;
  const initialClass = registrationOptions.some((o) => o.id === requested) ? requested : undefined;

  return (
    <>
      <PageHero
        title="Fall 2026 registration"
        mark="registration"
        intro={
          <>
            Fill this out once for each family, with up to three students. Spots are first come, first served.
            Rather do it on the phone? Call{" "}
            <a href={site.phoneHref} className="link-underline inline-block py-2 -my-2">
              {site.phone}
            </a>{" "}
            and we&apos;ll do it together.
          </>
        }
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <p className="mb-8 rounded-lg bg-sand px-5 py-4 text-sm text-ink/80 lg:hidden">
              Registration fees are listed above the Submit button. Charter school details are below the form.
            </p>
            <RegistrationForm initialClass={initialClass} fees={registrationFees} />
          </div>

          <aside>
            <div className="rounded-lg bg-sand p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Good to know</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-forest-900">Questions?</dt>
                  <dd className="mt-1 text-ink/80">
                    <a href={site.phoneHref} className="link-underline inline-flex min-h-11 items-center">
                      Call {site.phone}
                    </a>
                    <br />
                    <a href={site.emailHref} className="link-underline inline-flex min-h-11 items-center">
                      Send us an email
                    </a>
                  </dd>
                </div>
                <div className="hidden lg:block">
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
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
