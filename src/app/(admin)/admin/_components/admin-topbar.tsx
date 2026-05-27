"use client";

import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const TITLES: { prefix: string; title: string }[] = [
  { prefix: "/admin/blogs/new", title: "New Post" },
  { prefix: "/admin/blogs/", title: "Edit Post" },
  { prefix: "/admin/blogs", title: "Blog Posts" },
  { prefix: "/admin/inquiries", title: "Inquiries" },
  { prefix: "/admin/dashboard", title: "Dashboard" },
];

export function AdminTopbar() {
  const pathname = usePathname() ?? "";
  const title = TITLES.find((t) => pathname.startsWith(t.prefix))?.title ?? "Admin";

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
      <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
      <div className="ml-auto">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <a href="/" target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">View site</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
