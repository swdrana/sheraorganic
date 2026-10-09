import Product from "@/app/backend/model/product.model";
import { slugify, uniqueSlug } from "@/app/utils/productUrl";

// A unique URL path for a product. Other products' current AND previous slugs are taken (so an
// old URL keeps redirecting to its own product), and a bare 24-hex slug is avoided (it would
// shadow legacy /product-details/<mongo id> links).
export async function resolveProductSlug({ requested, name, excludeId }) {
  const products = await Product.find(excludeId ? { _id: { $ne: excludeId } } : {})
    .select("slug slugHistory")
    .lean();
  let base = slugify(requested) || slugify(name) || "product";
  if (/^[a-f0-9]{24}$/.test(base)) base = `${base}-product`;
  return uniqueSlug(
    base,
    products.flatMap((product) => [product.slug, ...(product.slugHistory || [])])
  );
}
