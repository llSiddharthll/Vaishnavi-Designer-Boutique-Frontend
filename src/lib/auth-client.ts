"use client";

import { siteEnv } from "./env";

const STORAGE_KEY = "vdb.admin.token";
const USER_KEY = "vdb.admin.user";

export type AdminUser = { id: number; email: string; name: string };

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function getUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AdminUser): void {
  localStorage.setItem(STORAGE_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const res = await fetch(`${siteEnv.apiBaseUrl}/auth/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "Login failed");
  }
  const { token, user } = (await res.json()) as { token: string; user: AdminUser };
  setSession(token, user);
  return user;
}

export async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers ?? {});
  headers.set("content-type", "application/json");
  if (token) headers.set("authorization", `Bearer ${token}`);

  const res = await fetch(`${siteEnv.apiBaseUrl}${path}`, { ...init, headers });
  if (res.status === 401) {
    clearSession();
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}
