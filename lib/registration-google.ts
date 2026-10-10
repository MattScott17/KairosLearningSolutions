// Copies a site registration into Jackie's "2026 Fall Kairos Student Registration" Google Form,
// so answers land in the same response sheet as before. Server-only.
//
// This only works while the form accepts responses without a Google sign-in. With "Collect
// email addresses" set to "Verified", Google answers 401 and the registration arrives only by
// email (see app/api/register/route.ts).

import { registrationOptions, type ChildInput, type RegistrationInput } from "@/lib/registration";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe4JbmI3AB3jjjCsNns9YKmtvjzEwnGiw_nP6ikyrSzIihexA/formResponse";

const PARENT = {
  lastName: "entry.1960818785",
  firstName: "entry.224645679",
  email: "entry.1294643979",
  phone: "entry.125483743",
};

type ChildEntries = Record<Exclude<keyof ChildInput, "classes">, string> & {
  classes: string;
  addAnother?: string;
};

// One block per "child" section of the form, in order. The third has no "add another" question.
const CHILDREN: ChildEntries[] = [
  {
    lastName: "entry.361867226",
    firstName: "entry.1770494982",
    age: "entry.999381002",
    grade: "entry.516852348",
    school: "entry.331009413",
    phone: "entry.414994217",
    email: "entry.2139796137",
    goals: "entry.1499415917",
    concerns: "entry.1046901784",
    health: "entry.913407468",
    classes: "entry.220577507",
    addAnother: "entry.1718281151",
  },
  {
    lastName: "entry.1105567754",
    firstName: "entry.1065367859",
    age: "entry.231405840",
    grade: "entry.1721182005",
    school: "entry.2112451124",
    phone: "entry.1184404483",
    email: "entry.1272998897",
    goals: "entry.2043169764",
    concerns: "entry.1983632557",
    health: "entry.2088955442",
    classes: "entry.1751182673",
    addAnother: "entry.1114146412",
  },
  {
    lastName: "entry.1467683651",
    firstName: "entry.64804857",
    age: "entry.904545699",
    grade: "entry.912657116",
    school: "entry.458520623",
    phone: "entry.1106936520",
    email: "entry.675971217",
    goals: "entry.437496093",
    concerns: "entry.1945564524",
    health: "entry.1748248416",
    classes: "entry.656284590",
  },
];

// The checkbox wording differs slightly between the three child sections on the Google Form,
// and Google only accepts an exact match, so each section's options are copied verbatim.
// The first option must match the Google Form's wording exactly. It still says 2 Hour Learning, so edit
// the option on the Google Form itself, then change it here to match.
const COMMON_OPTIONS = [
  "APEX: Powered by 2 Hour Learning (Grades 3 - 9, M - Th, 9:00 am - 2:00 pm)",
  "8th Grade Leadership",
  "Kairos TK/Kinder ( TU, WED, TH, 9 am -12 pm)",
  "Kairos First Grade ( TU, WED, TH, 9 am -12 pm)",
  "Kairos Second Grade ( TU & TH, 10 am -12 pm)",
  "K-2 Learning Lab, Reading and Writing ( Monday, 9 am - 10 am)",
  "K-2 Learning Lab, Math & Science ( Monday, 10 am - 11 am)",
  "K-2 Learning Lab, Art, Music & Enrichment ( Monday, 11 am - 12pm)",
  "K-2 Learning Lab Bundle ( Monday 9 am -12 pm)",
  "Nature Journaling, Mini Makers ( Grades 3 to 6, Monday, 11 am -12pm, Sept 14-Oct 19)",
  "Visual Arts, Mini Makers ( Grades 3 to 6, Monday, 11-12pm, Oct 26-Nov 30)",
  "Writing Lab A (Grades 3 & 4 Wednesday, 10 am- 11am, )",
  "Writing Lab B (Grades 5 to 7 Wednesday, 11 am-12pm)",
  "Book to Life: Charlotte's Web (Grades 1-3, Wednesday, 12:30pm - 2 pm,  9/30-10/28)",
  "Book to Life: Winnie the Pooh ( Grades 1-3, Wednesday, 12:30pm-2pm, 11/4-12/16)",
  "Homeschool Support (Grades 3 - 12, M - Th, 9 am - 2 pm, choose days and times)",
  "Tutoring (All ages, M - F, 9 am - 8 pm, to be scheduled)",
];
const IMAGINATION_LAB = "Imagination Lab (Grades K-3, Wednesday, 10:30 am-11:30 am)";
const CHILD_OPTIONS: string[][] = [
  [...COMMON_OPTIONS, "Express & Connect Lab (Grades 1-6 Tuesdays, 12:30pm - 1:30pm)"],
  [...COMMON_OPTIONS, IMAGINATION_LAB, "Express & Connect Lab (Grades 3-6, Wednesday, 1 pm -  2pm)"],
  [...COMMON_OPTIONS, IMAGINATION_LAB, "Express & Connect Lab (Grades 3-6, Wednesday, 1 pm - 2 pm)"],
];

// The first child's grade dropdown spells it "kinder"; the others use "Kinder".
const gradeFor = (grade: string, childIndex: number) =>
  childIndex === 0 && grade === "Kinder" ? "kinder" : grade;

export function toGoogleFormBody(data: RegistrationInput): URLSearchParams {
  const body = new URLSearchParams();
  const { parent, children } = data;

  body.append("emailAddress", parent.email);
  body.append(PARENT.lastName, parent.lastName);
  body.append(PARENT.firstName, parent.firstName);
  body.append(PARENT.email, parent.email);
  body.append(PARENT.phone, parent.phone);

  children.forEach((child, i) => {
    const entries = CHILDREN[i];
    body.append(entries.lastName, child.lastName);
    body.append(entries.firstName, child.firstName);
    body.append(entries.age, child.age);
    body.append(entries.grade, gradeFor(child.grade, i));
    for (const key of ["school", "phone", "email", "goals", "concerns", "health"] as const) {
      if (child[key]) body.append(entries[key], child[key]);
    }

    // Anything this section has no checkbox for goes in its "Other" box.
    const unmatched: string[] = [];
    for (const id of child.classes) {
      const option = registrationOptions.find((o) => o.id === id)!;
      const googleText = CHILD_OPTIONS[i].find((t) => t.startsWith(option.googleKey));
      if (googleText) body.append(entries.classes, googleText);
      else unmatched.push(`${option.label} (${option.detail})`);
    }
    if (unmatched.length) {
      body.append(entries.classes, "__other_option__");
      body.append(`${entries.classes}.other_option_response`, unmatched.join("; "));
    }

    if (entries.addAnother) body.append(entries.addAnother, i < children.length - 1 ? "Yes" : "No");
  });

  // Sections visited: intro (0), parent (1), then one per child.
  body.append("pageHistory", Array.from({ length: children.length + 2 }, (_, i) => i).join(","));
  return body;
}

/** Submits to the Google Form. Returns true only when Google recorded the response. */
export async function submitToGoogleForm(data: RegistrationInput): Promise<boolean> {
  try {
    const res = await fetch(FORM_RESPONSE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: toGoogleFormBody(data),
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
    });
    if (res.status !== 200) {
      console.warn(`[register] Google Form answered ${res.status}; relying on email.`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[register] Google Form submission failed; relying on email.", err);
    return false;
  }
}
