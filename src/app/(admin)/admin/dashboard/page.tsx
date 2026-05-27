"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Clock, Users, FileText, ArrowUpRight } from "lucide-react";
import { adminFetch } from "@/lib/auth-client";
import type { Overview } from "../_lib/types";
import { KpiCard } from "../_components/kpi-card";
import {
  InquiriesAreaChart,
  StatusDonut,
  ServicesBar,
} from "./_components/dashboard-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  new: "default",
  contacted: "secondary",
  closed: "outline",
};

function timeAgo(iso: string): string {
  const then = new Date(iso.includes("Z") || iso.includes("T") ? iso : iso + "Z").getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await adminFetch<Overview>("/admin/overview");
        if (alive) setData(d);
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (err) {
    return (
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Couldn’t load the dashboard</CardTitle>
          <CardDescription>{err}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-[320px] rounded-xl lg:col-span-2" />
          <Skeleton className="h-[320px] rounded-xl" />
        </div>
      </div>
    );
  }

  const { inquiries, blogs, recentInquiries } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Atelier overview</h2>
          <p className="text-sm text-muted-foreground">
            Inquiries and content at a glance — last 30 days.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/inquiries">
            View inquiries <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="New inquiries"
          value={inquiries.byStatus.new ?? 0}
          icon={Inbox}
          hint="Awaiting first contact"
        />
        <KpiCard
          title="Inquiries · 7 days"
          value={inquiries.lastWeek}
          icon={Clock}
          trendPct={inquiries.trendPct}
        />
        <KpiCard
          title="Total inquiries"
          value={inquiries.total}
          icon={Users}
          hint="All time"
        />
        <KpiCard
          title="Posts"
          value={`${blogs.published} / ${blogs.draft}`}
          icon={FileText}
          hint="Published / drafts"
        />
      </div>

      {/* Charts: trend + status */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inquiries over time</CardTitle>
            <CardDescription>Daily submissions, last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <InquiriesAreaChart data={inquiries.series} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By status</CardTitle>
            <CardDescription>Pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusDonut data={inquiries.byStatus} />
          </CardContent>
        </Card>
      </div>

      {/* Services + recent activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Top services</CardTitle>
            <CardDescription>Most requested</CardDescription>
          </CardHeader>
          <CardContent>
            <ServicesBar data={inquiries.byService} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <div>
              <CardTitle>Recent inquiries</CardTitle>
              <CardDescription>Latest submissions from the site</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <Link href="/admin/inquiries">All</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            {recentInquiries.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No inquiries yet.
              </p>
            ) : (
              <ul className="divide-y">
                {recentInquiries.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center gap-3 px-2 py-2.5 text-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{r.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.service ?? "General enquiry"}
                      </p>
                    </div>
                    <Badge variant={statusVariant[r.status] ?? "outline"} className="capitalize">
                      {r.status}
                    </Badge>
                    <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                      {timeAgo(r.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div>
            <CardTitle>Recent posts</CardTitle>
            <CardDescription>Latest blog activity</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/admin/blogs">Manage</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2">
          {blogs.recent.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="divide-y">
              {blogs.recent.map((b) => (
                <li key={b.id} className="flex items-center gap-3 px-2 py-2.5 text-sm">
                  <Link
                    href={`/admin/blogs/${b.id}`}
                    className="min-w-0 flex-1 truncate font-medium hover:underline"
                  >
                    {b.title}
                  </Link>
                  <Badge variant={b.status === "published" ? "default" : "secondary"} className="capitalize">
                    {b.status}
                  </Badge>
                  <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                    {timeAgo(b.updatedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
