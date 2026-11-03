import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AnalyticsLoader from "./AnalyticsLoader";
const nav = vi.hoisted(() => ({ pathname: "/products" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
const tracking = { enabled: true, gtm_id: "GTM-ABC1234", ga4_id: "G-ABC12345", fb_pixel_id: "1234567890123", clarity_id: "abc12345", tiktok_pixel_id: "ABCDEFGHIJKLMNOPQRST" };
beforeEach(() => {
  document.head.innerHTML = "";
  window.history.replaceState({}, "", "/products");
  nav.pathname = "/products";
  for (const key of ["__storeAnalyticsInteracted", "__storeAnalyticsScripts", "fbq", "_fbq", "gtag", "clarity", "ttq", "dataLayer"]) delete window[key];
});
describe("interaction-only tracking loader", () => {
  it("loads only configured vendors after interaction, once, and tracks client routes", () => {
    const { rerender } = render(<AnalyticsLoader tracking={tracking} />);
    expect(document.querySelectorAll("script")).toHaveLength(0);
    fireEvent.pointerDown(window);
    expect(document.querySelectorAll("script")).toHaveLength(5);
    expect(window.fbq.queue).toContainEqual(expect.objectContaining({ 0: "track", 1: "PageView" }));
    nav.pathname = "/cart";
    window.history.replaceState({}, "", "/cart");
    rerender(<AnalyticsLoader tracking={tracking} />);
    expect(document.querySelectorAll("script")).toHaveLength(5);
    expect(window.fbq.queue.filter((entry) => entry[1] === "PageView")).toHaveLength(2);
  });
  it("never loads on admin even after interaction", () => {
    nav.pathname = "/admin"; window.history.replaceState({}, "", "/admin");
    render(<AnalyticsLoader tracking={tracking} />);
    fireEvent.keyDown(window);
    expect(document.querySelectorAll("script")).toHaveLength(0);
    expect(window.fbq).toBeUndefined();
  });
  it("does not load disabled or invalid IDs and cleans up pending listeners", () => {
    const { rerender, unmount } = render(<AnalyticsLoader tracking={{ ...tracking, enabled: false }} />);
    fireEvent.scroll(window);
    expect(document.querySelectorAll("script")).toHaveLength(0);
    rerender(<AnalyticsLoader tracking={{ enabled: true, gtm_id: "GTM-x<script>" }} />);
    fireEvent.keyDown(window);
    expect(document.querySelectorAll("script")).toHaveLength(0);
    unmount();
    act(() => { window.dispatchEvent(new Event("mousemove")); });
    expect(document.querySelectorAll("script")).toHaveLength(0);
  });
});
