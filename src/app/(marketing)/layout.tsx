import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-14 md:pb-0">
      <LocalBusinessJsonLd />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCtaBar />
      <WhatsAppFab />
    </div>
  );
}
