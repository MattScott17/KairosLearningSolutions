import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project so Next doesn't infer a parent
  // directory's lockfile (keeps file tracing correct on Vercel).
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The old Wix site used different URL paths for several pages. Redirect
  // them permanently so bookmarks, backlinks, and Google's existing index
  // don't 404 when this site replaces it.
  async redirects() {
    return [
      { source: "/salinas-apex", destination: "/apex", permanent: true },
      { source: "/summerprogramsatkairos", destination: "/summer", permanent: true },
      { source: "/fall-26-classes", destination: "/fall-classes", permanent: true },
      { source: "/homeworkclub", destination: "/services/homework-club", permanent: true },
      { source: "/tutors", destination: "/services/private-tutoring", permanent: true },
      {
        source: "/homeschool-support",
        destination: "/services/homeschool-support",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
