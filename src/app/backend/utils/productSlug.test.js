import { beforeEach, describe, expect, it, vi } from "vitest";
import Product from "@/app/backend/model/product.model";
import { resolveProductSlug } from "./productSlug";

vi.mock("@/app/backend/model/product.model", () => ({
  default: { find: vi.fn() },
}));

describe("resolveProductSlug", () => {
  let select;
  let lean;

  beforeEach(() => {
    vi.clearAllMocks();
    lean = vi.fn().mockResolvedValue([]);
    select = vi.fn().mockReturnValue({ lean });
    Product.find.mockReturnValue({ select });
  });

  it("appends -2 when another product has the requested slug", async () => {
    lean.mockResolvedValue([{ slug: "organic-honey" }]);

    expect(
      await resolveProductSlug({ requested: "Organic Honey", name: "Honey" })
    ).toBe("organic-honey-2");
    expect(Product.find).toHaveBeenCalledWith({});
    expect(select).toHaveBeenCalledWith("slug slugHistory");
    expect(lean).toHaveBeenCalledOnce();
  });

  it("excludes the current product when checking for collisions", async () => {
    const excludeId = "507f1f77bcf86cd799439011";
    expect(
      await resolveProductSlug({ requested: "Honey", name: "Honey", excludeId })
    ).toBe("honey");
    expect(Product.find).toHaveBeenCalledWith({ _id: { $ne: excludeId } });
  });

  it("falls back to the name when the requested slug is empty", async () => {
    expect(
      await resolveProductSlug({ requested: "", name: "খাঁটি Honey" })
    ).toBe("খাঁটি-honey");
  });

  it("falls back to product when both inputs have no usable characters", async () => {
    expect(await resolveProductSlug({ requested: "!!!", name: "" })).toBe(
      "product"
    );
  });

  it("treats other products' old slugs as taken", async () => {
    lean.mockResolvedValue([{ slug: "organic-honey", slugHistory: ["honey"] }]);
    expect(await resolveProductSlug({ requested: "Honey", name: "Honey" })).toBe("honey-2");
  });

  it("never returns a bare Mongo-id-shaped slug", async () => {
    expect(
      await resolveProductSlug({ requested: "6ac8ec310e370b0a5e4fba72", name: "x" })
    ).toBe("6ac8ec310e370b0a5e4fba72-product");
  });
});
