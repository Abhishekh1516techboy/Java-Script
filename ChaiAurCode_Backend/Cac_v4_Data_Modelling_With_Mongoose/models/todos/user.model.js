import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Normalize email
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // Prevent password from being returned in queries
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
