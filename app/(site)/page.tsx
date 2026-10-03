import type { Metadata } from "next";
import { ConceptCHome } from "@/components/home/ConceptCHome";

// The layout deliberately sets no canonical (child pages would inherit it), so the homepage sets its own.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <ConceptCHome />;
}
