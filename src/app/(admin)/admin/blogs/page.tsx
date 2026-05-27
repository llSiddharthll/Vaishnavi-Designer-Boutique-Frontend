"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/auth-client";

type BlogRow = {
  id: number;
  slug: string;
  title: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
};

export default function AdminBlogsPage() {
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      const data = await adminFetch<{ rows: BlogRow[] }>("/admin/blogs");
      setRows(data.rows);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function del(id: number) {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await adminFetch(`/admin/blogs/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    }
  }

  async function togglePublish(row: BlogRow) {
    try {
      await adminFetch(`/admin/blogs/${row.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: row.status === "published" ? "draft" : "published",
        }),
      });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-vdb-wine-deep">Blog Posts</h1>
          <p className="mt-2 text-sm text-vdb-muted">All posts — drafts and published.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-full bg-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-vdb-ivory transition hover:bg-vdb-wine-deep"
        >
          + New post
        </Link>
      </div>

      {err && <p className="mt-4 text-sm text-vdb-wine">{err}</p>}

      <div className="mt-6 overflow-hidden rounded-xl border border-vdb-gold/30 bg-vdb-ivory">
        <table className="min-w-full text-sm">
          <thead className="bg-vdb-cream text-left">
            <tr className="text-[11px] uppercase tracking-[0.18em] text-vdb-muted">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vdb-gold/20">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-vdb-muted">No posts yet.</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="hover:bg-vdb-cream/60">
                  <td className="px-4 py-3 font-medium text-vdb-ink">
                    <Link href={`/admin/blogs/${r.id}`} className="vdb-link">{r.title}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-[11px] uppercase tracking-[0.18em] ${
                        r.status === "published"
                          ? "bg-vdb-gold text-vdb-wine-deep"
                          : "bg-vdb-ink/15 text-vdb-ink"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-vdb-muted">{new Date(r.updated_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right space-x-4">
                    <button
                      type="button"
                      onClick={() => togglePublish(r)}
                      className="vdb-link text-xs uppercase tracking-[0.18em] text-vdb-wine"
                    >
                      {r.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => del(r.id)}
                      className="vdb-link text-xs uppercase tracking-[0.18em] text-vdb-muted"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
