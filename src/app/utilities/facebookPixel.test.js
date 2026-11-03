import { beforeEach, describe, expect, it, vi } from "vitest";
import { configureTracking, PageView, trackAddToCart, InitiateCheckout, Purchase } from "./facebookPixel";
beforeEach(() => {
  window.history.replaceState({}, "", "/products");
  window.fbq = vi.fn(); window.gtag = vi.fn(); window.dataLayer = [];
  sessionStorage.clear();
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
