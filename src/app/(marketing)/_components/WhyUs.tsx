"use client";

import { motion } from "motion/react";
import { Ruler, IndianRupee, CalendarHeart, Clock3 } from "lucide-react";

const pillars = [
  {
    icon: Ruler,
    n: "01",
    title: "Do baar fitting, har baar",
    body:
      "Har custom piece pehle muslin par fit hota hai, phir final fabric pe cut hota hai. Naap ek baar nahi, do baar check — taaki kapda body pe perfect baithe.",
  },
  {
    icon: IndianRupee,
    n: "02",
    title: "Pricing pehle, written mein",
    body:
      "Fabric, lining, embroidery, stitching — sab kuch first visit mein decide aur written quote. Delivery par jo bola wahi, kabhi badlav nahi.",
  },
  {
    icon: CalendarHeart,
    n: "03",
    title: "Lucknowi calendar ka khayaal",
    body:
      "Shaadi season ka rush, monsoon ki humidity, Chikankari ke saath kya jamta hai — sab dhyan mein rakh ke timeline plan karte hain.",
  },
  {
    icon: Clock3,
    n: "04",
    title: "Same-day alterations",
    body:
      "Blouse ka chhota alteration aksar usi din. Bade kaam 48 ghante mein. Saturdays jaldi bhar jaate hain, WhatsApp pehle kar dijiye.",
  },
];

export function WhyUs() {
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <section className="bg-vdb-ivory py-14 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Heading band — full width, gives the section breathing room */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Kyun aap hamare paas aati hain
            </p>
            <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
              Choti baatein, <span className="italic text-vdb-wine">dhyan se ki gayi.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-vdb-muted sm:text-base sm:leading-7">
            Customers wapas isiliye aati hain — yahan finishing pe dhyan hai,
            vaada pakka hai, aur kapda saalon chalta hai.
          </p>
        </div>

        <div className="vdb-divider mt-10 w-full" />

        {/* Four pillars — 1col mobile, 2col sm, 4col lg */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease }}
                className="group relative flex flex-col rounded-2xl border border-vdb-gold/30 bg-vdb-cream p-6 transition hover:border-vdb-gold sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vdb-wine text-vdb-gold-soft transition group-hover:bg-vdb-wine-deep">
                    <Icon size={18} />
                  </span>
                  <span className="font-accent text-xs tracking-[0.32em] text-vdb-gold/70">{p.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-tight text-vdb-wine-deep sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-vdb-ink/75">{p.body}</p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-vdb-wine-deep p-6 text-vdb-cream sm:grid-cols-4 sm:gap-6 sm:p-8">
          <Stat n="5+" label="Saalon ki silaai" />
          <Stat n="4.9★" label="Google rating" />
          <Stat n="200+" label="Khush customers" />
          <Stat n="48h" label="Alterations" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-vdb-gold-soft sm:text-4xl">{n}</p>
      <p className="mt-1 font-accent text-[10px] uppercase tracking-[0.18em] text-vdb-cream/70 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}
