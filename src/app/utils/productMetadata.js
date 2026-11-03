export function productDescription(product, siteName, descriptionText) {
  return product.seoDescription || descriptionText || `${product.name} — ${siteName ? siteName + " থেকে " : ""}অর্ডার করুন।`;
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
