import { Schema, mongoose } from "mongoose";

const orderSchema = new Schema(
  {
    clientToken: {
      type: String,
      required: false,
    },
    accessToken: {
      type: String,
      required: false,
      select: false,
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
// (my-account, review reminder) and date range (admin reports). Non-unique on purpose so
// index builds can never fail on legacy data.
orderSchema.index({ orderCode: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ createdAt: -1 });
// Checkout idempotency: one order per clientToken, so two simultaneous submits of the same checkout
// cannot both save (the loser gets E11000 and POST /api/v1/orders returns the winner's order).
// Partial (string tokens only) so orders without a token never conflict. Separately named so it does
// not clash with the old non-unique `clientToken_1` index. If legacy duplicate tokens exist, the
// background index build just fails (logged) and the app keeps working with the findOne check alone.
orderSchema.index(
  { clientToken: 1 },
  {
    unique: true,
    name: "clientToken_unique",
    partialFilterExpression: { clientToken: { $type: "string" } },
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
