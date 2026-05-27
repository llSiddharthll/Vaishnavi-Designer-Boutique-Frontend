import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle, BadgeCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteEnv, waLink } from "@/lib/env";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Vaishnavi Designer Boutique Jankipuram Lucknow",
  description:
    "Vaishnavi Designer Boutique se baat karein — Jankipuram Lucknow. Phone, WhatsApp, address aur free consultation booking form.",
  path: "/contact",
});

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(
    `Vaishnavi Designer Boutique, ${siteEnv.addressLine1}, ${siteEnv.addressLine2}`,
  );
  const telPrimary = siteEnv.phoneDisplay.replace(/\s+/g, "");
  const telAlt = siteEnv.phoneAltDisplay.replace(/\s+/g, "");
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Contact", url: `${siteEnv.siteUrl}/contact` },
        ]}
      />

      <section className="vdb-grain relative bg-vdb-cream py-14 sm:py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-vdb-wine/30 bg-vdb-wine/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-vdb-wine sm:text-[11px]">
              <BadgeCheck size={13} /> Free Consultation
            </span>
            <GoogleRatingBadge size="sm" />
          </div>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-6xl">
            Lucknow mein <span className="italic text-vdb-wine">aaiye, miliye.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-vdb-ink/80 sm:mt-6 sm:text-base">
            Walk-in karein, WhatsApp pe slot hold karein, ya call kijiye.
            Hum WhatsApp pe ek din mein reply karte hain — shop hours mein
            zyada-tar ek hi ghante mein.
          </p>
        </div>
      </section>

      <section className="bg-vdb-ivory py-12 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="rounded-xl border border-vdb-gold/30 bg-vdb-cream p-7 sm:p-8">
              <h2 className="font-display text-2xl text-vdb-wine-deep sm:text-3xl">Atelier tak pahunchein</h2>

              <ul className="mt-6 space-y-5 text-sm text-vdb-ink/85">
                <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-vdb-wine" />
                  <span>
                    {siteEnv.addressLine1}<br />
                    {siteEnv.addressLine2}
                  </span>
                </li>
                <li className="flex items-start gap-3"><Clock size={18} className="mt-0.5 text-vdb-wine" />
                  <span>{siteEnv.hours}</span>
                </li>
                <li className="flex items-start gap-3"><Phone size={18} className="mt-0.5 text-vdb-wine" />
                  <span>
                    <a href={`tel:${telPrimary}`} className="vdb-link block">{siteEnv.phoneDisplay}</a>
                    {siteEnv.phoneAltDisplay && (
                      <a href={`tel:${telAlt}`} className="vdb-link mt-0.5 block text-vdb-muted">
                        {siteEnv.phoneAltDisplay} <span className="text-[11px]">(alt)</span>
                      </a>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3"><Mail size={18} className="mt-0.5 text-vdb-wine" />
                  <a href={`mailto:${siteEnv.email}`} className="vdb-link">{siteEnv.email}</a>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink("Namaste! Free consultation book karni hai.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90"
                >
                  <MessageCircle size={16} /> WhatsApp Karein
                </a>
                <a
                  href={siteEnv.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-vdb-wine px-5 py-3 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </div>

              <div className="mt-6 border-t border-vdb-gold/25 pt-5">
                <GoogleRatingBadge />
                <a
                  href={siteEnv.google.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vdb-link mt-3 block text-[11px] uppercase tracking-[0.18em] text-vdb-wine"
                >
                  Google par reviews padhiye →
                </a>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-vdb-gold/30">
              <iframe
                title="Vaishnavi Designer Boutique location — Jankipuram Lucknow"
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-display text-2xl text-vdb-wine-deep sm:text-3xl">Ya yahin se message bhejiye.</h2>
            <p className="mt-2 text-sm text-vdb-muted">
              Bata dijiye kya chahiye — hum next step suggest kar denge. Pehli consultation free hai.
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
