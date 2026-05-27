"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { clearSession, getToken, getUser, type AdminUser } from "@/lib/auth-client";
import { AppSidebar } from "./_components/app-sidebar";
import { AdminTopbar } from "./_components/admin-topbar";

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

  // Login screen renders standalone (its own full-page design), no shell.
  if (isLogin) {
    return (
      <div className="admin-scope min-h-svh">
        {children}
        <Toaster richColors position="top-center" />
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="admin-scope flex min-h-svh items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="admin-scope">
      <SidebarProvider>
        <AppSidebar user={user} onLogout={onLogout} />
        <SidebarInset>
          <AdminTopbar />
          <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-center" />
    </div>
  );
}
