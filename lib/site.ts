// Central business information — edit here to update it everywhere on the site.

export const site = {
  name: "Kairos Learning Solutions",
  shortName: "Kairos",
  // Old slogan. No longer shown anywhere on the site; kept in case the owner wants it back.
  tagline: "Raising Future World Changers",
  description:
    "Tutoring, homeschool support, classes, district partnerships and APEX, a full-time program for grades 3 to 9, at 836 South Main Street in Salinas, CA. Open since 2020.",
  url: "https://www.kairoslearningsolutions.com",
  foundedYear: 2020,
  phone: "(831) 500-2520",
  phoneHref: "tel:+18315002520",
  email: "jackie@kairoslearningsolutions.com",
  emailHref: "mailto:jackie@kairoslearningsolutions.com",
  address: {
    street: "836 South Main Street",
    city: "Salinas",
    state: "CA",
    zip: "93901",
    full: "836 South Main Street, Salinas, CA 93901",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=836+South+Main+Street+Salinas+CA+93901",
    embedUrl:
      "https://www.google.com/maps?q=836+South+Main+Street+Salinas+CA+93901&output=embed",
  },
  // Used for schema.org markup only. Double-check against the pin on Google Maps.
  geo: { latitude: 36.6694, longitude: -121.6553 },
  // Towns families drive in from. Used for schema.org areaServed only.
  areasServed: ["Salinas", "Monterey", "Seaside", "Marina", "Castroville", "Prunedale", "Gonzales"],
  // Same hours as below, in the shape schema.org wants. Keep the two in step.
  hoursSpec: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "17:15",
  },
  hours: [
    { day: "Monday – Thursday", time: "9:00 AM – 5:15 PM" },
    { day: "Friday", time: "By appointment" },
    { day: "Saturday – Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com/kairoslearningsolutions",
    facebook: "https://facebook.com/KairosLearningSolutions",
  },
  schoolCalendarUrl:
    "https://www.kairoslearningsolutions.com/_files/ugd/89a30a_c52f3d3ff26c4edb9169ed59a9097dc8.pdf",
  fallClassesDateRange: "August 5 – December 18, 2026",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Programs",
    href: "/services",
    children: [
      {
        label: "APEX",
        href: "/apex",
        description: "Full-time learning program",
      },
      {
        label: "Early Learners",
        href: "/early-learners",
        description: "Half-day program, TK – 2nd grade",
      },
      {
        label: "Private Tutoring",
        href: "/services/private-tutoring",
        description: "One-on-one help, all ages and subjects",
      },
      {
        label: "Homeschool Support",
        href: "/services/homeschool-support",
        description: "Flexible packages for homeschool families",
      },
      {
        label: "District Partnerships",
        href: "/district-partnerships",
        description: "Working with schools and districts",
      },
      {
        label: "Fall Classes",
        href: "/fall-classes",
        description: "Enrichment classes, August – December",
      },
      {
        label: "Summer",
        href: "/summer",
        description: "Summer program at Kairos",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
