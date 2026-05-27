import { siteEnv } from "@/lib/env";
import { services } from "@/lib/content/services";

// Serves /llms.txt — a concise, LLM-friendly summary of the site
// (https://llmstxt.org). Generated dynamically so URLs/contact stay correct.
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const base = siteEnv.siteUrl;

  const serviceLines = services
    .map((s) => `- [${s.name}](${base}/services/${s.slug}): ${s.seo.description}`)
    .join("\n");

  const body = `# Vaishnavi Designer Boutique

> Lucknow's top-rated (${siteEnv.google.rating}★, ${siteEnv.google.reviewCount}+ reviews) designer boutique in Jankipuram. Custom bridal lehengas, saree blouses, designer party wear, saree pre-stitching and same-day alterations — owner-led, hand-fitted, honest pricing.

## About
- Business: ${siteEnv.siteName} — a women's-wear designer boutique and custom stitching atelier.
- Location: ${siteEnv.addressLine1}, ${siteEnv.addressLine2}
- Hours: ${siteEnv.hours}
- Phone / WhatsApp: ${siteEnv.phoneDisplay}
- Email: ${siteEnv.email}
- Rating: ${siteEnv.google.rating}/5 from ${siteEnv.google.reviewCount}+ Google reviews
- Specialities: bridal lehenga design, saree blouse stitching, designer dresses & party wear, saree pre-stitching & draping, fall pico, same-day alterations.

## Key pages
- [Home](${base}/): Overview of Lucknow's best designer boutique.
- [Services](${base}/services): All boutique services in Lucknow.
- [About](${base}/about): The atelier's story, team and approach.
- [Gallery](${base}/gallery): Lookbook of recent bridal and party-wear work.
- [Journal](${base}/blog): Bridal prep, fitting and fabric-care guides.
- [Contact](${base}/contact): Address, WhatsApp, phone and booking form.

## Services
${serviceLines}

## Contact
Book a free consultation on WhatsApp at ${siteEnv.phoneDisplay}, or visit the atelier in Jankipuram, Lucknow.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
