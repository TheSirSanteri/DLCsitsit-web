import { get } from 'svelte/store';
import { auth } from './stores/auth.ts';


export async function api<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const RAW_BASE = import.meta.env.VITE_API_URL || "";
  const API_BASE = RAW_BASE.trim();

  const url = path.startsWith('http')
    ? path
    : new URL(path.replace(/^\/+/, ''), API_BASE.endsWith('/') ? API_BASE : API_BASE + '/').toString();

  const { token } = get(auth);
  const headers = new Headers(opts.headers || {});

  const method = (opts.method ?? 'GET').toUpperCase();
  if (!headers.has('Content-Type') && method !== 'GET' && method !== 'HEAD') {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(url, { ...opts, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = (data?.error || data?.message || res.statusText) as string;
    throw new Error(msg);
  }
  return data as T;
}