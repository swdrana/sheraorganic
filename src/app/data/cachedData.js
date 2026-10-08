import connectDB from "@/app/utils/database";
import Setting from "@/app/backend/model/setting.model";
import Product from "@/app/backend/model/product.model";
import Category from "@/app/backend/model/category.model";
import Blog from "@/app/backend/model/blog.model";
import Brand from "@/app/backend/model/brands.model";
import Attribute from "@/app/backend/model/attributes.model";
import Order from "@/app/backend/model/order.model";
import User from "@/app/backend/model/user.model";
import { unstable_cache } from "next/cache";
import { timed } from "@/app/backend/utils/perf";

// Public, non-personalised data shared by RSC pages and the public GET API routes.
// Every write path must call revalidateTag(<tag>) (see CACHE_TAGS) so admin edits show up
// immediately; REVALIDATE is only a safety net for out-of-band DB edits.
// Loaders throw on DB errors so a failure is never cached; the safe* wrappers below return
// fallbacks for pages.
export const CACHE_TAGS = {
  settings: "settings",
  products: "products",
  categories: "categories",
  brands: "brands",
  attributes: "attributes",
  blogs: "blogs",
  stats: "stats",
};
const REVALIDATE = 300;

// Queries return Mongoose documents (not .lean()) so defaults and toJSON output match the old
// API responses.

// Next 14 silently skips caching entries over 2MB (every call would then hit the DB again).
const CACHE_WARN_BYTES = 1.5 * 1024 * 1024;

const load = (label, query) =>
  timed(`db:${label}`, async () => {
    await connectDB();
    const json = JSON.stringify(await query());
    if (json.length > CACHE_WARN_BYTES) {
      console.warn(`[cache] ${label} is ${json.length} bytes; near the 2MB data-cache limit`);
    }
    return JSON.parse(json);
  });

export const getCachedSettingDoc = unstable_cache(
  () =>
    load("settings", () =>
      Setting.findOne({ name: "storeCustomizationSetting" }).sort({ createdAt: 1 })
    ),
  ["store-setting-doc"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.settings] }
);

export const getCachedProductList = unstable_cache(
  () => load("products", () => Product.find().sort({ _id: -1 })),
  ["store-product-list"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.products] }
);

export const getCachedProductDoc = unstable_cache(
  (id) => load(`product:${id}`, () => Product.findById(id)),
  ["store-product-doc"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.products] }
);

export const getCachedCategoryList = unstable_cache(
  () => load("categories", () => Category.find().sort({ _id: -1 })),
  ["store-category-list"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.categories] }
);

export const getCachedBrandList = unstable_cache(
  () => load("brands", () => Brand.find().sort({ _id: -1 })),
  ["store-brand-list"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.brands] }
);

export const getCachedAttributeList = unstable_cache(
  () => load("attributes", () => Attribute.find().sort({ _id: -1 })),
  ["store-attribute-list"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.attributes] }
);

export const getCachedBlogList = unstable_cache(
  () => load("blogs", () => Blog.find().sort({ _id: -1 })),
  ["store-blog-list"],
  { revalidate: REVALIDATE, tags: [CACHE_TAGS.blogs] }
);

// Aggregate counts for the About page (no personal data leaves the server).
export const getCachedStoreStats = unstable_cache(
  () =>
    timed("db:stats", async () => {
      await connectDB();
      const [products, orders, delivered, customers] = await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        Order.countDocuments({ status: "Delivered" }),
        User.countDocuments({ role: "Customer" }),
      ]);
      return { products, orders, delivered, customers };
    }),
  ["store-stats"],
  { revalidate: 600, tags: [CACHE_TAGS.stats] }
);

const safe = (label, loader, fallback) => async (...args) => {
  try {
    return (await loader(...args)) ?? fallback;
  } catch (e) {
    console.error(`Error loading ${label}:`, e?.message || e);
    return fallback;
  }
};

export const getCachedSettings = async () =>
  (await safe("settings", getCachedSettingDoc, null)())?.setting || null;
export const getCachedProducts = safe("products", getCachedProductList, []);
export const getCachedProductById = safe("product", getCachedProductDoc, null);
export const getCachedCategories = safe("categories", getCachedCategoryList, []);
export const getCachedBlogs = safe("blogs", getCachedBlogList, []);
export const getStoreStats = safe("stats", getCachedStoreStats, null);
