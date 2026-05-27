import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api, type BlogFull } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { siteEnv } from "@/lib/env";
import { blogDefaultCover } from "@/lib/images";

type Params = { slug: string };

export const revalidate = 60;

async function fetchPost(slug: string): Promise<BlogFull | null> {
  try {
    const data = await api<{ post: BlogFull }>(`/blogs/${slug}`, { revalidate: 60 });
    return data.post;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? "",
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published_at ?? undefined,
    image: post.cover_image_url ?? undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const url = `${siteEnv.siteUrl}/blog/${post.slug}`;
  const tags = post.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteEnv.siteUrl}/` },
          { name: "Journal", url: `${siteEnv.siteUrl}/blog` },
          { name: post.title, url },
        ]}
      />
      <ArticleJsonLd
        headline={post.title}
        description={post.excerpt ?? ""}
        url={url}
        image={post.cover_image_url ?? undefined}
        datePublished={post.published_at}
      />

      <article className="bg-vdb-ivory pb-20 sm:pb-24">
        <header className="vdb-grain relative bg-vdb-cream pb-10 pt-12 sm:pt-20 md:pt-24">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vdb-blush/50 to-transparent" aria-hidden />
          <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
            {tags[0] && (
              <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold sm:text-xs">{tags[0]}</p>
            )}
            <h1 className="mt-3 font-display text-3xl leading-tight text-vdb-wine-deep sm:mt-4 sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-sm leading-6 text-vdb-muted sm:mt-6 sm:text-base sm:leading-7">{post.excerpt}</p>
            )}
            <div className="vdb-divider mx-auto mt-6 w-32 sm:mt-8" />
          </div>
        </header>

        <div className="mx-auto -mb-8 w-full max-w-4xl px-5 sm:px-8 md:-mb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-vdb-gold/30">
            <Image
              src={post.cover_image_url || blogDefaultCover}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
          <div className="vdb-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content_md}
            </ReactMarkdown>
          </div>

          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-vdb-gold/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-vdb-muted">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-14 rounded-xl border border-vdb-gold/30 bg-vdb-cream p-8 text-center">
            <p className="font-display text-2xl text-vdb-wine-deep">Want a fitting like this?</p>
            <p className="mt-2 text-sm text-vdb-muted">
              Send a WhatsApp or book a visit — we usually reply within a day.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep">
                Book a visit
              </Link>
              <Link href="/blog" className="rounded-full border border-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory">
                Read more posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
