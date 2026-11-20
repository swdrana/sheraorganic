import { redirect } from "next/navigation";
import { getCachedBrands, getCachedCategories } from "@/app/data/cachedData";
import { isHiddenListing } from "@/app/utils/visibility";

// Old `/products/category=<name>=<id>` or `brands=` links to an item the admin has hidden go to the
// full product list. Visible and unknown items render as before.
export async function redirectIfHiddenListing([kind, name, id] = []) {
  if (kind !== "category" && kind !== "brands") return;
  const list = kind === "category" ? await getCachedCategories() : await getCachedBrands();
  if (isHiddenListing(list, name, id)) redirect("/products");
}
