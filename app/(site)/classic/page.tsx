import type { Metadata } from "next";
import { ClassicHome } from "@/components/home/ClassicHome";

// The original homepage, kept as an alternate. The main homepage at / is the path-finder one.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ClassicHomePage() {
  return <ClassicHome />;
}
