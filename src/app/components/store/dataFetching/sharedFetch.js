import { useEffect, useState } from "react";

// Browser-side de-duplication for public storefront data. Every hook instance that asks for
// the same key shares one in-flight request and its result, so the Navbar, Footer, Offcanvas,
// CategoryDrawer, … no longer each hit the API on every page. Results are reused across
// client-side navigations for TTL_MS; empty/failed results are dropped so the next caller retries.
const TTL_MS = 5 * 60 * 1000;
const entries = new Map(); // key -> { promise, at, pending }
// Admin edits change this data, so nothing loaded before (or while) an admin page was open is
// reused afterwards; on admin pages only in-flight requests are shared.
let adminSeenAt = 0;
const onAdminPage = () =>
  typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

export function markAdminVisit() {
  adminSeenAt = Date.now();
}

const isFresh = (entry) =>
  !!entry &&
  (entry.pending ||
    (!onAdminPage() && entry.at > adminSeenAt && Date.now() - entry.at < TTL_MS));

const isUsable = (value) =>
  value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0);

export function fetchOnce(key, loader) {
  const existing = entries.get(key);
  if (isFresh(existing)) return existing.promise;
  if (onAdminPage()) markAdminVisit();

  const entry = { at: Date.now(), pending: true };
  const drop = () => {
    if (entries.get(key) === entry) entries.delete(key);
  };
  entry.promise = Promise.resolve()
    .then(loader)
    .then(
      (value) => {
        entry.pending = false;
        if (!isUsable(value)) drop();
        return value;
      },
      (error) => {
        entry.pending = false;
        drop();
        throw error;
      }
    );
  entries.set(key, entry);
  return entry.promise;
}

// Drop a cached key after a write so the next reader fetches fresh data.
export function forgetShared(key) {
  entries.delete(key);
}

// Shared hook body: state starts with `initialValue` (same as the server render, so hydration
// matches) and is filled from the shared request in an effect. Pass enabled=false to defer the
// request until the data is actually needed (e.g. a modal that is closed).
export function useSharedData(key, loader, initialValue, enabled = true) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    fetchOnce(key, loader)
      .then((value) => {
        if (active) setData(value);
      })
      .catch((error) => console.error(`Failed to fetch ${key}:`, error))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [key, loader, enabled]);

  return [data, loading];
}
