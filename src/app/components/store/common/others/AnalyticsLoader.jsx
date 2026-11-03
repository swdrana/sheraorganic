"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { normalizeTracking } from "@/app/utils/tracking";
import { configureTracking, PageView } from "@/app/utilities/facebookPixel";

// IDs only, never HTML/JS from settings. Each loader is a fixed vendor template.
function script(key, src, initialize) {
  window.__storeAnalyticsScripts = window.__storeAnalyticsScripts || new Set();
  if (window.__storeAnalyticsScripts.has(key)) return;
  window.__storeAnalyticsScripts.add(key);
  initialize?.();
  const element = document.createElement("script");
  element.async = true;
  element.src = src;
  document.head.appendChild(element);
}
export function loadTracking(t) {
  if (!t.enabled || window.location.pathname.startsWith("/admin")) return;
  window.dataLayer = window.dataLayer || [];
  if (t.gtm_id) script(t.gtm_id, `https://www.googletagmanager.com/gtm.js?id=${t.gtm_id}`, () => {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  });
  if (t.ga4_id) script(t.ga4_id, `https://www.googletagmanager.com/gtag/js?id=${t.ga4_id}`, () => {
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", t.ga4_id, { send_page_view: false });
  });
  if (t.fb_pixel_id) script(`fb-${t.fb_pixel_id}`, "https://connect.facebook.net/en_US/fbevents.js", () => {
    if (!window.fbq) {
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
      window.fbq = window._fbq = fbq;
    }
    window.fbq("init", t.fb_pixel_id);
  });
  if (t.clarity_id) script(`clarity-${t.clarity_id}`, `https://www.clarity.ms/tag/${t.clarity_id}`, () => {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  });
  if (t.tiktok_pixel_id) script(`tt-${t.tiktok_pixel_id}`, `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${t.tiktok_pixel_id}&lib=ttq`, () => {
    window.TiktokAnalyticsObject = "ttq";
    const ttq = window.ttq = window.ttq || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
    ttq.setAndDefer = (target, method) => { target[method] = function () { target.push([method, ...arguments]); }; };
    ttq.methods.forEach((method) => ttq.setAndDefer(ttq, method));
    ttq.instance = (id) => {
      const instance = ttq._i[id] || [];
      ttq.methods.forEach((method) => ttq.setAndDefer(instance, method));
      return instance;
    };
    ttq._i = ttq._i || {}; ttq._i[t.tiktok_pixel_id] = [];
    ttq._i[t.tiktok_pixel_id]._u = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._t = ttq._t || {}; ttq._t[t.tiktok_pixel_id] = Date.now();
    ttq._o = ttq._o || {}; ttq._o[t.tiktok_pixel_id] = {};
  });
}
export default function AnalyticsLoader({ tracking }) {
  const pathname = usePathname() || "";
  // Primitive key keeps the effect stable when a server object gets a new identity.
  const key = JSON.stringify(normalizeTracking({ tracking }));
  useEffect(() => {
    const t = JSON.parse(key);
    if (pathname.startsWith("/admin") || !t.enabled) {
      configureTracking(null);
      return;
    }
    configureTracking(t);
    let loaded = false;
    const events = ["scroll", "mousemove", "touchstart", "keydown", "pointerdown"];
    const cleanup = () => events.forEach((event) => window.removeEventListener(event, load));
    function load() {
      if (loaded || window.location.pathname.startsWith("/admin")) return;
      loaded = true;
      window.__storeAnalyticsInteracted = true;
      loadTracking(t);
      PageView();
      cleanup();
    }
    if (window.__storeAnalyticsInteracted) load();
    else events.forEach((event) => window.addEventListener(event, load, { passive: true }));
    return () => { cleanup(); configureTracking(null); };
  }, [pathname, key]);
  return null;
}
