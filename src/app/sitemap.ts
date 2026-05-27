import type { MetadataRoute } from "next";
import { siteEnv } from "@/lib/env";
import { services } from "@/lib/content/services";
import { api, type BlogListItem } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base = siteEnv.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await api<{ rows: BlogListItem[] }>("/blogs?limit=200");
    blogRoutes = data.rows.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
