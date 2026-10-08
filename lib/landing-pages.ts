// Directory of every landing page, rendered at /landingpages. When you add a
// landing page, add one entry here so the team can find it.

import { variantMeta, variantSlugs, type ProgramSlug } from "@/lib/landing-variants";

export type LandingPageEntry = {
  href: string;
  label: string;
  description: string;
  tags: string[];
};

export type LandingPageGroup = {
  program: string;
  intro: string;
  pages: LandingPageEntry[];
};

function offerVariants(program: ProgramSlug): LandingPageEntry[] {
  return variantSlugs.map((v) => ({
    href: `/lp/${program}/${v}`,
    label: `${program === "apex" ? "APEX" : "Tutoring"}, ${variantMeta[v].label}`,
    description: variantMeta[v].pitch,
    tags: ["Offer-first", "No nav", "Mobile-first"],
  }));
}

function originals(program: ProgramSlug, name: string): LandingPageEntry[] {
  return [
    {
      href: `/lp/${program}`,
      label: "Original, no nav",
      description: `The first ${name} ad page: headline, pain points, proof strip, and callback form, with no site navigation.`,
      tags: ["Original", "No nav"],
    },
    {
      href: `/lp/${program}-site`,
      label: "Original, with site nav",
      description: `Same content as the original ${name} page, wrapped in the full site header and footer.`,
      tags: ["Original", "Site nav"],
    },
  ];
}

export const landingPageGroups: LandingPageGroup[] = [
  {
    program: "Private Tutoring",
    intro: "One-on-one tutoring, all ages and subjects. Every page books a free consultation call.",
    pages: [...offerVariants("tutoring"), ...originals("tutoring", "tutoring")],
  },
  {
    program: "APEX",
    intro: "The full-time program for grades 3 to 9. Every page books a free APEX call and tour.",
    pages: [...offerVariants("apex"), ...originals("apex", "APEX")],
  },
  {
    program: "Homepage options",
    intro: "The live homepage and the original one, kept as a backup.",
    pages: [
      {
        href: "/",
        label: "Live homepage",
        description: "The live homepage. Parents pick what their student needs and see the matching program.",
        tags: ["Homepage", "Site nav"],
      },
      {
        href: "/classic",
        label: "Original homepage",
        description: "The first homepage, kept as an alternate. Same content, laid out with the full program list and APEX up front.",
        tags: ["Homepage alternate", "Site nav"],
      },
    ],
  },
];
