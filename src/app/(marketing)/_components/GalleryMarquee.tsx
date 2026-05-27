import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { galleryImages } from "@/lib/images";

// 5 showcase images, duplicated once for a seamless infinite scroll.
const showcase = galleryImages.slice(0, 5);

export function GalleryMarquee() {
  const items = [...showcase, ...showcase];
  return (
    <section className="overflow-hidden bg-vdb-cream py-12 sm:py-16">
      <div className="mx-auto mb-7 flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
          Atelier se kuch jhalkiyaan
        </p>
        <h2 className="mt-2 font-display text-2xl text-vdb-wine-deep sm:text-3xl md:text-4xl">
          Humara <span className="italic text-vdb-wine">kaam</span>, kareeb se.
        </h2>
        <Link
          href="/gallery"
          className="vdb-link mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-vdb-wine"
        >
          Poora gallery dekhiye <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-vdb-cream to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-vdb-cream to-transparent sm:w-24" />

        <div className="h-64 overflow-hidden sm:h-80">
          <div className="vdb-image-marquee flex h-full items-center gap-4 sm:gap-5">
            {items.map((image, i) => {
              const decorative = i >= showcase.length;
              return (
                <figure
                  key={i}
                  aria-hidden={decorative}
                  className="relative h-full w-56 shrink-0 overflow-hidden rounded-xl border border-vdb-gold/25 sm:w-72"
                >
                  <Image
                    src={image.src}
                    alt={decorative ? "" : image.label}
                    fill
                    sizes="(max-width: 640px) 14rem, 18rem"
                    className="object-cover"
                  />
                  {!decorative && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                      <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-vdb-cream">
                        {image.label}
                      </span>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
