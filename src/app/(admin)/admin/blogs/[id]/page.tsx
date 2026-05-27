"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "@/lib/auth-client";
import { BlogEditor } from "../_components/BlogEditor";

type BlogRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string | null;
  status: "draft" | "published";
};

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [post, setPost] = useState<BlogRow | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await adminFetch<{ post: BlogRow }>(`/admin/blogs/${id}`);
        setPost(data.post);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed");
      }
    })();
  }, [id]);

  if (err) return <p className="text-sm text-vdb-wine">{err}</p>;
  if (!post) return <p className="text-sm text-vdb-muted">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-4xl text-vdb-wine-deep">Edit post</h1>
      <p className="mt-2 text-sm text-vdb-muted">Slug: <span className="font-mono">{post.slug}</span></p>
      <div className="mt-8">
        <BlogEditor
          initial={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? "",
            contentMd: post.content_md,
            coverImageUrl: post.cover_image_url ?? "",
            seoTitle: post.seo_title ?? "",
            seoDescription: post.seo_description ?? "",
            tags: post.tags ?? "",
            status: post.status,
          }}
        />
      </div>
    </div>
  );
}
