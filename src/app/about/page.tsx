import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";
import { img } from "@/lib/images";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";

export const metadata: Metadata = buildMetadata({
  title: "Hamari Kahani — Vaishnavi Designer Boutique Lucknow",
  description:
    "Vaishnavi Designer Boutique Jankipuram Lucknow ki kahani — 2021 mein ek sewing machine se shuru hua atelier, aaj 4.9★ rated, 200+ regular customers ke saath.",
  path: "/about",
});

const milestones = [
  { y: "2021", t: "Atelier shuru", d: "Ek sewing machine, ek dream, aur Jankipuram ke ek chhote se kamre se ye safar shuru hua." },
  { y: "2023", t: "Master tailor judne ke baad", d: "Hamare experienced master tailor ke aane se kaam ka standard agle level pe gaya — fine stitching, neat finish." },
  { y: "2024", t: "Bridal speciality", d: "Lucknow ke shaadi season mein bridal lehenga aur blouse orders ne pehchaan banai." },
  { y: "2026", t: "4.9 ★ rating, 200+ customers", d: "Aaj atelier mein teen log, kai loyal regulars, aur shaadi season ka full booking calendar." },
];

const team = [
  {
    role: "Founder · Lead Designer",
    name: "Arti Tiwari",
    bio: "Atelier ki neev. Har piece pe inka final check zaroor hota hai — design se le ke last hook tak.",
  },
  {
    role: "Master Tailor",
    name: "Senior Tailor",
    bio: "Saalon ka tajurba. Stitching ka standard inhi ke haathon se aata hai — har seam saaf, har fitting perfect.",
  },
  {
    role: "Atelier Help",
    name: "Support Team",
    bio: "Measurements, finishing, packaging aur customer ke saath baatcheet — sab chhote-chhote dhyan ke kaam.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "About", url: `${siteEnv.siteUrl}/about` },
        ]}
      />

      <section className="vdb-grain relative overflow-hidden bg-vdb-cream pb-14 pt-10 sm:pt-20 md:pt-28">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:order-1 order-2">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              Arti Tiwari · Founder
            </p>
            <h1 className="mt-3 font-display text-[2.4rem] leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-6xl">
              Ek silaai machine se <span className="italic text-vdb-wine">aaj tak.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-vdb-ink/85 sm:mt-7 sm:text-lg sm:leading-8">
              2021 mein Jankipuram Lucknow ke ek chhote kamre mein, Arti Ji
              ne ek sewing machine ke saath ye atelier shuru kiya. Idea
              simple tha — hamesha aisa kapda banaya jaaye jo sirf shop ka
              naam nahi, customer ka body, event aur taste reflect kare.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-vdb-ink/75 sm:mt-5 sm:text-base">
              Paanch saal mein ye chhota sa atelier Jankipuram aur aaspaas ke
              kai mohallon ki favourite spot ban gaya. 200+ regular customers,
              Google par 4.9 ★ rating, aur ek dedicated team — Arti Ji khud,
              ek experienced master tailor, aur ek support help. Bas teen log,
              lekin har customer ko personal attention.
            </p>
            <div className="mt-6">
              <GoogleRatingBadge />
            </div>
          </div>
          <div className="md:col-span-5 md:order-2 order-1">
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div className="absolute -inset-2 -rotate-[2deg] rounded-md border border-vdb-gold/60 sm:-inset-3 sm:-rotate-3" aria-hidden />
              <div className="relative overflow-hidden rounded-md bg-vdb-wine-deep">
                <Image
                  src="/arti-tiwari.jpg"
                  alt="Arti Tiwari — founder, Vaishnavi Designer Boutique Jankipuram Lucknow"
                  width={671}
                  height={1135}
                  sizes="(min-width: 768px) 420px, 88vw"
                  className="block h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vdb-ivory py-14 sm:py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Hamari Craft</p>
            <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">Itminaan se, design se.</h2>
            <div className="vdb-divider mt-5 w-24 sm:mt-6" />
          </div>
          <div className="md:col-span-8 space-y-4 text-sm leading-7 text-vdb-ink/85 sm:text-base">
            <p>
              Hum jaldi nahi karte. Blouse mein 7-10 din, bridal lehenga mein
              6-8 hafte. Jo kaam achhe se nahi ho sakta hum mana kar dete hain —
              ek order khoo dena better hai, ek fitting kharaab karne se.
            </p>
            <p>
              Atelier ke liye fabric Lucknow ke market se, silk Banaras se, aur
              embroidery thread Surat se mangwate hain. Sab haath se chuna,
              spreadsheet se nahi — isliye shelf ka har metre humein khud yaad
              rehta hai.
            </p>
            <p>
              Aur jab do saal baad alteration ke liye wapas aate hain — body
              badalti hai, sab ki — toh hum khushi se welcome karte hain. Yahi
              hamara vaada hai.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-vdb-cream py-14 sm:py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Hamari Team</p>
          <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
            Teen log, ek <span className="italic text-vdb-wine">team.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-vdb-muted sm:text-base sm:leading-7">
            Atelier chhota hai jaan-bujh kar — taaki har customer ko personal attention mile,
            aur kaam ka standard maintain rahe.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.role} className="rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-6 sm:p-7">
                <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold sm:text-[11px]">{m.role}</p>
                <h3 className="mt-2 font-display text-2xl text-vdb-wine-deep">{m.name}</h3>
                <p className="mt-3 text-sm leading-6 text-vdb-ink/80">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vdb-cream py-14 sm:py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Timeline</p>
          <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">Paanch saal, chaar moments.</h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-vdb-gold/30 bg-vdb-gold/30 sm:grid-cols-2 md:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.y} className="bg-vdb-cream p-6 sm:p-8">
                <p className="font-display text-3xl text-vdb-wine">{m.y}</p>
                <p className="mt-2 font-accent text-[11px] uppercase tracking-[0.18em] text-vdb-gold">{m.t}</p>
                <p className="mt-3 text-sm leading-6 text-vdb-muted">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-vdb-wine-deep py-14 text-vdb-cream sm:py-20 md:py-28">
        <div className="absolute inset-0 opacity-25">
          <Image src={img.fabric1} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">Aaiye milte hain</p>
          <h2 className="mt-3 font-display text-3xl text-vdb-gold-soft sm:text-4xl md:text-5xl">
            Milkar jaanna zyada asaan hai.
          </h2>
          <p className="mt-5 text-sm leading-7 text-vdb-cream/85 sm:mt-6 sm:text-base">
            Consultation ke liye walk-in karein — pehli visit free hai.
            Saturdays aur bridal season jaldi bhar jaate hain. WhatsApp pe slot
            hold kar lijiye.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8">
            <Link href="/contact" className="rounded-full bg-vdb-gold px-7 py-3 text-xs uppercase tracking-[0.18em] text-vdb-wine-deep transition hover:bg-vdb-gold-soft">
              Directions Lijiye
            </Link>
            <Link href="/services" className="rounded-full border border-vdb-gold/40 px-7 py-3 text-xs uppercase tracking-[0.18em] text-vdb-gold-soft transition hover:bg-vdb-gold/20">
              Services Dekhiye
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
