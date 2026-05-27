import { Star } from "lucide-react";
import { siteEnv } from "@/lib/env";

export function GoogleRatingBadge({
  variant = "light",
  size = "md",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}) {
  const dark = variant === "dark";
  const sm = size === "sm";
  return (
    <a
      href={siteEnv.google.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Google rating: ${siteEnv.google.rating} stars from ${siteEnv.google.reviewCount} reviews`}
      className={`inline-flex items-center gap-2 rounded-full border ${
        dark
          ? "border-vdb-gold/40 bg-vdb-wine-deep/40 text-vdb-cream"
          : "border-vdb-gold/40 bg-vdb-ivory text-vdb-ink"
      } ${sm ? "px-2.5 py-1" : "px-3.5 py-1.5"} transition hover:border-vdb-gold`}
    >
      <span className="font-display font-semibold tracking-tight" style={{ fontSize: sm ? "0.9rem" : "1.05rem" }}>
        {siteEnv.google.rating.toFixed(1)}
      </span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(siteEnv.google.rating);
          return (
            <Star
              key={i}
              size={sm ? 11 : 12}
              className={filled ? "fill-vdb-gold text-vdb-gold" : "text-vdb-gold/30"}
              strokeWidth={1.4}
            />
          );
        })}
      </span>
      <span className={`${sm ? "text-[10px]" : "text-xs"} ${dark ? "text-vdb-cream/80" : "text-vdb-muted"}`}>
        {siteEnv.google.reviewCount}+ on Google
      </span>
    </a>
  );
}
