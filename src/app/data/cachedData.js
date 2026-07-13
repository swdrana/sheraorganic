import connectDB from "@/app/utils/database";
import Setting from "@/app/backend/model/setting.model";
import Product from "@/app/backend/model/product.model";
import Category from "@/app/backend/model/category.model";
import Blog from "@/app/backend/model/blog.model";
import { unstable_cache } from "next/cache";

// Cache database customization settings for 60 seconds
export const getCachedSettings = unstable_cache(
  async () => {
    try {
      await connectDB();
      const storeCustomizationSetting = await Setting.findOne({
        name: "storeCustomizationSetting",
      });
      return storeCustomizationSetting?.setting || null;
    } catch (e) {
      console.error("Error fetching settings directly from DB:", e);
      return null;
    }
  },
  ["store-customization-settings-data"],
  { revalidate: 60, tags: ["settings"] }
);

// Cache database products for 60 seconds
export const getCachedProducts = unstable_cache(
  async () => {
    try {
      await connectDB();
      const products = await Product.find().sort({ _id: -1 }).lean();
      // Mongoose documents are not plain objects, converting to plain JSON for Next.js serialization
      return JSON.parse(JSON.stringify(products)) || [];
    } catch (e) {
      console.error("Error fetching products directly from DB:", e);
      return [];
    }
  },
  ["store-products-data"],
  { revalidate: 60, tags: ["products"] }
);

// Cache database categories for 60 seconds
export const getCachedCategories = unstable_cache(
  async () => {
    try {
      await connectDB();
      const categories = await Category.find().sort({ _id: -1 }).lean();
      return JSON.parse(JSON.stringify(categories)) || [];
    } catch (e) {
      console.error("Error fetching categories directly from DB:", e);
      return [];
    }
  },
  ["store-categories-data"],
  { revalidate: 60, tags: ["categories"] }
);

// Cache database blogs for 60 seconds
export const getCachedBlogs = unstable_cache(
  async () => {
    try {
      await connectDB();
      const blogs = await Blog.find().sort({ _id: -1 }).lean();
      return JSON.parse(JSON.stringify(blogs)) || [];
    } catch (e) {
      console.error("Error fetching blogs directly from DB:", e);
      return [];
    }
  },
  ["store-blogs-data"],
  { revalidate: 60, tags: ["blogs"] }
);
