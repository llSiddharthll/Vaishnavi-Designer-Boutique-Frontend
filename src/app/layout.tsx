import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight, Marcellus } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteEnv.siteUrl),
  title: {
    default: "Vaishnavi Designer Boutique — Lucknow's Custom Stitching Atelier",
    template: "%s | Vaishnavi Designer Boutique",
  },
  description:
    "Designer boutique in Lucknow specialising in custom lehengas, saree blouses, party-wear dresses, alterations and saree pre-stitching. Hand-fitted, no rush.",
  applicationName: siteEnv.siteName,
  keywords: [
    "boutique in Lucknow",
    "designer boutique Lucknow",
    "lehenga designer Lucknow",
    "blouse stitching Lucknow",
    "ladies tailor Lucknow",
    "bridal lehenga Lucknow",
    "saree pre-stitching Lucknow",
    "fall pico Lucknow",
    "party wear stitching Lucknow",
    "custom dress Lucknow",
  ],
  openGraph: {
    title: "Vaishnavi Designer Boutique — Lucknow's Custom Stitching Atelier",
    description:
      "Custom lehengas, saree blouses, party wear, pre-stitched sarees, fall pico and alterations — hand-fitted at our Lucknow atelier.",
    url: siteEnv.siteUrl,
    siteName: siteEnv.siteName,
    locale: "en_IN",
    type: "website",
    images: ["/og-default.jpg"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF7F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${interTight.variable} ${marcellus.variable}`}>
      <body className="pb-14 md:pb-0">
        <LocalBusinessJsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
