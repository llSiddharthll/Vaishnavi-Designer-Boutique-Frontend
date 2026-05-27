import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/env";

export function PromoStrip() {
  return (
    <section
      aria-label="Free consultation offer"
      className="relative overflow-hidden border-y border-vdb-gold/30 bg-gradient-to-r from-vdb-wine-deep via-vdb-wine to-vdb-wine-deep py-5 text-vdb-cream sm:py-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(255,235,180,0.5) 0%, transparent 45%), radial-gradient(circle at 82% 70%, rgba(255,255,255,0.28) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 text-center sm:px-8 md:flex-row md:justify-between md:gap-8 md:text-left">
        {/* Offer */}
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-vdb-gold text-vdb-wine-deep ring-4 ring-vdb-gold/20">
            <Sparkles size={20} />
          </span>
          <div className="min-w-0">
            <p className="font-accent text-[10px] uppercase tracking-[0.34em] text-vdb-gold-soft sm:text-[11px]">
              Is mahine ka offer
            </p>
            <p className="mt-0.5 font-display text-xl leading-tight text-vdb-gold-soft sm:text-2xl">
              <span className="font-semibold text-white">Free consultation</span> + first fitting on us
            </p>
            <p className="mt-1 font-accent text-xs italic text-vdb-cream/75 sm:text-sm">
              Sirf appointment book kijiye — no advance, no obligation
            </p>
          </div>
        </div>

        {/* Divider */}
        <span className="hidden h-12 w-px shrink-0 bg-vdb-gold/25 md:block" aria-hidden />

        {/* CTAs */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={waLink("Hello! Free consultation book karni hai Vaishnavi Designer Boutique mein.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-sm transition hover:opacity-90 sm:px-6 sm:text-xs"
          >
            <MessageCircle size={15} /> Book Free Slot
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full border border-vdb-gold-soft/40 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-vdb-gold-soft transition hover:border-vdb-gold-soft hover:bg-vdb-gold-soft/10 sm:text-xs"
          >
            Direct visit
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
