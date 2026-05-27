"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { adminFetch } from "@/lib/auth-client";

type BlogShape = {
  id?: number;
  title: string;
  slug?: string;
  excerpt?: string;
  contentMd: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string;
  status: "draft" | "published";
};

type SignResp = {
  cloudName: string;
  apiKey: string;
  folder: string;
  timestamp: number;
  signature: string;
};

export function BlogEditor({ initial }: { initial?: Partial<BlogShape> & { id?: number } }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogShape>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    contentMd: initial?.contentMd ?? "",
    coverImageUrl: initial?.coverImageUrl ?? "",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    tags: initial?.tags ?? "",
    status: (initial?.status as "draft" | "published") ?? "draft",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...(initial as BlogShape) }));
  }, [initial]);

  function patch<K extends keyof BlogShape>(k: K, v: BlogShape[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save(publish: boolean | null = null) {
    setBusy(true);
    setErr(null);
    try {
      const status = publish === null ? form.status : publish ? "published" : "draft";
      const payload = { ...form, status, slug: form.slug || undefined };
      if (initial?.id) {
        await adminFetch(`/admin/blogs/${initial.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        const res = await adminFetch<{ id: number }>("/admin/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        router.replace(`/admin/blogs/${res.id}`);
        return;
      }
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function uploadCover(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const sign = await adminFetch<SignResp>("/uploads/sign", {
        method: "POST",
        body: JSON.stringify({ folder: "vdb/blog-covers" }),
      });
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sign.apiKey);
      fd.append("timestamp", String(sign.timestamp));
      fd.append("signature", sign.signature);
      fd.append("folder", sign.folder);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const json = (await res.json()) as { secure_url: string };
      patch("coverImageUrl", json.secure_url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const labelCls = "block text-xs uppercase tracking-[0.18em] text-vdb-muted mb-1.5";
  const inputCls =
    "w-full rounded-md border border-vdb-gold/40 bg-vdb-ivory px-4 py-2.5 text-sm text-vdb-ink outline-none focus:border-vdb-wine focus:ring-1 focus:ring-vdb-wine/30";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Title</label>
          <input className={inputCls} value={form.title} onChange={(e) => patch("title", e.target.value)} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Slug (optional)</label>
            <input className={inputCls} value={form.slug ?? ""} onChange={(e) => patch("slug", e.target.value)} placeholder="auto from title" />
          </div>
          <div>
            <label className={labelCls}>Tags (comma)</label>
            <input className={inputCls} value={form.tags ?? ""} onChange={(e) => patch("tags", e.target.value)} placeholder="bridal, lehenga" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Excerpt</label>
          <textarea rows={2} className={inputCls} value={form.excerpt ?? ""} onChange={(e) => patch("excerpt", e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Content (Markdown)</label>
          <textarea
            rows={18}
            className={`${inputCls} font-mono`}
            value={form.contentMd}
            onChange={(e) => patch("contentMd", e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>SEO title</label>
            <input className={inputCls} value={form.seoTitle ?? ""} onChange={(e) => patch("seoTitle", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>SEO description</label>
            <input className={inputCls} value={form.seoDescription ?? ""} onChange={(e) => patch("seoDescription", e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Cover image</label>
          <div className="flex items-center gap-3">
            <input className={inputCls} value={form.coverImageUrl ?? ""} onChange={(e) => patch("coverImageUrl", e.target.value)} placeholder="https://..." />
            <label className="cursor-pointer rounded-full border border-vdb-wine px-4 py-2 text-xs uppercase tracking-[0.18em] text-vdb-wine hover:bg-vdb-wine hover:text-vdb-ivory">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCover(f);
                }}
              />
              Upload
            </label>
          </div>
        </div>

        {err && <p className="text-sm text-vdb-wine">{err}</p>}

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={() => save(false)} disabled={busy} className="rounded-full border border-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory disabled:opacity-50">
            Save draft
          </button>
          <button onClick={() => save(true)} disabled={busy} className="rounded-full bg-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep disabled:opacity-50">
            {form.status === "published" ? "Update & keep published" : "Publish"}
          </button>
        </div>
      </div>

      <div>
        <p className={labelCls}>Live preview</p>
        <div className="rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-6">
          {form.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.coverImageUrl} alt="" className="mb-4 aspect-[16/9] w-full rounded-md object-cover" />
          )}
          <h2 className="font-display text-3xl text-vdb-wine-deep">{form.title || "Untitled"}</h2>
          {form.excerpt && <p className="mt-3 text-sm text-vdb-muted">{form.excerpt}</p>}
          <div className="vdb-prose mt-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.contentMd || "_(empty)_"}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
