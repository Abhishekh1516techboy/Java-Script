import mongoose from "mongoose";

// mini-Model order-Item Schema
const orderItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// order Schema
const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // previent negative numbers -4
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      typw: String,
      enum: ["PENDING", "CANCELLED", "DELEVERED"], // Only Choose this items
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
