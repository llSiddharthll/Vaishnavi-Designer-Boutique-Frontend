"use client";

import { motion } from "motion/react";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content/testimonials";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";
import { siteEnv } from "@/lib/env";

const palettes = [
  "from-vdb-wine to-vdb-wine-deep",
  "from-vdb-gold to-vdb-wine",
  "from-vdb-blush to-vdb-gold",
  "from-vdb-wine-deep to-black",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-vdb-gold text-vdb-gold" : "text-vdb-gold/30"}
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}

function Card({ t, idx, large }: { t: Testimonial; idx: number; large?: boolean }) {
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-vdb-gold/30 bg-vdb-ivory p-6 sm:p-7 ${
        large ? "md:p-9" : ""
      }`}
    >
      <Quote
        size={large ? 34 : 26}
        className="text-vdb-gold/70"
        aria-hidden
      />
      <blockquote
        className={`mt-3 font-display leading-relaxed text-vdb-wine-deep ${
          large ? "text-xl sm:text-[1.7rem] sm:leading-[1.4]" : "text-lg sm:text-xl"
        }`}
      >
        {t.quote}
      </blockquote>

      <div className="mt-auto pt-6">
        <Stars count={t.rating} />
        <figcaption className="mt-4 flex items-center gap-3 border-t border-vdb-gold/20 pt-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
              palettes[idx % palettes.length]
            } font-display text-base text-vdb-cream`}
          >
            {initials(t.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-accent text-[12px] uppercase tracking-[0.18em] text-vdb-wine">{t.name}</p>
            <p className="mt-0.5 truncate text-xs text-vdb-muted">{t.detail}</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-vdb-gold/30 bg-vdb-cream px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-vdb-wine">
            {t.service}
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section className="bg-vdb-cream py-14 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-8">
          <div className="max-w-2xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Hamari customers kya kehti hain
            </p>
            <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
              Lucknow ki <span className="italic text-vdb-wine">mehfilon</span> mein.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <GoogleRatingBadge />
            <a
              href={siteEnv.google.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vdb-link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-vdb-wine"
            >
              Saari reviews Google par padhiye <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featured && (
            <div className="lg:col-span-2">
              <Card t={featured} idx={0} large />
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((t, i) => (
              <Card key={t.name} t={t} idx={i + 1} />
            ))}
          </div>
        </div>

        {rest.length > 2 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((t, i) => (
              <Card key={t.name} t={t} idx={i + 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
