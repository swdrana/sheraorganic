import { describe, expect, it } from "vitest";
import {
  categoryPath,
  findProductByParam,
  parseProductParam,
  productPath,
  productPathEncoded,
  slugify,
  uniqueSlug,
} from "./productUrl";

const ID = "6ac8ec310e370b0a5e4fba72";

describe("slugify", () => {
  it("keeps Bengali and English, turns spaces/symbols into single hyphens", () => {
    expect(slugify("ক্যাস্টর অয়েল (Castor Oil) | ভেন্নার তেল")).toBe("ক্যাস্টর-অয়েল-castor-oil-ভেন্নার-তেল");
    expect(slugify("গাওয়া ঘি [ Pure Gawa Ghee ]")).toBe("গাওয়া-ঘি-pure-gawa-ghee");
    expect(slugify("Mustard oil 5 liter - সরিষার তেল ৫ লিটার")).toBe("mustard-oil-5-liter-সরিষার-তেল-৫-লিটার");
    expect(slugify("/kalojirar-tel/")).toBe("kalojirar-tel");
    expect(slugify("Multani_mati")).toBe("multani-mati");
  });

  it("caps long values without a trailing hyphen", () => {
    const slug = slugify("ab ".repeat(100));
    expect(slug.length).toBeLessThanOrEqual(100);
    expect(slug.endsWith("-")).toBe(false);
  });
});

describe("uniqueSlug", () => {
  it("appends -2, -3 on collisions", () => {
    expect(uniqueSlug("Honey", [])).toBe("honey");
    expect(uniqueSlug("Honey", ["honey"])).toBe("honey-2");
    expect(uniqueSlug("Honey", ["honey", "honey-2"])).toBe("honey-3");
    expect(uniqueSlug("", [])).toBe("product");
  });
});

describe("paths", () => {
  it("uses the slug, falling back to the id", () => {
    expect(productPath({ _id: ID, slug: "মধু-honey" })).toBe("/product-details/মধু-honey");
    expect(productPathEncoded({ _id: ID, slug: "মধু" })).toBe(`/product-details/${encodeURIComponent("মধু")}`);
    expect(productPath({ _id: ID, slug: "" })).toBe(`/product-details/${ID}`);
    expect(productPath({})).toBe("/products");
  });

  it("parses encoded params", () => {
    expect(parseProductParam(encodeURIComponent("মধু-honey")).slug).toBe("মধু-honey");
    expect(parseProductParam(ID).id).toBe(ID);
    expect(parseProductParam("%E0%A4").id).toBeNull();
  });
});

describe("findProductByParam", () => {
  const list = [
    { _id: ID, slug: "castor-oil", slugHistory: ["old-castor"] },
    { _id: "6ac5d4f103e75c12b328c61f", slug: "" },
  ];

  it("finds by current slug (canonical)", () => {
    expect(findProductByParam(list, "castor-oil")).toEqual({ product: list[0], canonical: true });
    expect(findProductByParam(list, "Castor-Oil").product).toBe(list[0]);
  });

  it("legacy id and old slugs redirect", () => {
    expect(findProductByParam(list, ID)).toEqual({ product: list[0], canonical: false });
    expect(findProductByParam(list, "old-castor")).toEqual({ product: list[0], canonical: false });
  });

  it("a product without a slug is canonical at its id (no redirect loop)", () => {
    expect(findProductByParam(list, "6ac5d4f103e75c12b328c61f").canonical).toBe(true);
  });

  it("returns null for unknown params", () => {
    expect(findProductByParam(list, "nope").product).toBeNull();
  });
});

it("categoryPath matches the storefront category links", () => {
  expect(categoryPath({ _id: "abc", name: "Honey & Oil" })).toBe("/products/category=honey&oil=abc");
});
