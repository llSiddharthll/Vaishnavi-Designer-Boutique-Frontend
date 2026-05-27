"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/auth-client";

type Stats = { total: number; new: number; lastWeek: number };
type BlogStats = { published: number; draft: number };

export default function AdminDashboardPage() {
  const [inq, setInq] = useState<Stats | null>(null);
  const [blogs, setBlogs] = useState<BlogStats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [s, list] = await Promise.all([
          adminFetch<Stats>("/inquiries/stats"),
          adminFetch<{ rows: { status: string }[] }>("/admin/blogs"),
        ]);
        if (!alive) return;
        setInq(s);
        setBlogs({
          published: list.rows.filter((r) => r.status === "published").length,
          draft: list.rows.filter((r) => r.status === "draft").length,
        });
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : "Failed");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-4xl text-vdb-wine-deep">Atelier overview.</h1>
      <p className="mt-2 text-sm text-vdb-muted">Daily numbers at a glance.</p>

      {err && <p className="mt-4 text-sm text-vdb-wine">{err}</p>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New inquiries" value={inq?.new ?? "—"} accent />
        <StatCard label="Inquiries · last 7 days" value={inq?.lastWeek ?? "—"} />
        <StatCard label="Total inquiries" value={inq?.total ?? "—"} />
        <StatCard label="Posts published / drafts" value={blogs ? `${blogs.published} / ${blogs.draft}` : "—"} />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link href="/admin/inquiries" className="block rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-7 transition hover:border-vdb-gold">
          <p className="font-accent text-xs uppercase tracking-[0.28em] text-vdb-gold">Inquiries</p>
          <h2 className="mt-3 font-display text-2xl text-vdb-wine-deep">Review what came in →</h2>
          <p className="mt-3 text-sm text-vdb-muted">Update statuses, add follow-up notes.</p>
        </Link>
        <Link href="/admin/blogs" className="block rounded-xl border border-vdb-gold/30 bg-vdb-ivory p-7 transition hover:border-vdb-gold">
          <p className="font-accent text-xs uppercase tracking-[0.28em] text-vdb-gold">Blog Posts</p>
          <h2 className="mt-3 font-display text-2xl text-vdb-wine-deep">Write or publish →</h2>
          <p className="mt-3 text-sm text-vdb-muted">Six seed drafts are waiting for review.</p>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        accent
          ? "border-vdb-wine bg-vdb-wine text-vdb-cream"
          : "border-vdb-gold/30 bg-vdb-ivory text-vdb-ink"
      }`}
    >
      <p className={`font-accent text-[11px] uppercase tracking-[0.28em] ${accent ? "text-vdb-gold-soft" : "text-vdb-gold"}`}>
        {label}
      </p>
      <p className={`mt-3 font-display text-4xl ${accent ? "text-vdb-gold-soft" : "text-vdb-wine-deep"}`}>{value}</p>
    </div>
  );
}
