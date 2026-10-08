import { getCachedCategories, getCachedProducts } from "@/app/data/cachedData";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://sheraorganic.com").replace(/\/$/, "");

export const revalidate = 3600;

const visible = (item) => item?.status !== "hide";

// Same URL shape the storefront links use (Navbar / Offcanvas / CategoryDrawer).
const categoryUrl = (category) =>
  `${BASE_URL}/products/category=${String(category.name || "")
    .replace(/\s+/g, "")
    .toLowerCase()}=${category._id}`;

export default async function sitemap() {
  const [products, categories] = await Promise.all([
    getCachedProducts(),
    getCachedCategories(),
  ]);

  const staticPages = ["", "/products", "/about", "/contact", "/blog", "/terms-condition"].map(
    (path) => ({ url: `${BASE_URL}${path}`, changeFrequency: "daily", priority: path ? 0.7 : 1 })
  );

  return [
    ...staticPages,
    ...categories.filter(visible).map((category) => ({
      url: categoryUrl(category),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    ...products.filter(visible).map((product) => ({
      url: `${BASE_URL}/product-details/${product._id}`,
      lastModified: product.updatedAt || product.createdAt,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
