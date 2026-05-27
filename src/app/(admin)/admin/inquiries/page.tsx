"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/auth-client";

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  preferred_date: string | null;
  status: "new" | "contacted" | "closed";
  notes: string | null;
  created_at: string;
};

const statuses: Inquiry["status"][] = ["new", "contacted", "closed"];

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const q = filter ? `?status=${filter}` : "";
      const data = await adminFetch<{ rows: Inquiry[] }>(`/inquiries${q}`);
      setRows(data.rows);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    }
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function save() {
    if (!selected) return;
    setBusy(true);
    try {
      await adminFetch(`/inquiries/${selected.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: selected.status, notes: selected.notes ?? "" }),
      });
      await load();
      setSelected(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-vdb-wine-deep">Inquiries</h1>
          <p className="mt-2 text-sm text-vdb-muted">All form submissions from the website.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs uppercase tracking-[0.18em] text-vdb-muted">Filter</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-vdb-gold/40 bg-vdb-ivory px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {err && <p className="mt-4 text-sm text-vdb-wine">{err}</p>}

      <div className="mt-6 overflow-hidden rounded-xl border border-vdb-gold/30 bg-vdb-ivory">
        <table className="min-w-full text-sm">
          <thead className="bg-vdb-cream text-left">
            <tr className="text-[11px] uppercase tracking-[0.18em] text-vdb-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vdb-gold/20">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-vdb-muted">No inquiries yet.</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="hover:bg-vdb-cream/60">
                  <td className="px-4 py-3 font-medium text-vdb-ink">{r.name}</td>
                  <td className="px-4 py-3 text-vdb-muted">{r.phone}</td>
                  <td className="px-4 py-3 text-vdb-muted">{r.service ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-vdb-muted">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="vdb-link text-xs uppercase tracking-[0.18em] text-vdb-wine"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setSelected(null)}>
          <div className="flex-1 bg-vdb-ink/40" />
          <div
            className="w-full max-w-md overflow-y-auto bg-vdb-ivory p-6 shadow-2xl sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-vdb-wine-deep">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-sm text-vdb-muted">✕</button>
            </div>
            <p className="mt-1 text-xs text-vdb-muted">{new Date(selected.created_at).toLocaleString()}</p>

            <dl className="mt-6 space-y-3 text-sm">
              <Row k="Phone" v={selected.phone} />
              <Row k="Email" v={selected.email ?? "—"} />
              <Row k="Service" v={selected.service ?? "—"} />
              <Row k="Preferred" v={selected.preferred_date ?? "—"} />
              <Row k="Message" v={selected.message ?? "—"} />
            </dl>

            <div className="mt-6">
              <label className="block text-xs uppercase tracking-[0.18em] text-vdb-muted">Status</label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({ ...selected, status: e.target.value as Inquiry["status"] })
                }
                className="mt-1 w-full rounded-md border border-vdb-gold/40 bg-vdb-cream px-3 py-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-xs uppercase tracking-[0.18em] text-vdb-muted">Notes</label>
              <textarea
                rows={4}
                value={selected.notes ?? ""}
                onChange={(e) => setSelected({ ...selected, notes: e.target.value })}
                className="mt-1 w-full rounded-md border border-vdb-gold/40 bg-vdb-cream px-3 py-2 text-sm"
              />
            </div>

            <button
              onClick={save}
              disabled={busy}
              className="mt-6 w-full rounded-full bg-vdb-wine px-6 py-3 text-xs uppercase tracking-[0.2em] text-vdb-ivory transition hover:bg-vdb-wine-deep disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Inquiry["status"] }) {
  const map: Record<Inquiry["status"], string> = {
    new: "bg-vdb-wine text-vdb-cream",
    contacted: "bg-vdb-gold text-vdb-wine-deep",
    closed: "bg-vdb-ink/15 text-vdb-ink",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] uppercase tracking-[0.18em] ${map[status]}`}>
      {status}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="text-xs uppercase tracking-[0.18em] text-vdb-muted">{k}</dt>
      <dd className="text-vdb-ink/85">{v}</dd>
    </div>
  );
}
