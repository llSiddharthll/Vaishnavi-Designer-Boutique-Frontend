import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}) {
  return (
    <As className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </As>
  );
}
