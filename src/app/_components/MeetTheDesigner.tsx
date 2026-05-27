"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, ScissorsLineDashed, HeartHandshake } from "lucide-react";

const points = [
  {
    icon: Sparkles,
    title: "Owner-led atelier",
    body: "Har consultation Arti Ji khud lekar baithti hain — design, fabric, fitting sab ek hi haath se.",
  },
  {
    icon: ScissorsLineDashed,
    title: "Experienced master tailor",
    body: "Hamare main tailor ka kaam years of practice ka result hai — fine stitching, neat finish, har baar.",
  },
  {
    icon: HeartHandshake,
    title: "Chhoti team, badi care",
    body: "Sirf teen log poori atelier mein. Har customer ko personal attention — naam yaad, naap file mein.",
  },
];

export function MeetTheDesigner() {
  return (
    <section className="vdb-grain relative overflow-hidden bg-vdb-ivory py-14 sm:py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-14">
        {/* PHOTO — natural 3:5 aspect of the supplied portrait */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="absolute -inset-2 -rotate-[2deg] rounded-md border border-vdb-gold/60 sm:-inset-3 sm:-rotate-3" aria-hidden />
            <div className="relative overflow-hidden rounded-md bg-vdb-wine-deep">
              <Image
                src="/arti-tiwari.jpg"
                alt="Arti Tiwari — founder & lead designer, Vaishnavi Designer Boutique"
                width={671}
                height={1135}
                sizes="(min-width: 768px) 420px, 88vw"
                className="block h-auto w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </motion.div>

        {/* STORY */}
        <div className="md:col-span-7">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
            Milye humare designer se
          </p>
          <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
            <span className="italic text-vdb-wine">Arti Tiwari</span> ji ki kahani,<br />
            ek silaai machine se shuru.
          </h2>
          <div className="vdb-divider mt-5 w-24 sm:mt-6" />

          <div className="mt-6 space-y-4 text-sm leading-7 text-vdb-ink/85 sm:text-base sm:leading-7">
            <p>
              2021 mein Arti Ji ne ek chhote se kamre mein, ek sewing machine
              aur ek dream ke saath ye boutique shuru kiya. Paanch saal mein
              ye Lucknow ke Jankipuram ka favourite designer atelier ban gaya —
              Google par <strong className="font-semibold text-vdb-wine">4.9 ★</strong>{" "}
              aur 200+ regular customers ke saath.
            </p>
            <p>
              Aaj atelier mein hamare experienced master tailor aur ek
              dedicated team hai jo har piece pe Arti Ji ki nazar ke saath
              kaam karte hain. Har blouse, har lehenga, har dress yahan se
              nikalne se pehle inka khud check zaroor hota hai — tabhi
              customer ke haath mein jaata hai.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-lg border border-vdb-gold/30 bg-vdb-cream p-5">
                  <Icon size={20} className="text-vdb-wine" />
                  <p className="mt-3 font-accent text-[11px] uppercase tracking-[0.18em] text-vdb-gold">
                    {p.title}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-vdb-ink/75">{p.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-vdb-wine px-6 py-3 text-xs uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep"
            >
              Hamari kahani padhiye
            </Link>
            <Link
              href="/contact"
              className="vdb-link text-xs font-medium uppercase tracking-[0.2em] text-vdb-wine-deep"
            >
              Aakar miliye Arti Ji se →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
