// Product URLs: /product-details/<url path>. The URL path is the product's own `slug` field (admin
// "URL path", unique, Bengali/English allowed). It does not change when the title changes unless the
// admin ticks "Same as title". Old /product-details/<mongo id> links and previous slugs
// (`slugHistory`) redirect to the current path.

export const MAX_SLUG_LENGTH = 100;

// Letters (any script, incl. Bengali + its vowel signs) and digits are kept; spaces and any other
// characters (brackets, |, punctuation, emoji) become single hyphens. Latin is lower-cased.
export const slugify = (value) =>
  String(value || "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, "");

const isObjectId = (value) => /^[a-f0-9]{24}$/i.test(value);

// The product's URL path segment (raw, not percent-encoded); falls back to the id for products
// that have no usable slug yet.
export const productSlug = (product) =>
  slugify(product?.slug) || (product?._id ? String(product._id) : "");

// For <Link href> / router: Next encodes non-ASCII itself.
export const productPath = (product) => {
  const slug = productSlug(product);
  return slug ? `/product-details/${slug}` : "/products";
};

// For HTTP headers, sitemap and canonical URLs (must be ASCII).
export const productPathEncoded = (product) => {
  const slug = productSlug(product);
  return slug ? `/product-details/${encodeURIComponent(slug)}` : "/products";
};

// Route param → { slug, id }: `id` is set only for legacy /product-details/<mongo id> links.
export const parseProductParam = (param) => {
  let value = String(param || "");
  try {
    value = decodeURIComponent(value);
  } catch {
    // keep the raw value
  }
  value = value.normalize("NFC");
  return { slug: slugify(value), id: isObjectId(value) ? value.toLowerCase() : null };
};

// Find a product in a list by URL param: current slug, then a legacy id, then an old slug.
// Returns { product, canonical } — canonical=false means the caller should redirect.
export const findProductByParam = (products, param) => {
  const { slug, id } = parseProductParam(param);
  const list = Array.isArray(products) ? products : [];
  const bySlug = slug && list.find((p) => slugify(p?.slug) === slug);
  if (bySlug) return { product: bySlug, canonical: true };
  const byId = id && list.find((p) => String(p?._id) === id);
  // A product without a usable slug is served at its id (productSlug falls back to it).
  if (byId) return { product: byId, canonical: !slugify(byId.slug) };
  const byHistory =
    slug && list.find((p) => (p?.slugHistory || []).some((old) => slugify(old) === slug));
  if (byHistory) return { product: byHistory, canonical: false };
  return { product: null, canonical: false };
};

// Make `base` unique among `takenSlugs` (other products' slugs) by appending -2, -3, ...
export const uniqueSlug = (base, takenSlugs) => {
  const taken = new Set((takenSlugs || []).map(slugify).filter(Boolean));
  const root = slugify(base) || "product";
  if (!taken.has(root)) return root;
  for (let n = 2; ; n += 1) {
    const suffix = `-${n}`;
    const candidate = `${root.slice(0, MAX_SLUG_LENGTH - suffix.length).replace(/-+$/, "")}${suffix}`;
    if (!taken.has(candidate)) return candidate;
  }
};

// Same URL shape the storefront category links use (Navbar / Offcanvas / CategoryDrawer).
export const categoryPath = (category) =>
  `/products/category=${String(category?.name || "")
    .replace(/\s+/g, "")
    .toLowerCase()}=${category?._id}`;
