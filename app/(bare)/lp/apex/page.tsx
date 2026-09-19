import type { Metadata } from "next";
import { LandingPage } from "@/components/lp/LandingPage";
import { apexLanding } from "@/lib/landing-content";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ApexLandingPage() {
  return <LandingPage copy={apexLanding} />;
}
