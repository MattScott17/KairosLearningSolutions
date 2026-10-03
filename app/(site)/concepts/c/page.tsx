import type { Metadata } from "next";
import { ConceptCHome } from "@/components/home/ConceptCHome";

// Concept C is now the main homepage at /. This copy stays so old preview links keep working.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ConceptCPage() {
  return <ConceptCHome />;
}
