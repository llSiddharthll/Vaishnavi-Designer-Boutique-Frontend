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
  const fullTitle = title.includes(siteEnv.siteName)
    ? title
    : `${title} | ${siteEnv.siteName}`;

  // When no explicit image is passed, omit images so Next falls back to the
  // app-level opengraph-image route (the branded dynamic OG card).
  const ogImages = image ? [{ url: image, width: 1200, height: 630 }] : undefined;

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
      locale: "en_IN",
      ...(ogImages ? { images: ogImages } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
