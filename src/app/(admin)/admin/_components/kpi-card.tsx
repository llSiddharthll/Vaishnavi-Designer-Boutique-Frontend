import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  title,
  value,
  icon: Icon,
  trendPct,
  hint,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trendPct?: number;
  hint?: string;
}) {
  const showTrend = typeof trendPct === "number";
  const up = (trendPct ?? 0) >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="size-4 shrink-0 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tabular-nums tracking-tight">{value}</div>
        {showTrend ? (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xs font-medium",
              up ? "text-emerald-600" : "text-destructive",
            )}
          >
            {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {up ? "+" : ""}
            {trendPct}%
            <span className="font-normal text-muted-foreground">vs last week</span>
          </p>
        ) : hint ? (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
