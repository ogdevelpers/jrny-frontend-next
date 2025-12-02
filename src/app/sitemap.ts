import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/utils/url.util";
import { fetchFromStrapi } from "@/lib/strapi";

type StrapiEntry = {
  slug?: string;
  key?: string;
  updatedAt?: string;
};

const toDate = (value?: string) => (value ? new Date(value) : new Date());

const STATIC_PATHS: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/about-us", priority: 0.8 },
  { path: "/portfolio", priority: 0.8 },
  { path: "/contact-us", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/solutions", priority: 0.7 },
];

async function getEntries(endpoint: string, useKey: boolean = false) {
  try {
    // Portfolios use 'key', blogs and solutions use 'slug'
    const fieldParam = useKey 
      ? 'fields[0]=key&fields[1]=updatedAt'
      : 'fields[0]=slug&fields[1]=updatedAt';
    
    const response = await fetchFromStrapi(
      `${endpoint}?${fieldParam}&pagination[pageSize]=100`,
    );
    return (response?.data as StrapiEntry[]) ?? [];
  } catch (error) {
    console.error(`Error fetching ${endpoint} for sitemap:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, priority }) => ({
      url: buildCanonicalUrl(path),
      lastModified: now,
      changeFrequency: "weekly",
      priority,
    }),
  );

  const [blogEntries, solutionEntries, portfolioEntries] = await Promise.all([
    getEntries("blogs", false),
    getEntries("solutions", false),
    getEntries("portfolios", true),
  ]);

  const blogPages: MetadataRoute.Sitemap = blogEntries
    .filter((entry) => entry.slug)
    .map((entry) => ({
      url: buildCanonicalUrl(`/blog/${entry.slug}`),
      lastModified: toDate(entry.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const solutionPages: MetadataRoute.Sitemap = solutionEntries
    .filter((entry) => entry.slug)
    .map((entry) => ({
      url: buildCanonicalUrl(`/solutions/${entry.slug}`),
      lastModified: toDate(entry.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioEntries
    .filter((entry) => entry.key)
    .map((entry) => ({
      url: buildCanonicalUrl(`/portfolio/${entry.key}`),
      lastModified: toDate(entry.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...blogPages,
    ...solutionPages,
    ...portfolioPages,
  ];
}
