import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18, // Assuming users must be adults
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Standardized options
    },
    email: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
      lowercase: true, // Normalize email
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: /^.{8,}$/, // At least 8 characters
      select: false, // Prevent password from being returned in queries
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        index: true,
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        index: true,
      },
    ],
    dislikedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        index: true,
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.User || model("User", UserSchema);
