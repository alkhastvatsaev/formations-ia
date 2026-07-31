import type { MetadataRoute } from "next";
import { allArticles, allFormations } from "content-collections";
import { ALL_INTENT_PAGES, intentPath } from "@/lib/seo-intent";
import { absoluteUrl } from "@/lib/utils";

function maxDate(isos: string[]): Date {
  if (isos.length === 0) return new Date("2026-07-31");
  return new Date(isos.reduce((a, b) => (a > b ? a : b)));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const formationDates = allFormations
    .filter((f) => !f.draft)
    .map((f) => f.updatedAt);
  const articleDates = allArticles
    .filter((a) => !a.draft)
    .map((a) => a.updatedAt);
  const intentDates = ALL_INTENT_PAGES.map((p) => p.updatedAt);

  const contentMax = maxDate([...formationDates, ...articleDates, ...intentDates]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: contentMax,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/formation-ia"),
      lastModified: contentMax,
      changeFrequency: "weekly",
      priority: 0.98,
    },
    {
      url: absoluteUrl("/formations"),
      lastModified: maxDate(formationDates),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/pour"),
      lastModified: maxDate(intentDates),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified: maxDate(intentDates),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/a-propos"),
      lastModified: new Date("2026-07-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: maxDate(articleDates),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/mentions-legales"),
      lastModified: new Date("2026-07-29"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/cgv"),
      lastModified: new Date("2026-07-29"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/confidentialite"),
      lastModified: new Date("2026-07-29"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const formations = allFormations
    .filter((f) => !f.draft)
    .map((f) => ({
      url: absoluteUrl(`/formations/${f.slug}`),
      lastModified: new Date(f.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.92,
    }));

  const intents = ALL_INTENT_PAGES.map((p) => ({
    url: absoluteUrl(intentPath(p)),
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const articles = allArticles
    .filter((a) => !a.draft)
    .map((a) => ({
      url: absoluteUrl(`/blog/${a.slug}`),
      lastModified: new Date(a.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...formations, ...intents, ...articles];
}
