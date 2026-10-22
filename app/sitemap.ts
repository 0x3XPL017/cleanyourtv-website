import type { MetadataRoute } from "next";
import { loadFacts } from "@/lib/data";
import { COVERAGE } from "@/lib/press";
import { SITE, isoDay } from "@/lib/seo";

// The home page, /addons and /faq change whenever the repo does, so their date is the repo's last commit; /press is as new as its newest article.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { updated } = await loadFacts();
  const press = COVERAGE.flatMap((g) => g.items.map((it) => isoDay(it[2]))).filter(Boolean).sort().pop() || updated;
  return [
    { url: `${SITE}/`, lastModified: updated, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/addons`, lastModified: updated, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/faq`, lastModified: updated, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/press`, lastModified: press, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/blog/reintroducing-cleanyourtv`, lastModified: "2026-10-20", changeFrequency: "yearly", priority: 0.6 },
  ];
}
