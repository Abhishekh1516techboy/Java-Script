import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Added bcrypt import

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "chef",
        "waiter",
        "manager",
        "cleaner",
        "receptionist",
        "customer",
      ],
      required: true,
    },
    salary: {
      type: Number,
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
