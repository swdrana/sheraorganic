import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
const state = vi.hoisted(() => ({ setting: {}, settingLoading: false }));
vi.mock("../dataFetching/useSetting", () => ({ default: () => state }));
vi.mock("../dataFetching/useProducts", () => ({ default: () => ({ products: [] }) }));
vi.mock("../provider/MainContextStore", () => ({ useMainContext: () => ({}) }));
vi.mock("next/link", () => ({ default: ({ children, ...props }) => <a {...props}>{children}</a> }));
describe("brand sidebar banner", () => {
  it("preserves the exact legacy grocery promotion when unset", () => {
    state.setting = {}; state.settingLoading = false;
    const { container } = render(<ProductDetailsSidebar />);
    expect(screen.getByText("Fresh & Organic Spice")).toBeInTheDocument();
    expect(screen.getByText("30% Off")).toBeInTheDocument();
    expect(screen.getByText("HOT")).toBeInTheDocument();
    expect(container.querySelector('[data-background="/img/banner/banner-4.jpg"]')).toBeInTheDocument();
  });
  it("never flashes the grocery promotion while unknown settings are loading", () => {
    state.setting = {}; state.settingLoading = true;
    render(<ProductDetailsSidebar />);
    expect(screen.queryByText("Fresh & Organic Spice")).not.toBeInTheDocument();
  });
  it.each(["tech", "none"])("hides the unset promotion for %s", (theme) => {
    state.setting = { brand: { decoration_theme: theme } }; state.settingLoading = false;
    render(<ProductDetailsSidebar />);
    expect(screen.queryByText("Shop Now")).not.toBeInTheDocument();
  });
  it("renders an explicitly enabled custom banner, with no legacy copy", () => {
    state.setting = { brand: { decoration_theme: "tech", product_sidebar_banner_show: true, product_sidebar_banner_img: "/img/test.png", product_sidebar_banner_title: "Tech promotion", product_sidebar_banner_subtitle: "Offer" } };
    state.settingLoading = false;
    render(<ProductDetailsSidebar />);
    expect(screen.getByText("Tech promotion")).toBeInTheDocument();
    expect(screen.getByText("Offer")).toBeInTheDocument();
    expect(screen.queryByText("HOT")).not.toBeInTheDocument();
  });
});
