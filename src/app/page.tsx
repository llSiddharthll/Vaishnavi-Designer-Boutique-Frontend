import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { PromoStrip } from "./_components/PromoStrip";
import { Marquee } from "./_components/Marquee";
import { ServicesGrid } from "./_components/ServicesGrid";
import { MeetTheDesigner } from "./_components/MeetTheDesigner";
import { WhyUs } from "./_components/WhyUs";
import { Testimonials } from "./_components/Testimonials";
import { InquiryStrip } from "./_components/InquiryStrip";
import { HomeFaq } from "./_components/HomeFaq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vaishnavi Designer Boutique — Lucknow's Custom Stitching Atelier",
  description:
    "Jankipuram Lucknow ka 4.9★ designer boutique — custom lehenga, saree blouse, party wear aur same-day alterations. Free consultation. WhatsApp pe slot book karein.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoStrip />
      <Marquee />
      <ServicesGrid />
      <MeetTheDesigner />
      <WhyUs />
      <Testimonials />
      <InquiryStrip />
      <HomeFaq />
    </>
  );
}
