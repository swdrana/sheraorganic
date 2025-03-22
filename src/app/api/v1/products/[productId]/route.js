import Product from "@/app/backend/model/product.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

//===== Delete single post by id =========
export const DELETE = async (req, { params }) => {
  connectDB();
  try {
    const { productId } = params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Deleting Error: ${error.message}` },
      { status: 500 }
    );
  }
};

// ======== update single product  ============
export const PATCH = async (req, { params }) => {
  connectDB();

  const updateProductData = await req.json();
  const { productId } = params;

  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Update product details
    existingProduct.name = updateProductData.name;
    existingProduct.category = updateProductData.category;
    existingProduct.des = updateProductData.des;
    existingProduct.currentPrice = updateProductData.currentPrice;
    existingProduct.previousPrice = updateProductData.previousPrice;
    existingProduct.status = updateProductData.status;
    existingProduct.brand = updateProductData.brand;
    existingProduct.videoUrl = updateProductData.videoUrl;
    existingProduct.flashSale = updateProductData.flashSale;

    await existingProduct.save();
    return NextResponse.json({
      message: "Product updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Updating Error: ${error.message}` },
      { status: 500 }
    );
  }
};

//======== single product details =========
export const GET = async (req, { params }) => {
  connectDB();
  try {
    const { productId } = params;
    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      return NextResponse.json(
        { error: "Product details not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { productDetails: productDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ProductDetails Error: ${error.message}` },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  connectDB();
  const data = await req.json();
  const { user, rating, comment, name } = data;

  try {
    const { productId } = params;
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Check if the user has already rated the product
    const existingRating = product.ratings.find(
      (r) => r.user && r.user.equals(user)
    );

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      existingRating.productId = productId;
      existingRating.name = name;
    } else {
      // Add new rating
      product.ratings.push({ user, rating, comment, productId, name });
    }

    // Calculate new average rating
    const totalRatings = product.ratings.reduce((acc, r) => acc + r.rating, 0);
    product.averageRating = totalRatings / product.ratings.length;

    await product.save();
    return NextResponse.json(
      { message: "Rating updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ProductDetails Error: ${error.message}` },
      { status: 500 }
    );
  }
};
