import { getCachedProductList } from "@/app/data/cachedData";
import { findProductByParam } from "@/app/utils/productUrl";
import { isVisible } from "@/app/utils/visibility";

// The URL is /product-details/<url path> (the product's unique `slug`). Lookup uses the cached
// product list: current slug, else a legacy /product-details/<mongo id> link or an old slug, which
// redirect to the current path. A DB failure throws (app/error.js shows "try again").
// Admin-hidden products are treated as missing (404, no metadata, no redirect to them).
export async function loadProduct(param) {
  const products = await getCachedProductList();
  const found = findProductByParam(products, param);
  return found?.product && !isVisible(found.product) ? { product: null, canonical: false } : found;
}
