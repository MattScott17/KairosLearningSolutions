import type { Metadata } from "next";
import { LandingPage } from "@/components/lp/LandingPage";
import { tutoringLanding } from "@/lib/landing-content";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function TutoringLandingPage() {
  return <LandingPage copy={tutoringLanding} />;
}
