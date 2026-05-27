"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { serviceImage } from "@/lib/images";

export function ServicesGrid() {
  const [featured, ...rest] = services;
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <section className="bg-vdb-cream py-14 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-8">
          <div className="max-w-xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Hamari Services
            </p>
            <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
              Lehenga se lekar <span className="italic text-vdb-wine">blouse</span> tak.
            </h2>
            <p className="mt-4 text-sm leading-6 text-vdb-muted sm:text-base sm:leading-7">
              Pyaar se design, naap se silaai, aur har fitting ke baad ek baar
              phir check — taaki aapka kapda perfect baithe.
            </p>
          </div>
          <Link
            href="/services"
            className="vdb-link inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-vdb-wine"
          >
            Saari services <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* FEATURED */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="mt-10"
          >
            <Link
              href={`/services/${featured.slug}`}
              className="group relative grid overflow-hidden rounded-2xl border border-vdb-gold/30 md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[26rem]">
                <Image
                  src={serviceImage[featured.slug] ?? ""}
                  alt={featured.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                {featured.badge && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-vdb-gold px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-vdb-wine-deep sm:text-[11px]">
                    ★ {featured.badge}
                  </span>
                )}
              </div>
              <div className="bg-vdb-wine-deep p-7 text-vdb-cream sm:p-9 md:p-10">
                <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold sm:text-[11px]">
                  {featured.shortName}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-vdb-cream sm:text-4xl md:text-[2.6rem]">
                  {featured.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-vdb-cream/85 sm:text-base sm:leading-7">
                  {featured.tagline}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-vdb-gold/40 bg-vdb-gold/10 px-3 py-1.5 text-vdb-gold-soft">
                    <Clock size={12} /> {featured.turnaround}
                  </span>
                  <span className="text-vdb-cream/60">·</span>
                  <span className="text-vdb-cream/80">Free consultation</span>
                </div>

                <span className="vdb-link mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-vdb-gold-soft sm:text-xs">
                  Process aur pricing dekhiye <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* GRID */}
        <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-vdb-gold/30"
              >
                <Image
                  src={serviceImage[s.slug] ?? ""}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vdb-wine-deep via-vdb-wine-deep/65 to-vdb-wine-deep/5" aria-hidden />

                {s.badge && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-vdb-ivory/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-vdb-wine-deep backdrop-blur-sm">
                    {s.badge}
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 text-vdb-cream sm:p-5">
                  <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold-soft">
                    {s.shortName}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight text-vdb-cream drop-shadow-md sm:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-vdb-cream/85 line-clamp-2">
                    {s.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-vdb-gold-soft">
                    <Clock size={11} /> {s.turnaround}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
