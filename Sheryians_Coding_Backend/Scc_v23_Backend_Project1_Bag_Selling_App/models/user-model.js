import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Standardized options
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      match: /^[6-9][0-9]{9}$/, // Indian phone number: 10 digits, starting with 6-9
      unique: true, // phone also unique
      select: false, // Prevent phone from being returned in queries
    },
    email: {
      type: String,
      trim: true,
      lowercase: true, // Normalize email
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      index: true,
    },
    address: {
      state: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pinCode: {
        type: String,
        required: true,
        match: /^[1-9][0-9]{5}$/,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: /^.{8,}$/, // At least 8 characters
      select: false, // Prevent password from being returned in queries
    },
    picture: {
      type: String,
      trim: true,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        status: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        total: {
          type: Number,
          required: true,
          min: 0,
        },
        paymentMethod: {
          type: String,
          enum: ["credit_card", "debit_card", "upi", "cod"],
          default: "cod",
        },
        shippingAddress: {
          state: { type: String, required: true, trim: true },
          city: { type: String, required: true, trim: true },
          addressLine: { type: String, required: true, trim: true },
          pinCode: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{5}$/,
          },
        },
        deliveryDate: { type: Date },
      },
    ],
    deliveredProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
          min: 0,
        },
        paymentMethod: {
          type: String,
          enum: ["credit_card", "debit_card", "upi", "cod"],
          default: "cod",
        },
        deliveryDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.User || model("User", userSchema);
