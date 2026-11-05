export function productDescription(product, siteName, descriptionText) {
  if (product.seoDescription || descriptionText) return product.seoDescription || descriptionText;
  // Bengali product names keep the Bengali invitation; English-only names (tech shop) get English.
  if (/[\u0980-\u09FF]/.test(product.name || "")) {
    return `${product.name} — ${siteName ? siteName + " থেকে " : ""}অর্ডার করুন।`;
  }
  return `Order ${product.name}${siteName ? " from " + siteName : ""}.`;
}

// Placeholder brand names ("Others", "No brand") must not reach Google as a real brand.
const PLACEHOLDER_BRANDS = new Set(["other", "others", "no brand", "none", "n/a", "unknown", "অন্যান্য"]);

export function jsonLdBrand(brand) {
  const name = typeof brand === "string" ? brand.trim() : "";
  if (!name || PLACEHOLDER_BRANDS.has(name.toLowerCase())) return undefined;
  return { "@type": "Brand", name };
}

// Sitemap lastModified only for real past dates (bad data can carry future timestamps).
export function pastDate(value, now = Date.now()) {
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(time) && time <= now ? new Date(time) : undefined;
}

export function breadcrumbJsonLd(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.item ? { item: crumb.item } : {}),
    })),
  };
}
