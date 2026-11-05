import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, jsonLdBrand, pastDate, productDescription } from "./productMetadata";

describe("product metadata fallbacks", () => {
  it("keeps Mehedi's exact per-product order invitation, not the site's meta description", () => {
    expect(productDescription({ name: "মধু" }, "Shera Organic", "")).toBe("মধু — Shera Organic থেকে অর্ডার করুন।");
    expect(productDescription({ name: "মধু" }, "", "")).toBe("মধু — অর্ডার করুন।");
    expect(productDescription({ name: "iPhone 15" }, "Nobomukh", "")).toBe("Order iPhone 15 from Nobomukh.");
    expect(productDescription({ name: "iPhone 15" }, "", "")).toBe("Order iPhone 15.");
    expect(productDescription({ name: "মধু", seoDescription: "SEO" }, "Shop", "Description")).toBe("SEO");
    expect(productDescription({ name: "মধু" }, "Shop", "Description")).toBe("Description");
  });
  it("omits breadcrumb item keys without a base URL, preserving names and positions", () => {
    const json = breadcrumbJsonLd([{ name: "Home", item: undefined }, { name: "Products", item: undefined }, { name: "Category", item: "" }, { name: "Product" }]);
    json.itemListElement.forEach((crumb, index) => {
      expect(crumb).not.toHaveProperty("item");
      expect(crumb.position).toBe(index + 1);
    });
    expect(JSON.stringify(json)).not.toContain('"item":');
  });
  it("preserves absolute breadcrumb URLs when configured", () => {
    expect(breadcrumbJsonLd([{ name: "Home", item: "https://example.com" }]).itemListElement[0].item).toBe("https://example.com");
  });
  it("drops placeholder brands from structured data", () => {
    expect(jsonLdBrand("Apple")).toEqual({ "@type": "Brand", name: "Apple" });
    ["Others", " other ", "No Brand", "", undefined, "অন্যান্য"].forEach((brand) => expect(jsonLdBrand(brand)).toBeUndefined());
  });
  it("keeps only past sitemap dates", () => {
    const now = Date.parse("2026-11-05T00:00:00Z");
    expect(pastDate("2026-11-01T00:00:00Z", now)).toEqual(new Date("2026-11-01T00:00:00Z"));
    expect(pastDate("2026-12-09T00:00:00Z", now)).toBeUndefined();
    expect(pastDate("not a date", now)).toBeUndefined();
    expect(pastDate(undefined, now)).toBeUndefined();
  });
});
