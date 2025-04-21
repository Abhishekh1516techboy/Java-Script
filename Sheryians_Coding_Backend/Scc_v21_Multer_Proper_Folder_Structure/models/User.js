import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
      lowercase: true, // Normalize email
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    profilePic: {
      type: String,
      required: true,
      trim: true,
      default: "default.png",
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.UserProfile || model("UserProfile", UserSchema);
