import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";
import { galleryImages } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Lookbook — Vaishnavi Designer Boutique Lucknow",
  description:
    "Hamare atelier ke kuch recent pieces ka glimpse — bridal lehenga, saree blouse, sangeet outfits, party wear aur saree draping. Lucknow boutique gallery.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Gallery", url: `${siteEnv.siteUrl}/gallery` },
        ]}
      />

      <section className="vdb-grain relative bg-vdb-cream py-14 sm:py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Lookbook</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-6xl">
            Hamare kapde, <span className="italic text-vdb-wine">mehfilon mein.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-vdb-ink/80 sm:mt-6 sm:text-base sm:leading-7">
            Recent fittings se kuch tasveerein. Yeh placeholder images hain —
            jaise hi shop ki photoshoot hogi, real client looks aayenge. Tab tak,
            yahaan mood aur vibe ka andaaza lagaiye.
          </p>
        </div>
      </section>

      <section className="bg-vdb-ivory pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((g, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-md ${
                  i === 0 || i === 5 ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vdb-wine-deep/70 via-vdb-wine-deep/20 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold-soft sm:text-[11px]">
                    {g.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-vdb-gold/30 bg-vdb-cream p-7 text-center sm:mt-14 sm:p-8">
            <p className="font-display text-2xl text-vdb-wine-deep sm:text-3xl">Aur dekhni hain?</p>
            <p className="mt-2 text-sm text-vdb-muted">Hamare Instagram pe regular updates aate hain.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href={siteEnv.instagramUrl} className="rounded-full bg-vdb-wine px-6 py-3 text-xs uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep">
                Instagram pe Follow karein
              </Link>
              <Link href="/contact" className="rounded-full border border-vdb-wine px-6 py-3 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory">
                Visit Book Karein
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
