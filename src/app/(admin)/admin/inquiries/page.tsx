"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  Tag,
  MessageSquare,
} from "lucide-react";
import { adminFetch } from "@/lib/auth-client";
import type { Inquiry, InquiryStatus } from "../_lib/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const STATUSES: InquiryStatus[] = ["new", "contacted", "closed"];
const PAGE_SIZE = 10;

function StatusBadge({ status }: { status: InquiryStatus }) {
  const variant =
    status === "new" ? "default" : status === "contacted" ? "secondary" : "outline";
  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}

function fmtDate(iso: string): string {
  const d = new Date(iso.includes("T") || iso.includes("Z") ? iso : iso + "Z");
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | InquiryStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [draftStatus, setDraftStatus] = useState<InquiryStatus>("new");
  const [draftNotes, setDraftNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const data = await adminFetch<{ rows: Inquiry[] }>("/inquiries?limit=200");
      setRows(data.rows);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    const c = { all: rows?.length ?? 0, new: 0, contacted: 0, closed: 0 };
    for (const r of rows ?? []) c[r.status] += 1;
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (rows ?? []).filter((r) => {
      if (tab !== "all" && r.status !== tab) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        (r.service ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, tab, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function openRow(r: Inquiry) {
    setSelected(r);
    setDraftStatus(r.status);
    setDraftNotes(r.notes ?? "");
  }

  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      await adminFetch(`/inquiries/${selected.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: draftStatus, notes: draftNotes }),
      });
      toast.success("Inquiry updated");
      setSelected(null);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Inquiries</h2>
        <p className="text-sm text-muted-foreground">
          Every enquiry submitted from the website.
        </p>
      </div>

      {err && (
        <Card className="border-destructive/40 p-4 text-sm text-destructive">{err}</Card>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as typeof tab);
            setPage(0);
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="new">New ({counts.new})</TabsTrigger>
            <TabsTrigger value="contacted">Contacted ({counts.contacted})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({counts.closed})</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, service…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden py-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Received</TableHead>
              <TableHead className="w-[1%]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows === null ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
                  No inquiries match.
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((r) => (
                <TableRow
                  key={r.id}
                  onClick={() => openRow(r)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {r.phone}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {r.service ?? "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                    {fmtDate(r.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
            >
              <ChevronLeft className="size-4" /> Prev
            </Button>
            <span className="tabular-nums">
              {safePage + 1} / {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
            >
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.name}</SheetTitle>
                <SheetDescription>{fmtDate(selected.created_at)}</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4">
                <dl className="space-y-3 text-sm">
                  <DetailRow icon={Phone} label="Phone">
                    <a href={`tel:${selected.phone}`} className="hover:underline">
                      {selected.phone}
                    </a>
                  </DetailRow>
                  <DetailRow icon={Mail} label="Email">
                    {selected.email ? (
                      <a href={`mailto:${selected.email}`} className="hover:underline">
                        {selected.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </DetailRow>
                  <DetailRow icon={Tag} label="Service">
                    {selected.service ?? "—"}
                  </DetailRow>
                  <DetailRow icon={Calendar} label="Preferred">
                    {selected.preferred_date ?? "—"}
                  </DetailRow>
                  <DetailRow icon={MessageSquare} label="Message">
                    <span className="whitespace-pre-wrap">{selected.message ?? "—"}</span>
                  </DetailRow>
                </dl>

                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={draftStatus}
                      onValueChange={(v) => setDraftStatus(v as InquiryStatus)}
                    >
                      <SelectTrigger id="status" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      rows={5}
                      value={draftNotes}
                      onChange={(e) => setDraftNotes(e.target.value)}
                      placeholder="Follow-up notes, quote sent, fitting date…"
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="flex-row gap-2">
                <Button onClick={save} disabled={saving} className="flex-1">
                  {saving ? "Saving…" : "Save changes"}
                </Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.25rem_5rem_1fr] items-start gap-2">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}
