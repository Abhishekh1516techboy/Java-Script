import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: Buffer,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Backpack",
        "Handbag",
        "School bag",
        "Laptop bag",
        "Wallet",
        "Camera bag",
        "Gym bag",
      ],
    },
    model: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    bgColor: {
      type: String,
      trim: true,
      default: "#ffffff",
      match: /^#([0-9A-F]{3}){1,2}$/i, // Valid hex color
    },
    panelColor: {
      type: String,
      trim: true,
      default: "#dadada",
      match: /^#([0-9A-F]{3}){1,2}$/i,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 500, // To store product descriptions
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User who gave the review
        },
        reviewText: {
          type: String,
          required: true,
          trim: true,
          minLength: 5,
          maxLength: 300,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        _id: false, // Disable auto-generated _id
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.Product || model("Product", productSchema);
