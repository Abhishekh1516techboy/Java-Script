import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const StudentSchema = new Schema(
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
    email: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
      lowercase: true, // Normalize email
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
      match: /^[6-9][0-9]{9}$/, // Indian phone number: 10 digits, starting with 6-9
      select: false, // Prevent phone from being returned in queries
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: Number,
      required: true,
      trim: true,
      min: 100000, // Enforce 6-digit pin code range
      max: 999999,
    },
    photo: {
      type: String, // store base64 type encoded data
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.Student || model("Student", StudentSchema);
