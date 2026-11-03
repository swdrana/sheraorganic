import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, productDescription } from "./productMetadata";

describe("product metadata fallbacks", () => {
  it("keeps Mehedi's exact per-product order invitation, not the site's meta description", () => {
    expect(productDescription({ name: "মধু" }, "Shera Organic", "")).toBe("মধু — Shera Organic থেকে অর্ডার করুন।");
    expect(productDescription({ name: "মধু" }, "", "")).toBe("মধু — অর্ডার করুন।");
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
});
