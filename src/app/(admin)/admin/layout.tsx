"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Inbox, FileText, LogOut } from "lucide-react";
import { clearSession, getToken, getUser, type AdminUser } from "@/lib/auth-client";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    const tok = getToken();
    const usr = getUser();
    if (!tok || !usr) {
      router.replace("/admin/login");
      return;
    }
    setUser(usr);
    setReady(true);
  }, [isLogin, router, pathname]);

  function onLogout() {
    clearSession();
    router.replace("/admin/login");
  }

  if (isLogin) {
    return <div className="min-h-screen bg-vdb-cream">{children}</div>;
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vdb-cream text-vdb-muted">
        <p className="font-accent text-sm uppercase tracking-[0.2em]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen bg-vdb-cream md:grid-cols-[260px_1fr]">
      <aside className="border-r border-vdb-gold/30 bg-vdb-wine-deep p-6 text-vdb-cream md:sticky md:top-0 md:h-screen">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image src="/logo.png" alt="VDB" width={36} height={36} />
          <div>
            <p className="font-display text-lg leading-none text-vdb-gold-soft">Vaishnavi</p>
            <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-vdb-gold">Admin</p>
          </div>
        </Link>

        <nav className="mt-10 space-y-1 text-sm">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition ${
                  active
                    ? "bg-vdb-gold text-vdb-wine-deep"
                    : "text-vdb-cream/80 hover:bg-vdb-wine hover:text-vdb-gold-soft"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 border-t border-vdb-cream/15 pt-5">
          {user && (
            <>
              <p className="text-xs text-vdb-cream/60">Signed in as</p>
              <p className="mt-1 text-sm text-vdb-gold-soft">{user.email}</p>
            </>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-vdb-cream/80 hover:text-vdb-gold"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <section className="p-6 sm:p-10">{children}</section>
    </div>
  );
}
