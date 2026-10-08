import { Schema, mongoose } from "mongoose";

const orderSchema = new Schema(
  {
    clientToken: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    invoice: {
      type: Number,
      required: false,
    },
    cart: [{}],
    user_info: {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      contact: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    taxes: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingOption: {
      type: String,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cardInfo: {
      type: Object,
      required: false,
    },
    orderCode: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancel"],
    },
  },
  {
    timestamps: true,
  }
);
// Lookups done on every storefront visit / order: by code (invoice, tracking), by user
// (my-account, review reminder), idempotency token (checkout), and date range (admin reports).
// Non-unique on purpose so index builds can never fail on legacy data.
orderSchema.index({ orderCode: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ clientToken: 1 }, { sparse: true });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
