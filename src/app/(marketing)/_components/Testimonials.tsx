"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content/testimonials";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";
import { siteEnv } from "@/lib/env";

const palettes = [
  "from-vdb-wine to-vdb-wine-deep",
  "from-vdb-gold to-vdb-wine",
  "from-vdb-blush to-vdb-gold",
  "from-vdb-wine-deep to-black",
];

const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const AUTO_MS = 6500;

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
    <span className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
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

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

function Slide({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-vdb-gold/30 bg-vdb-ivory p-6 sm:p-8">
      <Quote size={28} className="text-vdb-gold/70" aria-hidden />
      <blockquote className="mt-3 font-display text-lg leading-relaxed text-vdb-wine-deep sm:text-2xl sm:leading-[1.45]">
        {t.quote}
      </blockquote>

      <div className="mt-auto pt-6">
        <Stars count={t.rating} />
        <figcaption className="mt-4 flex items-center gap-3 border-t border-vdb-gold/20 pt-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
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
    </figure>
  );
}

export function Testimonials() {
  const count = testimonials.length;
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );
  const goTo = useCallback(
    (next: number) => setState(([i]) => [next, next > i ? 1 : -1]),
    []
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => paginate(1), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, count, paginate, index]);

  const active = testimonials[index];

  return (
    <section className="bg-vdb-cream py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Hamari customers kya kehti hain
            </p>
            <h2 className="mt-2 font-display text-2xl text-vdb-wine-deep sm:text-3xl md:text-4xl">
              Lucknow ki <span className="italic text-vdb-wine">mehfilon</span> mein.
            </h2>
          </div>
          <GoogleRatingBadge />
        </div>

        {/* Slider */}
        <div
          className="relative mt-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative min-h-[300px] sm:min-h-[260px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) paginate(1);
                  else if (info.offset.x > 60) paginate(-1);
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Slide t={active} idx={index} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-vdb-wine" : "w-1.5 bg-vdb-gold/40 hover:bg-vdb-gold/70"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={siteEnv.google.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vdb-link mr-1 hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-vdb-wine sm:inline-flex"
              >
                Google par padhiye <ArrowUpRight size={13} />
              </a>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-vdb-gold/40 bg-vdb-ivory text-vdb-wine transition-colors hover:bg-vdb-gold/15"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-vdb-gold/40 bg-vdb-ivory text-vdb-wine transition-colors hover:bg-vdb-gold/15"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
