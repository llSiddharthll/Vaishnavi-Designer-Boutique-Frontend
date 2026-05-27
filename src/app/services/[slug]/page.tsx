import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/seo/JsonLd";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteEnv } from "@/lib/env";
import { serviceImage } from "@/lib/images";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.seo.title,
    description: s.seo.description,
    path: `/services/${s.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const url = `${siteEnv.siteUrl}/services/${s.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Services", url: `${siteEnv.siteUrl}/services` },
          { name: s.shortName, url },
        ]}
      />
      <ServiceJsonLd name={s.name} description={s.description} url={url} />
      <FaqJsonLd faqs={s.faqs} />

      <section className="vdb-grain relative bg-vdb-cream pb-14 pt-12 sm:pt-20 md:pt-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 md:order-1 order-2">
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">
              {s.shortName}
            </p>
            <h1 className="mt-3 font-display text-[2.4rem] leading-[1.05] text-vdb-wine-deep sm:text-5xl md:text-6xl">
              {s.name} <span className="italic text-vdb-wine">in Lucknow.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-vdb-ink/85 sm:mt-6 sm:text-lg sm:leading-8">{s.heroIntro}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-vdb-ink/75 sm:text-base">{s.description}</p>

            <div className="mt-6 rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-5 sm:mt-7 sm:p-6">
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-vdb-gold sm:text-xs">
                Yeh service kiske liye hai
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-vdb-ink/85 sm:mt-4">
                {s.whoFor.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-vdb-gold" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-5 md:order-2 order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm md:max-w-none">
              <div className="absolute -inset-2 rotate-[2deg] rounded-md border border-vdb-gold/60 sm:-inset-3 sm:rotate-3" aria-hidden />
              <div className="relative h-full w-full overflow-hidden rounded-md bg-vdb-wine-deep">
                <Image
                  src={serviceImage[s.slug] ?? serviceImage["lehenga-design"]!}
                  alt={s.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 420px, 88vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vdb-wine-deep/40 to-transparent" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vdb-ivory py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">Process</p>
            <h2 className="mt-3 font-display text-4xl text-vdb-wine-deep sm:text-5xl">
              How it works.
            </h2>
            <div className="vdb-divider mt-6 w-24" />
          </div>
          <ol className="md:col-span-8">
            {s.process.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[auto_1fr] gap-6 border-b border-vdb-gold/25 py-6 last:border-b-0">
                <span className="font-display text-3xl text-vdb-gold">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl text-vdb-wine-deep">{p.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-vdb-ink/80">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-vdb-cream py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">Fabric notes</p>
            <h2 className="mt-3 font-display text-3xl text-vdb-wine-deep sm:text-4xl">What we work with.</h2>
          </div>
          <p className="md:col-span-7 text-base leading-7 text-vdb-ink/80">{s.fabricNotes}</p>
        </div>
      </section>

      <section className="bg-vdb-ivory py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">Questions</p>
            <h2 className="mt-3 font-display text-4xl text-vdb-wine-deep">Asked at fittings.</h2>
          </div>
          <dl className="md:col-span-8 divide-y divide-vdb-gold/30 border-y border-vdb-gold/30">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <dt className="font-display text-xl text-vdb-wine-deep group-open:text-vdb-wine">{f.q}</dt>
                  <span className="font-accent text-2xl leading-none text-vdb-gold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <dd className="mt-3 text-sm leading-7 text-vdb-ink/80">{f.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-vdb-wine-deep py-20 text-vdb-cream sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">Start a fitting</p>
            <h2 className="mt-3 font-display text-4xl text-vdb-gold-soft sm:text-5xl">
              Tell us about your <span className="italic">{s.shortName.toLowerCase()}</span>.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-vdb-cream/80">
              Drop a message — share references, event date, and budget range. We'll reply on WhatsApp within a day.
            </p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm defaultService={s.name} />
          </div>
        </div>
      </section>

      <section className="bg-vdb-cream py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">You might also need</p>
          <h2 className="mt-3 font-display text-4xl text-vdb-wine-deep sm:text-5xl">Related services.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {s.relatedSlugs.map((rs) => {
              const r = serviceBySlug(rs);
              if (!r) return null;
              return (
                <Link
                  key={rs}
                  href={`/services/${rs}`}
                  className="group block rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-7 transition hover:border-vdb-gold"
                >
                  <p className="font-accent text-xs uppercase tracking-[0.28em] text-vdb-gold">{r.shortName}</p>
                  <h3 className="mt-3 font-display text-2xl text-vdb-wine-deep">{r.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-vdb-muted">{r.tagline}</p>
                  <span className="vdb-link mt-5 inline-block text-xs uppercase tracking-[0.2em] text-vdb-wine">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
