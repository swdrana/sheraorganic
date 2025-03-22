import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: false,
      default: "Customer",
      enum: [
        "Admin",
        "Super Admin",
        "Cashier",
        "Manager",
        "CEO",
        "Driver",
        "Security Guard",
        "Accountant",
        "Customer",
      ],
    },
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },
    joiningDate: {
      type: Date,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const User = models?.User || model("User", UserSchema);

export default User;
