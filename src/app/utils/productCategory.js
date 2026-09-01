export const normalizeCategory = (value) =>
  (value || "").replace(/\s+/g, "").toLowerCase();

export const productCategoryList = (product) =>
  product?.categories?.length
    ? product.categories
    : product?.category
      ? [product.category]
      : [];

export const productMatchesCategory = (product, normalizedName) =>
  productCategoryList(product).some(
    (category) => normalizeCategory(category) === normalizedName
  );
