import type { MetadataRoute } from "next";
import { routes } from "../lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const solutionSlugs: string[] = [
  "award-functions-coordination",
  "MICE-event-planning",
  "brand-activation-events",
  "premium-event-management-company",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = routes.map((route) => ({
    url: new URL(route.path, baseUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.path === "/" ? 1 : 0.7,
  }));

  const solutionPages = solutionSlugs.map((slug) => ({
    url: new URL(`/solutions/${slug}`, baseUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...solutionPages];
}


