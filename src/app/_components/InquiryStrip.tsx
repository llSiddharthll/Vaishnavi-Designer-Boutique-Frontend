import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteEnv, waLink } from "@/lib/env";
import { MessageCircle, Phone } from "lucide-react";

export function InquiryStrip() {
  return (
    <section id="enquire" className="vdb-grain relative overflow-hidden bg-vdb-wine-deep py-14 text-vdb-cream sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-vdb-gold/40" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
            Aaiye, baat karte hain
          </p>
          <h2 className="mt-3 font-display text-3xl text-vdb-gold-soft sm:text-4xl md:text-5xl">
            Apni dress ka<br /> idea share kijiye.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-vdb-cream/85 sm:mt-6">
            Message bhejiye, reference share kijiye, ya seedha call kijiye.
            Hum WhatsApp pe ek din ke andar reply karte hain aur appointment
            book kar dete hain.
          </p>

          <div className="mt-7 space-y-3 text-sm sm:mt-8">
            <a
              href={waLink("Namaste! Vaishnavi Designer Boutique se baat karni hai.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-vdb-gold/40 bg-vdb-gold/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-vdb-gold-soft transition hover:bg-vdb-gold hover:text-vdb-wine-deep"
            >
              <MessageCircle size={16} /> WhatsApp Karein
            </a>
            <div className="flex items-center gap-3 text-vdb-cream/85">
              <Phone size={16} />
              <a href={`tel:${siteEnv.phoneDisplay.replace(/\s+/g, "")}`} className="vdb-link">
                {siteEnv.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
