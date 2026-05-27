// Typed access to NEXT_PUBLIC_* environment variables.
// All values are baked into the bundle at build time.

export const siteEnv = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Vaishnavi Designer Boutique",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918299694945",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 82996 94945",
  phoneAltDisplay: process.env.NEXT_PUBLIC_PHONE_ALT_DISPLAY ?? "",
  phoneAltNumber: process.env.NEXT_PUBLIC_PHONE_ALT_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "vaishnavidesignerboutiques@gmail.com",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/your-handle",
  addressLine1: process.env.NEXT_PUBLIC_ADDRESS_LINE_1 ?? "645A/602, Janki Vihar Colony",
  addressLine2: process.env.NEXT_PUBLIC_ADDRESS_LINE_2 ?? "Jankipuram, Lucknow, Uttar Pradesh 226031",
  hours: process.env.NEXT_PUBLIC_HOURS ?? "Mon–Sun · 11:00 AM – 9:00 PM",
  geo: {
    lat: Number(process.env.NEXT_PUBLIC_GEO_LAT ?? 26.9118),
    lon: Number(process.env.NEXT_PUBLIC_GEO_LON ?? 80.9326),
  },
  google: {
    rating: Number(process.env.NEXT_PUBLIC_GOOGLE_RATING ?? 4.9),
    reviewCount: Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? 23),
    profileUrl:
      process.env.NEXT_PUBLIC_GOOGLE_PROFILE_URL ??
      "https://www.google.com/maps/search/?api=1&query=Vaishnavi+Designer+Boutique+Jankipuram+Lucknow",
  },
} as const;

export function waLink(prefilledMessage?: string): string {
  const msg = prefilledMessage ?? `Namaste! Vaishnavi Designer Boutique se baat karni hai.`;
  return `https://wa.me/${siteEnv.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
