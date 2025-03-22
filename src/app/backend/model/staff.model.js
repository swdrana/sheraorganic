import { Schema, model, models } from "mongoose";

const StaffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
      default: "Admin",
      enum: [
        "Admin",
        "Super Admin",
        "Cashier",
        "Manager",
        "CEO",
        "Driver",
        "Security Guard",
        "Accountant",
      ],
    },
    password: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    joiningDate: {
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
const Staff = models?.Staff || model("Staff", StaffSchema);

export default Staff;
