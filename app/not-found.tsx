import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
      <div className="text-center">
        <p className="font-display text-7xl font-semibold text-forest-300">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This page took a summer break</h1>
        <p className="prose-kairos mx-auto mt-3 max-w-md">
          The page you're looking for isn't here. Let's get you back to learning.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/services" className="btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
