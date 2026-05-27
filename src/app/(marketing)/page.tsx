import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { PromoStrip } from "./_components/PromoStrip";
import { Marquee } from "./_components/Marquee";
import { ServicesGrid } from "./_components/ServicesGrid";
import { MeetTheDesigner } from "./_components/MeetTheDesigner";
import { GalleryMarquee } from "./_components/GalleryMarquee";
import { WhyUs } from "./_components/WhyUs";
import { Testimonials } from "./_components/Testimonials";
import { InquiryStrip } from "./_components/InquiryStrip";
import { HomeFaq } from "./_components/HomeFaq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vaishnavi Designer Boutique — Best Boutique in Lucknow",
  description:
    "Lucknow's #1 rated designer boutique (4.9★) in Jankipuram — custom bridal lehengas, saree blouses, party wear & same-day alterations. Free consultation, perfect-fit promise. Book on WhatsApp.",
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
      <GalleryMarquee />
      <WhyUs />
      <Testimonials />
      <InquiryStrip />
      <HomeFaq />
    </>
  );
}
