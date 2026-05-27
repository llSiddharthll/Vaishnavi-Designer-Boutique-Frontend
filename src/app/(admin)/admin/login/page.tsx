"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("vaishnavidesignerboutiques@gmail.com");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/admin/dashboard");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="vdb-grain relative flex min-h-screen items-center justify-center bg-vdb-cream p-6">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-vdb-blush/60 to-transparent" aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-vdb-gold/30 bg-vdb-ivory p-8 shadow-lg shadow-vdb-wine-deep/5">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="VDB" width={44} height={44} />
          <div>
            <p className="font-display text-xl leading-tight text-vdb-wine-deep">Vaishnavi · Admin</p>
            <p className="font-accent text-[10px] uppercase tracking-[0.32em] text-vdb-gold">Boutique back office</p>
          </div>
        </div>

        <h1 className="mt-7 font-display text-3xl text-vdb-wine-deep">Sign in.</h1>
        <p className="mt-1 text-sm text-vdb-muted">Use your boutique admin credentials.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-vdb-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-vdb-gold/40 bg-vdb-cream px-4 py-3 text-sm text-vdb-ink outline-none focus:border-vdb-wine focus:ring-1 focus:ring-vdb-wine/30"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-vdb-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-vdb-gold/40 bg-vdb-cream px-4 py-3 text-sm text-vdb-ink outline-none focus:border-vdb-wine focus:ring-1 focus:ring-vdb-wine/30"
            />
          </div>
          {err && <p className="text-sm text-vdb-wine">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-vdb-wine px-6 py-3 text-xs uppercase tracking-[0.2em] text-vdb-ivory transition hover:bg-vdb-wine-deep disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-[11px] text-vdb-muted">
          Dev credentials: <span className="font-mono text-vdb-wine">vaishnavidesignerboutiques@gmail.com</span> /{" "}
          <span className="font-mono text-vdb-wine">Vaishnavi@2026</span>
        </p>
      </div>
    </main>
  );
}
