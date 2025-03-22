import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },
    updateDate: {
      type: Date,
      required: false,
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
const Blog = models?.Blog || model("Blog", BlogSchema);

export default Blog;
