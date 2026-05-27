"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, BadgeCheck } from "lucide-react";
import { img } from "@/lib/images";
import { waLink } from "@/lib/env";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";

export function Hero() {
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  return (
    <section className="vdb-grain relative overflow-hidden bg-vdb-cream">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-vdb-blush/60 to-transparent" aria-hidden />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:gap-10 md:pt-24 md:pb-24">
        {/* TEXT */}
        <div className="md:col-span-7 md:order-1 order-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-vdb-wine/30 bg-vdb-wine/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-vdb-wine sm:text-[11px]">
              <BadgeCheck size={13} /> Free Consultation
            </span>
            <span className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Jankipuram · Lucknow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mt-4 font-display text-[2.4rem] leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-[4.5rem]"
          >
            Aapka apna{" "}
            <span className="italic text-vdb-wine">designer</span> boutique,
            <br className="hidden sm:block" />{" "}
            Lucknow mein.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-5 max-w-xl text-base leading-7 text-vdb-ink/85 sm:mt-6 sm:text-lg sm:leading-8"
          >
            Bridal lehenga ho ya party-wear, saree blouse ho ya simple
            alteration — har piece aapke naap pe, aapki pasand se, aapke event
            ke liye banta hai. Pyaar se silaai, tehzeeb se finishing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          >
            <a
              href={waLink("Namaste! Free consultation book karni hai Vaishnavi Designer Boutique mein.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:opacity-90 sm:px-8"
            >
              <MessageCircle size={16} /> WhatsApp Karein
            </a>
            <Link
              href="/services"
              className="vdb-link text-xs font-medium uppercase tracking-[0.2em] text-vdb-wine-deep"
            >
              Services Dekhiye →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-7 sm:mt-8"
          >
            <GoogleRatingBadge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="mt-8 grid max-w-md grid-cols-3 gap-4 border-l-2 border-vdb-gold/50 pl-4 text-vdb-ink/80 sm:gap-6 sm:pl-5"
          >
            <Stat n="5+" label="Saalon ki silaai" />
            <Stat n="200+" label="Khush customers" />
            <Stat n="48h" label="Alterations" />
          </motion.div>
        </div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="relative md:col-span-5 md:order-2 order-1"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm md:max-w-none">
            <div className="absolute -inset-2 rotate-[2deg] rounded-md border border-vdb-gold/60 sm:-inset-3 sm:rotate-[3deg]" aria-hidden />
            <HeroSlideshow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const heroSlides: { src: string; alt: string; lead: string; word: string }[] = [
  { src: img.heroLehenga, alt: "Bridal lehenga — Vaishnavi Designer Boutique Lucknow", lead: "Shaadi ka", word: "lehenga" },
  { src: img.heroBride, alt: "Bride in custom trousseau — Lucknow boutique", lead: "Bridal", word: "trousseau" },
  { src: img.heroSareeFlower, alt: "Festive saree styling — Lucknow boutique", lead: "Festive", word: "saree" },
  { src: img.heroRedSari, alt: "Red and gold sari — Lucknow boutique", lead: "Red & gold", word: "sari" },
];

function HeroSlideshow() {
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % heroSlides.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-vdb-wine-deep">
      {heroSlides.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden={i !== current}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image
            src={s.src}
            alt={i === current ? s.alt : ""}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 420px, 88vw"
            className="object-cover"
          />
        </motion.div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vdb-wine-deep/55 via-transparent to-transparent" aria-hidden />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-vdb-cream sm:p-5">
        <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold-soft">
          This season
        </p>
        <div className="relative mt-1 h-7 sm:h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-x-0 font-display text-lg italic leading-tight text-vdb-cream sm:text-xl"
            >
              {heroSlides[current].lead}{" "}
              <span className="not-italic">{heroSlides[current].word}</span>.
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="mt-3 flex gap-1.5">
          {heroSlides.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === current ? "w-5 bg-vdb-gold-soft" : "w-1.5 bg-vdb-cream/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-vdb-wine-deep sm:text-3xl">{n}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-vdb-muted sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}
