import Product from "@/app/backend/model/product.model";
import { resolveProductSlug } from "@/app/backend/utils/productSlug";
import { cleanSeo } from "@/app/backend/utils/productSeo";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS, getCachedProductList } from "@/app/data/cachedData";

// get all products (served from the shared data cache; writes revalidate the tag)
export const GET = async () => {
  try {
    const products = await getCachedProductList();
    // console.log("products..", products);

    if (products?.length <= 0)
      return NextResponse.json({ error: "product not found" }, { status: 404 });

    return NextResponse.json(
      { message: "successfully get all products", products },
      { status: 200 }
    );
  } catch (error) {
    // console.log("error in product route", error);
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

// post request for products post | save a products in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log("product data", data);
  try {
    const slug = await resolveProductSlug({ requested: data.slug, name: data.name });
    const newProduct = new Product({
      // set every value individually

      name: data.name,
      // productId: data.productId ? data.productId : mongoose.Types.ObjectId(),
      sku: data.sku,
      barcode: data.barcode,
      description: data.description,
      ...cleanSeo(data),
      category: data.category,
      categories: data.categories || [],
      image: data.image,
      tag: data.tag,
      prices: data.prices,
      isCombination: data.isCombination,
      variants: data.variants,
      slug,
      stock: data.stock,
      brand: data.brand,
      videoUrl: data.videoUrl,
      flashSale: data.flashSale,
    });
    // console.log("new product...", newProduct);
    const product = await newProduct.save();
    revalidateTag(CACHE_TAGS.products);
    revalidateTag(CACHE_TAGS.stats);
    return NextResponse.json({ message: "success", product });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
