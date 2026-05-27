import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";
import { serviceImage } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Best Boutique Services in Lucknow",
  description:
    "Bridal lehenga design, saree blouse stitching, designer party wear, saree pre-stitching & same-day alterations — Lucknow's best designer boutique, perfectly fitted to you.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Services", url: `${siteEnv.siteUrl}/services` },
        ]}
      />

      <section className="vdb-grain relative bg-vdb-cream py-14 sm:py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Saari Services</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-6xl">
            Paanch cheezein,<br /> <span className="italic text-vdb-wine">jo hum perfectly karte hain.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-vdb-ink/80 sm:mt-6 sm:text-base sm:leading-7">
            Har service ka apna measurement protocol, fabric library, aur
            turnaround hai. Tile par tap karke padhiye kaise kaam hota hai
            aur first visit pe kya expect karein.
          </p>
        </div>
      </section>

      <section className="bg-vdb-ivory pb-20 sm:pb-24">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 sm:gap-5 sm:px-8 md:grid-cols-2">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`group relative block aspect-[4/3] overflow-hidden rounded-xl border border-vdb-gold/30 ${
                i === 0 ? "md:col-span-2 md:aspect-[16/9]" : ""
              }`}
            >
              <Image
                src={serviceImage[s.slug] ?? serviceImage["lehenga-design"]!}
                alt={s.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vdb-wine-deep via-vdb-wine-deep/70 to-vdb-wine-deep/10" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-5 text-vdb-cream sm:p-7">
                <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold-soft sm:text-[11px]">
                  {s.shortName}
                </p>
                <h2 className="mt-1.5 font-display text-2xl leading-tight text-vdb-cream drop-shadow-md sm:text-3xl md:text-4xl">
                  {s.name}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-5 text-vdb-cream/85 sm:mt-3 sm:text-base sm:leading-6">
                  {s.tagline}
                </p>
                <span className="vdb-link mt-3 inline-block text-[11px] uppercase tracking-[0.18em] text-vdb-gold-soft sm:mt-4">
                  Process aur pricing dekhiye →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
