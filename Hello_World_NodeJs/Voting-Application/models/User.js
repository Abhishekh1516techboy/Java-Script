import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Added bcrypt import

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
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
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
      match: /^[6-9][0-9]{9}$/, // Indian phone number: 10 digits, starting with 6-9
      select: false, // Prevent phone from being returned in queries
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      match: /^[2-9]{1}[0-9]{11}$/, // Aadhar number must be a 12-digit number starting with 2-9
      index: true, // Optimize lookups
      select: false, // Hide by default in queries
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: /^.{8,}$/, // At least 8 characters
      select: false, // Prevent password from being returned in queries
    },
    address: {
      state: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pinCode: {
        type: Number,
        required: true,
        trim:true,
        min: 100000, // Enforce 6-digit pin code range
        max: 999999,
      },
    },
    role: {
      type: String,
      enum: ["voter", "admin"],
      required: true,
      default: "voter",
    },
    hasVoted: {
      type: Boolean,
      default: false,
      index: true, // For faster queries on voting status
    },
    votedCandidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate", // References Candidate can you voted
      default: null,
      index: true, // For faster queries
    },
    votedParty: {
      type: String,
      default: null,
    },
    votedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
      return next();
    }

    // Generate hash with salt rounds of 10
    const salt = await bcrypt.genSalt(10);
    // password encryption and save
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add comparePassword method for matching password by user and database stored password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Export the model, using `User` as the model name
export default models.User || model("User", UserSchema);
