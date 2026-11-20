import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearPendingTracking, configureTracking, flushPendingTracking, PageView, trackAddToCart, trackViewContent, InitiateCheckout, Purchase } from "./facebookPixel";
beforeEach(() => {
  window.history.replaceState({}, "", "/products");
  window.fbq = vi.fn(); window.gtag = vi.fn(); window.dataLayer = [];
  sessionStorage.clear();
  clearPendingTracking();
  configureTracking({ enabled: true, fb_pixel_id: "123456789012", ga4_id: "G-ABC12345" });
});
describe("privacy-safe ecommerce", () => {
  const input = { contents: [{ id: "p1", quantity: 2, item_price: 50, name: "private" }], value: 100, user_data: { em: "secret@example.test", ph: "017", fn: "Customer" } };
  it("sends product-only FB and GA4/dataLayer events", () => {
    trackAddToCart(input); InitiateCheckout(input);
    expect(window.fbq).toHaveBeenCalledWith("track", "AddToCart", expect.objectContaining({ value: 100, currency: "BDT" }));
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: "begin_checkout" }));
    const all = JSON.stringify([window.fbq.mock.calls, window.gtag.mock.calls, window.dataLayer]);
    expect(all).not.toMatch(/secret|Customer|private|user_data|017/);
  });
  it("uses orderCode for Purchase eventID and GA transaction_id and de-duplicates", () => {
    Purchase(input, "ORDER42"); Purchase(input, "ORDER42");
    expect(window.fbq).toHaveBeenCalledTimes(1);
    expect(window.fbq.mock.calls[0][3]).toEqual({ eventID: "ORDER42" });
    expect(window.dataLayer.at(-1).ecommerce.transaction_id).toBe("ORDER42");
  });
  it("tracks PageView on demand but never with query PII", () => {
    window.history.replaceState({}, "", "/products?email=secret");
    PageView();
    expect(window.fbq).toHaveBeenCalledWith("track", "PageView");
    expect(JSON.stringify(window.dataLayer)).not.toContain("secret");
  });
  it("is inert on admin and when disabled", () => {
    window.history.replaceState({}, "", "/admin/product");
    PageView(); trackAddToCart(input); Purchase(input, "42");
    window.history.replaceState({}, "", "/"); configureTracking({ enabled: false }); PageView();
    expect(window.fbq).not.toHaveBeenCalled(); expect(window.dataLayer).toEqual([]);
  });
});

describe("ViewContent", () => {
  const view = { contents: [{ id: "p9", quantity: 1, item_price: 250, name: "private" }], value: 250, user_data: { em: "secret@example.test" } };
  it("waits for the loader, then sends a product-only direct Pixel + GA4 + dataLayer event", () => {
    trackViewContent(view);
    expect(window.fbq).not.toHaveBeenCalled();
    expect(window.dataLayer).toEqual([]);
    flushPendingTracking();
    expect(window.fbq).toHaveBeenCalledWith("track", "ViewContent", expect.objectContaining({ content_ids: ["p9"], value: 250, currency: "BDT" }));
    expect(window.gtag).toHaveBeenCalledWith("event", "view_item", expect.objectContaining({ value: 250, send_to: "G-ABC12345" }));
    expect(window.dataLayer.at(-1)).toMatchObject({ event: "view_item", ecommerce: { items: [{ item_id: "p9", price: 250 }] } });
    expect(JSON.stringify([window.fbq.mock.calls, window.dataLayer])).not.toMatch(/secret|private/);
    trackViewContent(view); // already flushed: sent immediately
    expect(window.fbq).toHaveBeenCalledTimes(2);
  });
  it("survives the route-change reset (unconfigured when the page effect runs)", () => {
    configureTracking(null);
    trackViewContent(view);
    configureTracking({ enabled: true, fb_pixel_id: "123456789012" });
    flushPendingTracking();
    expect(window.fbq).toHaveBeenCalledWith("track", "ViewContent", expect.any(Object));
  });
  it("GTM-only store (Mehedi): no direct fbq/gtag calls, one dataLayer view_item", () => {
    configureTracking({ enabled: true, gtm_id: "GTM-MMLFB63S", ga4_id: "", fb_pixel_id: "" });
    trackViewContent(view); flushPendingTracking();
    trackAddToCart(view);
    expect(window.fbq).not.toHaveBeenCalled();
    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.dataLayer.filter((e) => e.event === "view_item")).toHaveLength(1);
    expect(window.dataLayer.filter((e) => e.event === "add_to_cart")).toHaveLength(1);
  });
  it("drops queued events when disabled, cleared or on admin, and caps the queue", () => {
    configureTracking({ enabled: false });
    trackViewContent(view); flushPendingTracking();
    configureTracking({ enabled: true, fb_pixel_id: "123456789012" });
    flushPendingTracking();
    expect(window.fbq).not.toHaveBeenCalled();
    configureTracking(null);
    trackViewContent(view); clearPendingTracking();
    configureTracking({ enabled: true, fb_pixel_id: "123456789012" }); flushPendingTracking();
    expect(window.fbq).not.toHaveBeenCalled();
    window.history.replaceState({}, "", "/admin/product");
    configureTracking(null); trackViewContent(view);
    window.history.replaceState({}, "", "/products");
    configureTracking({ enabled: true, fb_pixel_id: "123456789012" }); flushPendingTracking();
    expect(window.fbq).not.toHaveBeenCalled();
    configureTracking(null);
    for (let i = 0; i < 30; i += 1) trackViewContent(view);
    configureTracking({ enabled: true, fb_pixel_id: "123456789012" }); flushPendingTracking();
    expect(window.fbq).toHaveBeenCalledTimes(20);
  });
});
