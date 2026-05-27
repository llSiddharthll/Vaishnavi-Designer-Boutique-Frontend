import { homeFaqs } from "@/lib/content/faqs";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export function HomeFaq() {
  return (
    <section className="bg-vdb-cream py-14 sm:py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
            Aksar Pucha Jaata Hai
          </p>
          <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl md:text-5xl">
            Counter par ki<br /> baatcheet.
          </h2>
          <div className="vdb-divider mt-5 w-24 sm:mt-6" />
          <p className="mt-5 text-sm leading-6 text-vdb-muted sm:text-base sm:leading-7">
            Yahan answer nahi mila? WhatsApp kar dijiye — ek din ke andar
            reply mil jaayega.
          </p>
        </div>

        <div className="md:col-span-8">
          <dl className="divide-y divide-vdb-gold/30 border-y border-vdb-gold/30">
            {homeFaqs.map((f) => (
              <details key={f.q} className="group py-4 sm:py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <dt className="font-display text-lg leading-snug text-vdb-wine-deep group-open:text-vdb-wine sm:text-xl">
                    {f.q}
                  </dt>
                  <span className="shrink-0 font-accent text-2xl leading-none text-vdb-gold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <dd className="mt-3 text-sm leading-7 text-vdb-ink/80">{f.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </div>

      <FaqJsonLd faqs={homeFaqs} />
    </section>
  );
}
