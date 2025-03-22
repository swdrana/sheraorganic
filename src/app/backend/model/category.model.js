import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },

    icon: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = models?.Category || model("Category", categorySchema);

export default Category;
