import type { MetadataRoute } from "next";
import { siteEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
    ],
    sitemap: `${siteEnv.siteUrl}/sitemap.xml`,
    host: siteEnv.siteUrl,
  };
}
