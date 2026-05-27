import Link from "next/link";
import { Sparkles, MessageCircle, BadgeCheck } from "lucide-react";
import { waLink } from "@/lib/env";

export function PromoStrip() {
  return (
    <section
      aria-label="Free consultation offer"
      className="relative overflow-hidden border-y border-vdb-gold/30 bg-gradient-to-r from-vdb-wine-deep via-vdb-wine to-vdb-wine-deep py-6 text-vdb-cream sm:py-7"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,235,180,0.45) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0%, transparent 55%)",
      }} aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 sm:px-8 md:flex-row md:justify-between md:gap-6">
        <div className="flex items-start gap-3 md:items-center">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vdb-gold text-vdb-wine-deep">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold-soft sm:text-xs">
              Is mahine ka offer
            </p>
            <p className="mt-1 font-display text-lg leading-tight text-vdb-gold-soft sm:text-xl md:text-2xl">
              <span className="font-semibold text-white">Free consultation</span> +
              first fitting on us · sirf appointment book kijiye
            </p>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:flex-nowrap">
          <span className="hidden items-center gap-2 text-xs text-vdb-cream/85 sm:flex">
            <BadgeCheck size={14} className="text-vdb-gold" /> No advance, no obligation
          </span>
          <a
            href={waLink("Hello! Free consultation book karni hai Vaishnavi Designer Boutique mein.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:opacity-90 sm:text-xs"
          >
            <MessageCircle size={14} /> Book Free Slot
          </a>
          <Link
            href="/contact"
            className="vdb-link text-[11px] uppercase tracking-[0.18em] text-vdb-gold-soft sm:text-xs"
          >
            ya direct visit →
          </Link>
        </div>
      </div>
    </section>
  );
}
