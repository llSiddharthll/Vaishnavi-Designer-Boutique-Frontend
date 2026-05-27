import { siteEnv } from "@/lib/env";

type Obj = Record<string, unknown>;

function JsonLdScript({ data }: { data: Obj }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteEnv.siteName,
    url: siteEnv.siteUrl,
    image: `${siteEnv.siteUrl}/logo.png`,
    logo: `${siteEnv.siteUrl}/logo.png`,
    description:
      "Designer boutique in Lucknow specialising in custom lehengas, saree blouses, party-wear dresses, alterations, fall pico and pre-stitched sarees.",
    telephone: siteEnv.phoneDisplay,
    email: siteEnv.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteEnv.addressLine1,
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteEnv.geo.lat,
      longitude: siteEnv.geo.lon,
    },
    areaServed: { "@type": "City", name: "Lucknow" },
    priceRange: "₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteEnv.google.rating,
      reviewCount: siteEnv.google.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [siteEnv.instagramUrl, siteEnv.google.profileUrl],
  };
  return <JsonLdScript data={data} />;
}

export function WebSiteJsonLd() {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteEnv.siteName,
    alternateName: "Vaishnavi Boutique Lucknow",
    url: siteEnv.siteUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: siteEnv.siteName,
      logo: { "@type": "ImageObject", url: `${siteEnv.siteUrl}/logo.png` },
    },
  };
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <JsonLdScript data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLdScript data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "ClothingStore",
      name: siteEnv.siteName,
      url: siteEnv.siteUrl,
    },
    areaServed: { "@type": "City", name: "Lucknow" },
    description,
    url,
  };
  return <JsonLdScript data={data} />;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string | null;
}) {
  const data: Obj = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ?? `${siteEnv.siteUrl}/opengraph-image`,
    url,
    datePublished: datePublished ?? undefined,
    author: { "@type": "Organization", name: siteEnv.siteName },
    publisher: {
      "@type": "Organization",
      name: siteEnv.siteName,
      logo: { "@type": "ImageObject", url: `${siteEnv.siteUrl}/logo.png` },
    },
  };
  return <JsonLdScript data={data} />;
}
