"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const fmtDay = (v: string) =>
  new Date(v).toLocaleDateString("en-IN", { month: "short", day: "numeric" });

/* ---------------- Inquiries over time (30 days) ---------------- */

const areaConfig = {
  count: { label: "Inquiries", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function InquiriesAreaChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <ChartContainer config={areaConfig} className="aspect-auto h-[240px] w-full">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillInq" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={28}
          tickFormatter={fmtDay}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelFormatter={(v) => fmtDay(String(v))} indicator="dot" />}
        />
        <Area
          dataKey="count"
          type="monotone"
          fill="url(#fillInq)"
          stroke="var(--color-count)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

/* ---------------- Status breakdown (donut) ---------------- */

const STATUS_COLORS: Record<string, string> = {
  new: "var(--chart-1)",
  contacted: "var(--chart-2)",
  closed: "var(--chart-3)",
};

const statusConfig = {
  value: { label: "Inquiries" },
  new: { label: "New", color: "var(--chart-1)" },
  contacted: { label: "Contacted", color: "var(--chart-2)" },
  closed: { label: "Closed", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function StatusDonut({ data }: { data: Record<string, number> }) {
  const rows = Object.entries(data).map(([status, value]) => ({
    status,
    value,
    fill: STATUS_COLORS[status] ?? "var(--chart-4)",
  }));
  const total = rows.reduce((s, r) => s + r.value, 0);

  if (total === 0) {
    return (
      <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
        No inquiries yet
      </div>
    );
  }

  return (
    <ChartContainer config={statusConfig} className="mx-auto aspect-square h-[240px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="status" hideLabel />} />
        <Pie data={rows} dataKey="value" nameKey="status" innerRadius={55} strokeWidth={3}>
          {rows.map((r) => (
            <Cell key={r.status} fill={r.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="status" />} className="flex-wrap gap-2" />
      </PieChart>
    </ChartContainer>
  );
}

/* ---------------- Top services (horizontal bar) ---------------- */

const servicesConfig = {
  count: { label: "Inquiries", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ServicesBar({ data }: { data: { service: string; count: number }[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
        No service data yet
      </div>
    );
  }
  return (
    <ChartContainer config={servicesConfig} className="aspect-auto h-[240px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="service"
          tickLine={false}
          axisLine={false}
          width={110}
          tickFormatter={(v: string) => (v.length > 16 ? v.slice(0, 15) + "…" : v)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 5, 5, 0]} barSize={22} />
      </BarChart>
    </ChartContainer>
  );
}
