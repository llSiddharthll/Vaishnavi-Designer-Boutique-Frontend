import type { Metadata } from "next";
import { siteEnv } from "./env";

type BuildArgs = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  publishedTime,
}: BuildArgs): Metadata {
  const url = `${siteEnv.siteUrl}${path}`;
  const ogImage = image ?? `${siteEnv.siteUrl}/og-default.jpg`;
  const fullTitle = title.includes(siteEnv.siteName)
    ? title
    : `${title} | ${siteEnv.siteName}`;

  return {
    metadataBase: new URL(siteEnv.siteUrl),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: siteEnv.siteName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
