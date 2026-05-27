import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { api, type BlogListItem } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";
import { blogDefaultCover, galleryImages } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "The Journal — Boutique Stories from Lucknow",
  description:
    "Notes, fittings stories, and fabric care guides from Vaishnavi Designer Boutique's Lucknow atelier — for women who love clothes that last.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogIndexPage() {
  let posts: BlogListItem[] = [];
  try {
    const data = await api<{ rows: BlogListItem[] }>("/blogs?limit=50", { revalidate: 60 });
    posts = data.rows;
  } catch {
    posts = [];
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Journal", url: `${siteEnv.siteUrl}/blog` },
        ]}
      />

      <section className="vdb-grain relative bg-vdb-cream py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">The Journal</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-vdb-wine-deep sm:text-6xl">
            Notes from the <span className="italic text-vdb-wine">atelier.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-vdb-ink/80">
            Fitting guides, fabric care, trends from the Lucknow wedding season, and the
            quiet wisdom we've picked up over fifteen years of dressing women.
          </p>
        </div>
      </section>

      <section className="bg-vdb-ivory pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-vdb-gold/30 bg-vdb-cream p-10 text-center">
              <p className="font-display text-2xl text-vdb-wine-deep">The journal is coming together.</p>
              <p className="mt-3 text-sm text-vdb-muted">
                Posts are being written and proofed. Check back in a few days.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => {
                const cover = p.cover_image_url || galleryImages[i % galleryImages.length]!.src || blogDefaultCover;
                return (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-vdb-gold/30 bg-vdb-cream transition hover:border-vdb-gold"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={cover}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {p.tags && (
                        <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold sm:text-[11px]">
                          {p.tags.split(",")[0]}
                        </p>
                      )}
                      <h2 className="mt-2 font-display text-xl leading-tight text-vdb-wine-deep group-hover:text-vdb-wine sm:text-2xl">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="mt-2 text-sm leading-6 text-vdb-muted">{p.excerpt}</p>
                      )}
                      <span className="vdb-link mt-auto pt-5 text-xs uppercase tracking-[0.2em] text-vdb-wine">
                        Padhiye →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
