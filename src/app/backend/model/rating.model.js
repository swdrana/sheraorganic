// models/ProductRating.js
import mongoose from "mongoose";

const ProductRatingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const ProductRating =
  mongoose.models.ProductRating ||
  mongoose.model("ProductRating", ProductRatingSchema);
export default ProductRating;
