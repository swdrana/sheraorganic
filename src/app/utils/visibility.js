// Admin "show/hide" status shared by categories, products and brands. A missing status counts as
// visible so older documents keep showing. Admin and storefront read the same APIs/loaders, so
// filter on the storefront side only (admin must still see hidden items).
export const isVisible = (item) => !!item && item.status !== "hide";

export const onlyVisible = (list) => (Array.isArray(list) ? list.filter(isVisible) : []);

const linkName = (value) => String(value || "").replace(/\s+/g, "").toLowerCase();

// `/products/category=<name>=<id>` (and `brands=`) links: true only when the link points at a hidden
// item and no visible item shares that link name. Unknown names are not "hidden".
export function isHiddenListing(list, name, id) {
  const items = Array.isArray(list) ? list : [];
  const wanted = linkName(name);
  const byId = id ? items.find((item) => String(item?._id) === String(id)) : null;
  if (byId) return !isVisible(byId);
  const matches = items.filter((item) => item && linkName(item.name) === wanted);
  return matches.length > 0 && !matches.some(isVisible);
}
