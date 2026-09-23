// Central business information — edit here to update it everywhere on the site.

export const site = {
  name: "Kairos Learning Solutions",
  shortName: "Kairos",
  tagline: "Raising Future World Changers",
  description:
    "Personalized tutoring, homeschool support, and full-time learning in Salinas, CA. Since 2020, Kairos has helped students of every age fall in love with learning.",
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
  hours: [
    { day: "Monday – Thursday", time: "9:00 AM – 5:15 PM" },
    { day: "Friday", time: "By appointment" },
    { day: "Saturday – Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com/kairoslearningsolutions",
    facebook: "https://facebook.com/KairosLearningSolutions",
  },
  // External Google Doc catalog for the current school-year classes.
  fallCatalogUrl:
    "https://docs.google.com/document/d/1jqaFeqlDoqSls0R64jbl9jZCzxNmYm6_-wjmyh9NbRg/edit?usp=sharing",
  fallRegistrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe4JbmI3AB3jjjCsNns9YKmtvjzEwnGiw_nP6ikyrSzIihexA/viewform?usp=header",
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
  { label: "APEX", href: "/apex" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Private Tutoring",
        href: "/services/private-tutoring",
        description: "One-on-one help, all ages and subjects",
      },
      {
        label: "Homework Club",
        href: "/services/homework-club",
        description: "After-school homework support",
      },
      {
        label: "Homeschool Support",
        href: "/services/homeschool-support",
        description: "Flexible packages for homeschool families",
      },
    ],
  },
  { label: "Classes", href: "/fall-classes" },
  { label: "Summer", href: "/summer" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
