import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const ownerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Standardized options
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      match: /^[6-9][0-9]{9}$/, // Indian phone number: 10 digits, starting with 6-9
      unique: true,
      select: false, // Prevent phone from being returned in queries
    },
    email: {
      type: String,
      trim: true,
      lowercase: true, // Normalize email
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      index: true, // Add index for faster lookups
    },
    address: {
      state: { type: String, trim: true },
      city: { type: String, trim: true },
      pinCode: {
        type: String,
        trim: true,
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
    isOwner: {
      type: Boolean,
      default: true,
    },
    gstin: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, // Valid GSTIN format
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[2-9]{1}[0-9]{11}$/, // Aadhar number must be a 12-digit number starting with 2-9
      select: false, // Hide by default in queries
      index: true, // Optimize lookups
    },
    bankDetails: {
      bankName: { type: String, trim: true },
      accountNumber: {
        type: String,
        trim: true,
        match: /^[0-9]{9,18}$/, // Indian bank accounts: 9 to 18 digits
      },
      ifscCode: {
        type: String,
        trim: true,
        match: /^[A-Z]{4}0[A-Z0-9]{6}$/i, // IFSC format
      },
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        category: {
          type: String,
          required: true,
          trim: true,
        },
        _id: false, // Disable auto-generated _id
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.Owner || model("Owner", ownerSchema);
