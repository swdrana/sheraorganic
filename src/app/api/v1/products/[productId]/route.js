import Product from "@/app/backend/model/product.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Order from "@/app/backend/model/order.model";
import { destroyImages } from "@/app/backend/utils/cloudinaryServer";
import User from "@/app/backend/model/user.model";
import Setting from "@/app/backend/model/setting.model";

//===== Delete single post by id =========
export const DELETE = async (req, { params }) => {
  connectDB();
  try {
    const { productId } = params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    void destroyImages([
      ...(deletedProduct.image || []),
      ...(deletedProduct.variants || [])
        .map((variant) => variant?.image)
        .filter(Boolean),
    ]);
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
    existingProduct.categories = updateProductData.categories || [];
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

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "লগইন করুন।" }, { status: 401 });
    }
    const { rating, comment } = await req.json();
    const numRating = Number(rating);
    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { message: "রেটিং ১-৫ হতে হবে।" },
        { status: 400 }
      );
    }
    if (!comment || !String(comment).trim()) {
      return NextResponse.json(
        { message: "কমেন্ট লিখুন।" },
        { status: 400 }
      );
    }

    const { productId } = params;
    const delivered = await Order.exists({
      user: userId,
      status: "Delivered",
      $or: [{ "cart._id": productId }, { "cart.productId": productId }],
    });
    if (!delivered) {
      return NextResponse.json(
        { message: "শুধু ডেলিভারি হওয়া পণ্যে রিভিউ দেওয়া যায়।" },
        { status: 403 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Check if the user has already rated the product
    const existingRating = product.ratings.find(
      (review) => review.user && review.user.equals(userId)
    );

    if (existingRating) {
      // Update existing rating
      existingRating.rating = numRating;
      existingRating.comment = String(comment).trim();
      existingRating.productId = productId;
      existingRating.name = session.user.name;
      existingRating.reviewDate = new Date();
    } else {
      // Add new rating
      product.ratings.push({
        user: userId,
        rating: numRating,
        comment: String(comment).trim(),
        productId,
        name: session.user.name,
      });
    }

    // Calculate new average rating
    const totalRatings = product.ratings.reduce(
      (total, review) => total + Number(review.rating),
      0
    );
    product.averageRating =
      Math.round((totalRatings / product.ratings.length) * 10) / 10;

    await product.save();
    if (!existingRating) {
      const settingDoc = await Setting.findOne({
        name: "storeCustomizationSetting",
      }).sort({ createdAt: 1 });
      const home = settingDoc?.setting?.home || {};
      if (home.review_gift_enabled && home.review_gift_product?.id) {
        const user = await User.findById(userId);
        const alreadyGranted = user?.pendingGifts?.some(
          (gift) => gift.grantedForProductId === productId
        );
        if (user && !alreadyGranted) {
          user.pendingGifts.push({
            productId: home.review_gift_product.id,
            grantedForProductId: productId,
          });
          await user.save();
        }
      }
    }
    return NextResponse.json(
      { message: "রিভিউ সফলভাবে যুক্ত হয়েছে।" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ProductDetails Error: ${error.message}` },
      { status: 500 }
    );
  }
};
