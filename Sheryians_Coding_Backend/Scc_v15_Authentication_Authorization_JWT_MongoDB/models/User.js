import mongoose from "mongoose";
// import bcrypt from "bcryptjs"; // Added bcrypt import

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true ,
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
      unique: true ,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: /^.{8,}$/, // At least 8 characters
      select: false, // Prevent password from being returned in queries
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Hash password before saving
// UserSchema.pre("save", async function (next) {
//   try {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // Generate hash with salt rounds of 10
//     const salt = await bcrypt.genSalt(10);
//     // password encryption and save
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Add comparePassword method for matching password by user and database stored password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     throw new Error("Password comparison failed");
//   }
// };

// Export the model, using `User` as the model name
export default models.UserAuth || model("UserAuth", UserSchema);
