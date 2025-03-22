import { Schema, mongoose } from "mongoose";

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
    },
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
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: false,
    },

    image: {
      type: Array,
      required: false,
    },
    stock: {
      type: Number,
      required: false,
    },
    reward_points: {
      type: Number,
      required: false,
    },
    flashSale: {
      type: Boolean,
      require: false,
    },

    sales: {
      type: Number,
      required: false,
    },

    tag: [String],
    prices: {
      originalPrice: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: false,
    },

    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        productId: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        rating: {
          type: Number,
          required: false,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: false,
        },
        reviewDate: {
          type: Date,
          default: Date.now, // Automatically sets to the current date and time
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
