// models/Product.js
import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Color", "Size"
  value: { type: String, required: true }, // e.g., "Red", "Large"
});

const variantSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  attributes: [attributeSchema], // Array of attributes
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number }, // Main product price (for non-variant products)
  stock: { type: Number }, // Main product stock (for non-variant products)
  variants: [variantSchema], // Array of variants (optional)
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
