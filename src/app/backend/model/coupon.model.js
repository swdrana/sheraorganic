import { Schema, model, models } from "mongoose";

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: false,
    },

    couponCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },
    endTime: {
      type: Date,
      required: false,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Coupon = models?.Coupon || model("Coupon", couponSchema);

export default Coupon;
