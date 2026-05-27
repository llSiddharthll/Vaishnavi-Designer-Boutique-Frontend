"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Link2,
  Table as TableIcon,
  ImagePlus,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { adminFetch } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type BlogShape = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  coverImageUrl: string;
  seoTitle: string;
  seoDescription: string;
  tags: string;
  status: "draft" | "published";
};

type SignResp = {
  cloudName: string;
  apiKey: string;
  folder: string;
  timestamp: number;
  signature: string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const empty: BlogShape = {
  title: "",
  slug: "",
  excerpt: "",
  contentMd: "",
  coverImageUrl: "",
  seoTitle: "",
  seoDescription: "",
  tags: "",
  status: "draft",
};

export function BlogEditor({ initial }: { initial?: Partial<BlogShape> & { id?: number } }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogShape>({ ...empty, ...initial });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function patch<K extends keyof BlogShape>(k: K, v: BlogShape[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // Auto-derive slug from title until the user edits the slug field.
  function onTitle(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  }

  const save = useCallback(
    async (status: "draft" | "published") => {
      setBusy(true);
      try {
        const payload = { ...form, status, slug: form.slug || undefined };
        if (form.id) {
          await adminFetch(`/admin/blogs/${form.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          });
          setForm((f) => ({ ...f, status }));
          toast.success(status === "published" ? "Published" : "Draft saved");
          router.refresh();
        } else {
          const res = await adminFetch<{ id: number }>("/admin/blogs", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          toast.success("Post created");
          router.replace(`/admin/blogs/${res.id}`);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Save failed");
      } finally {
        setBusy(false);
      }
    },
    [form, router],
  );

  // Ctrl/Cmd+S → save with current status
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!busy) save(form.status);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, busy, form.status]);

  /* ---- markdown toolbar helpers (operate on the textarea selection) ---- */
  function applyToTextarea(transform: (v: string, s: number, e: number) => { value: string; cursor: number }) {
    const ta = textareaRef.current;
    if (!ta) return;
    const { value, selectionStart, selectionEnd } = ta;
    const out = transform(value, selectionStart, selectionEnd);
    patch("contentMd", out.value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = out.cursor;
    });
  }

  const surround = (before: string, after = before) =>
    applyToTextarea((value, s, e) => {
      const sel = value.slice(s, e);
      const value2 = value.slice(0, s) + before + sel + after + value.slice(e);
      return { value: value2, cursor: e + before.length + (sel ? after.length : 0) };
    });

  const linePrefix = (prefix: string) =>
    applyToTextarea((value, s) => {
      const lineStart = value.lastIndexOf("\n", s - 1) + 1;
      const value2 = value.slice(0, lineStart) + prefix + value.slice(lineStart);
      return { value: value2, cursor: s + prefix.length };
    });

  const insertText = (text: string) =>
    applyToTextarea((value, s, e) => ({
      value: value.slice(0, s) + text + value.slice(e),
      cursor: s + text.length,
    }));

  function insertLink() {
    applyToTextarea((value, s, e) => {
      const sel = value.slice(s, e) || "link text";
      const md = `[${sel}](https://)`;
      return { value: value.slice(0, s) + md + value.slice(e), cursor: s + md.length - 1 };
    });
  }

  async function uploadImage(file: File, into: "cover" | "content") {
    setUploading(true);
    try {
      const sign = await adminFetch<SignResp>("/uploads/sign", {
        method: "POST",
        body: JSON.stringify({ folder: "vdb/blog-covers" }),
      });
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sign.apiKey);
      fd.append("timestamp", String(sign.timestamp));
      fd.append("signature", sign.signature);
      fd.append("folder", sign.folder);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const json = (await res.json()) as { secure_url: string };
      if (into === "cover") patch("coverImageUrl", json.secure_url);
      else insertText(`\n![](${json.secure_url})\n`);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const tools = [
    { icon: Bold, label: "Bold", run: () => surround("**") },
    { icon: Italic, label: "Italic", run: () => surround("_") },
    { icon: Heading2, label: "Heading 2", run: () => linePrefix("## ") },
    { icon: Heading3, label: "Heading 3", run: () => linePrefix("### ") },
    { icon: List, label: "Bulleted list", run: () => linePrefix("- ") },
    { icon: Quote, label: "Quote", run: () => linePrefix("> ") },
    { icon: Link2, label: "Link", run: insertLink },
    {
      icon: TableIcon,
      label: "Table",
      run: () =>
        insertText(
          "\n\n| Heading | Heading |\n| --- | --- |\n| Cell | Cell |\n| Cell | Cell |\n\n",
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Sticky action bar */}
      <div className="sticky top-14 z-10 -mx-4 flex items-center gap-2 border-b bg-background/85 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href="/admin/blogs">
            <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Posts</span>
          </Link>
        </Button>
        <Badge variant={form.status === "published" ? "default" : "secondary"} className="capitalize">
          {form.status}
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => save("draft")} disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />}
            Save draft
          </Button>
          <Button size="sm" onClick={() => save("published")} disabled={busy}>
            {form.status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      {/* Title */}
      <Input
        value={form.title}
        onChange={(e) => onTitle(e.target.value)}
        placeholder="Post title"
        className="h-auto border-0 px-0 text-3xl font-semibold shadow-none focus-visible:ring-0 md:text-4xl"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Content editor */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="write" className="gap-0">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
              <div className="flex flex-wrap items-center gap-0.5">
                {tools.map((t) => (
                  <Button
                    key={t.label}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title={t.label}
                    aria-label={t.label}
                    onClick={t.run}
                  >
                    <t.icon className="size-4" />
                  </Button>
                ))}
                <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  title="Insert image"
                  aria-label="Insert image"
                  disabled={uploading}
                  asChild
                >
                  <label className="cursor-pointer">
                    {uploading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ImagePlus className="size-4" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadImage(f, "content");
                        e.target.value = "";
                      }}
                    />
                  </label>
                </Button>
              </div>
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="write" className="m-0">
              <Textarea
                ref={textareaRef}
                value={form.contentMd}
                onChange={(e) => patch("contentMd", e.target.value)}
                placeholder="Write your post in Markdown…"
                className="min-h-[60vh] resize-y rounded-none border-0 font-mono text-sm leading-relaxed shadow-none focus-visible:ring-0"
              />
            </TabsContent>
            <TabsContent value="preview" className="m-0">
              <div className="vdb-prose min-h-[60vh] px-5 py-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {form.contentMd || "_Nothing to preview yet._"}
                </ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Meta sidebar */}
        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Slug" htmlFor="slug">
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    patch("slug", e.target.value);
                  }}
                  placeholder="auto-from-title"
                  className="font-mono text-xs"
                />
              </Field>
              <Field label="Excerpt" htmlFor="excerpt">
                <Textarea
                  id="excerpt"
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => patch("excerpt", e.target.value)}
                  placeholder="One- or two-line summary for cards and SEO."
                />
              </Field>
              <Field label="Tags" htmlFor="tags">
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => patch("tags", e.target.value)}
                  placeholder="bridal, lehenga, lucknow"
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Cover image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {form.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.coverImageUrl}
                  alt="Cover preview"
                  className="aspect-[16/9] w-full rounded-md border object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                  No cover yet
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" disabled={uploading} asChild>
                  <label className="cursor-pointer">
                    {uploading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ImagePlus className="size-4" />
                    )}
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadImage(f, "cover");
                        e.target.value = "";
                      }}
                    />
                  </label>
                </Button>
                {form.coverImageUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => patch("coverImageUrl", "")}
                    className="text-muted-foreground"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field
                label="SEO title"
                htmlFor="seoTitle"
                hint={`${form.seoTitle.length}/60`}
                over={form.seoTitle.length > 60}
              >
                <Input
                  id="seoTitle"
                  value={form.seoTitle}
                  onChange={(e) => patch("seoTitle", e.target.value)}
                  placeholder={form.title || "Defaults to the title"}
                />
              </Field>
              <Field
                label="SEO description"
                htmlFor="seoDescription"
                hint={`${form.seoDescription.length}/160`}
                over={form.seoDescription.length > 160}
              >
                <Textarea
                  id="seoDescription"
                  rows={3}
                  value={form.seoDescription}
                  onChange={(e) => patch("seoDescription", e.target.value)}
                  placeholder="Search snippet (≈ 150–160 chars)."
                />
              </Field>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  over,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  over?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint && (
          <span
            className={cn("text-xs tabular-nums", over ? "text-destructive" : "text-muted-foreground")}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
