import { Schema, model, models } from "mongoose";

const BrandsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: true,
  }
);
const Brand = models?.brand || model("brand", BrandsSchema);

export default Brand;
