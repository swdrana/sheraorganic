// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ redirect: vi.fn((to) => { throw new Error(`REDIRECT ${to}`); }) }));
vi.mock("next/navigation", () => nav);
vi.mock("@/app/data/cachedData", () => ({
  getCachedCategories: vi.fn(), getCachedBrands: vi.fn(), getCachedProductList: vi.fn(),
}));

import { getCachedBrands, getCachedCategories, getCachedProductList } from "@/app/data/cachedData";
import { redirectIfHiddenListing } from "./products/[slug]/hiddenListing";
import { loadProduct } from "./product-details/[id]/loadProduct";

beforeEach(() => {
  vi.clearAllMocks();
  getCachedCategories.mockResolvedValue([{ _id: "c1", name: "Oil", status: "hide" }, { _id: "c2", name: "Honey" }]);
  getCachedBrands.mockResolvedValue([{ _id: "b1", name: "Acme", status: "hide" }]);
});

describe("/products/[slug] hidden listings", () => {
  it("sends hidden category and brand links to /products", async () => {
    await expect(redirectIfHiddenListing(["category", "oil", "c1"])).rejects.toThrow("REDIRECT /products");
    await expect(redirectIfHiddenListing(["brands", "acme", "b1"])).rejects.toThrow("REDIRECT /products");
  });
  it("leaves visible, unknown and non-listing slugs alone", async () => {
    await redirectIfHiddenListing(["category", "honey", "c2"]);
    await redirectIfHiddenListing(["category", "new", "zz"]);
    await redirectIfHiddenListing(["search", "oil"]);
    expect(nav.redirect).not.toHaveBeenCalled();
    expect(getCachedCategories).toHaveBeenCalledTimes(2);
  });
});

describe("/product-details/[id] lookup", () => {
  it("treats a hidden product as missing (also by legacy id)", async () => {
    getCachedProductList.mockResolvedValue([{ _id: "507f1f77bcf86cd799439011", slug: "secret", status: "hide" }]);
    expect(await loadProduct("secret")).toEqual({ product: null, canonical: false });
    expect((await loadProduct("507f1f77bcf86cd799439011")).product).toBeNull();
  });
  it("finds a visible product", async () => {
    getCachedProductList.mockResolvedValue([{ _id: "p2", slug: "honey", status: "show" }]);
    expect(await loadProduct("honey")).toMatchObject({ product: { _id: "p2" }, canonical: true });
  });
});
