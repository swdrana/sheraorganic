"use server";
import connectDB from "@/app/utils/database";
import Product from "../model/product.model";
import mongoose from "mongoose";
import { destroyImages, diffRemoved } from "../utils/cloudinaryServer";

// category update
export async function productUpdate(id, updateProductData) {
  connectDB();
  // console.log("productId", id, "update ProductData", updateProductData);
  try {
    const product = await Product.findById(id);
    // console.log("product", product);

    if (product) {
      const previousImages = [
        ...(product.image || []),
        ...(product.variants || []).map((variant) => variant?.image).filter(Boolean),
      ];
      product.name = updateProductData.name;
      product.description = updateProductData.description;

      product.productId = updateProductData.productId;
      product.sku = updateProductData.sku;
      product.barcode = updateProductData.barcode;
      product.slug = updateProductData.slug;
      product.categories = updateProductData.categories || [];
      product.category =
        updateProductData.category || updateProductData.categories?.[0];
      product.show = updateProductData.show;
      product.isCombination = updateProductData.isCombination;
      product.variants = updateProductData.variants;
      product.stock = updateProductData.stock;
      product.prices = updateProductData.prices;
      product.image = updateProductData.image;
      product.tag = updateProductData.tag;
      product.brand = updateProductData.brand;
      product.videoUrl = updateProductData.videoUrl;
      product.flashSale = updateProductData.flashSale;

      await product.save();
      const nextImages = [
        ...(updateProductData.image || []),
        ...(updateProductData.variants || [])
          .map((variant) => variant?.image)
          .filter(Boolean),
      ];
      void destroyImages(diffRemoved(previousImages, nextImages));

      return { message: "product update successfully-2" };
    } else {
      return { message: "product not found" };
    }
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}

export async function productAdd(ProductData) {
  connectDB();
  // console.log("productId", id, "update ProductData", updateProductData);
  try {
    const newProduct = new Product({
      ...ProductData,
      productId: ProductData.productId
        ? ProductData.productId
        : new mongoose.Types.ObjectId(),
    });
    // console.log("new product...", newProduct);
    await newProduct.save();
    // console.log("product add...", product);

    return { message: "successfully" };
  } catch (err) {
    console.log("err in add product", err);
    return { message: err.message, status: 500 };
  }
}
