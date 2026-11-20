// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/app/api/auth/[...nextauth]/route", () => ({ authOptions: {} }));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("../model/product.model", () => ({ default: { updateOne: vi.fn() } }));
vi.mock("../utils/productSlug", () => ({ resolveProductSlug: vi.fn() }));
vi.mock("@/app/data/cachedData", () => ({ CACHE_TAGS: { products: "products", stats: "stats" } }));
vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
vi.mock("../utils/cloudinaryServer", () => ({ destroyImages: vi.fn(), diffRemoved: vi.fn() }));

import { getServerSession } from "next-auth";
import connectDB from "@/app/utils/database";
import Product from "../model/product.model";
import { revalidateTag } from "next/cache";
import { productStatusUpdate } from "./product.action";

const id = "507f1f77bcf86cd799439011";
beforeEach(() => vi.resetAllMocks());

describe("productStatusUpdate", () => {
  it("rejects non-staff before touching the DB", async () => {
    getServerSession.mockResolvedValue({ user: { id: "u", role: "Customer" } });
    await expect(productStatusUpdate(id, "hide")).rejects.toThrow("Unauthorized");
    expect(connectDB).not.toHaveBeenCalled();
    expect(Product.updateOne).not.toHaveBeenCalled();
  });
  it("rejects an invalid status", async () => {
    getServerSession.mockResolvedValue({ user: { id: "s", role: "Admin" } });
    expect((await productStatusUpdate(id, { $ne: 1 })).status).toBe(400);
    expect(Product.updateOne).not.toHaveBeenCalled();
  });
  it("writes only status and revalidates products", async () => {
    getServerSession.mockResolvedValue({ user: { id: "s", role: "Manager" } });
    Product.updateOne.mockResolvedValue({ matchedCount: 1 });
    expect((await productStatusUpdate(id, "hide")).status).toBe(200);
    expect(Product.updateOne).toHaveBeenCalledWith({ _id: id }, { $set: { status: "hide" } });
    expect(revalidateTag).toHaveBeenCalledWith("products");
  });
  it("404s an unknown product without revalidating", async () => {
    getServerSession.mockResolvedValue({ user: { id: "s", role: "Admin" } });
    Product.updateOne.mockResolvedValue({ matchedCount: 0 });
    expect((await productStatusUpdate(id, "show")).status).toBe(404);
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
