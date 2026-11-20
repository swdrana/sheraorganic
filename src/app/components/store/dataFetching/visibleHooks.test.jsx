import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const data = vi.hoisted(() => ({
  categories: [{ _id: "c1", name: "Oil", status: "hide" }, { _id: "c2", name: "Honey", status: "show" }],
  products: [{ _id: "p1", status: "hide" }, { _id: "p2" }],
  brands: [{ _id: "b1", status: "show" }, { _id: "b2", status: "hide" }],
}));
vi.mock("./sharedFetch", () => ({ useSharedData: (key) => [data[key], false] }));
vi.mock("@/app/backend/controllers/category.controller", () => ({ getAllCategories: vi.fn() }));
vi.mock("../../../backend/controllers/product.controller", () => ({ getAllProducts: vi.fn() }));
vi.mock("@/app/backend/controllers/brand.controller", () => ({ getAllBrands: vi.fn() }));

import useCategory from "./useCategory";
import useProducts from "./useProducts";
import usebrands from "./useBrand";

describe("storefront data hooks drop admin-hidden items", () => {
  it("categories", () => {
    expect(renderHook(() => useCategory()).result.current.categorys.map((c) => c._id)).toEqual(["c2"]);
    expect(renderHook(() => useCategory({ includeHidden: true })).result.current.categorys).toHaveLength(2);
  });
  it("products", () => {
    expect(renderHook(() => useProducts()).result.current.products.map((p) => p._id)).toEqual(["p2"]);
    expect(renderHook(() => useProducts({ includeHidden: true })).result.current.products).toHaveLength(2);
  });
  it("brands", () => {
    expect(renderHook(() => usebrands()).result.current.brands.map((b) => b._id)).toEqual(["b1"]);
    expect(renderHook(() => usebrands({ includeHidden: true })).result.current.brands).toHaveLength(2);
  });
});
