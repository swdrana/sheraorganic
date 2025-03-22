import mongoose from "mongoose"; // Correct import for mongoose
import { Schema } from "mongoose"; // You can also import Schema like this

const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

const Counter =
  mongoose?.models?.Counter || mongoose?.model("Counter", counterSchema);
export default Counter;
