import { siteEnv } from "./env";

type FetchOpts = RequestInit & { admin?: boolean; revalidate?: number };

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const headers = new Headers(opts.headers ?? {});
  headers.set("content-type", "application/json");

  if (opts.admin && typeof window !== "undefined") {
    const token = localStorage.getItem("vdb.admin.token");
    if (token) headers.set("authorization", `Bearer ${token}`);
  }

  const init: RequestInit = {
    ...opts,
    headers,
    cache: opts.revalidate !== undefined ? undefined : opts.cache,
  };
  if (opts.revalidate !== undefined) {
    (init as RequestInit & { next?: { revalidate: number } }).next = {
      revalidate: opts.revalidate,
    };
  }

  const res = await fetch(`${siteEnv.apiBaseUrl}${path}`, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  preferredDate?: string;
  hp?: string;
};

export type BlogListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string | null;
  published_at: string | null;
};

export type BlogFull = BlogListItem & {
  content_md: string;
  seo_title: string | null;
  seo_description: string | null;
};
