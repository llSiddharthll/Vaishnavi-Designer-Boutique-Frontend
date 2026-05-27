import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost" | "gold";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] transition disabled:opacity-50 disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary: "bg-vdb-wine text-vdb-ivory hover:bg-vdb-wine-deep",
  ghost: "border border-vdb-wine text-vdb-wine hover:bg-vdb-wine hover:text-vdb-ivory",
  gold: "bg-vdb-gold text-vdb-wine-deep hover:bg-vdb-gold-soft",
};

type CommonProps = { variant?: Variant; children: ReactNode; className?: string };

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  href,
  className = "",
  children,
  ...rest
}: CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string }) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
