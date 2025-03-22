import Product from "@/app/backend/model/product.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all products
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const products = await Product.find().sort({ _id: -1 });
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
    const newProduct = new Product({
      // set every value individually

      name: data.name,
      // productId: data.productId ? data.productId : mongoose.Types.ObjectId(),
      sku: data.sku,
      barcode: data.barcode,
      description: data.description,
      category: data.category,
      image: data.image,
      tag: data.tag,
      prices: data.prices,
      isCombination: data.isCombination,
      variants: data.variants,
      slug: data.slug,
      stock: data.stock,
      brand: data.brand,
      videoUrl: data.videoUrl,
      flashSale: data.flashSale,
    });
    // console.log("new product...", newProduct);
    const product = await newProduct.save();
    return NextResponse.json({ message: "success", product });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
