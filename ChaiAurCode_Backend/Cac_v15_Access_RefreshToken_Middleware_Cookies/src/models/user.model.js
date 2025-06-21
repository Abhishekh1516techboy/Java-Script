import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores, with no spaces",
      ],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: [true, "Avatar is required"],
      trim: true,
      validate: {
        validator: function (url) {
          return /^https?:\/\/res\.cloudinary\.com\/.*$/.test(url);
        },
        message: "Invalid Cloudinary URL for avatar",
      },
    },
    coverImage: {
      type: String, // Cloudinary URL
      trim: true,
      validate: {
        validator: function (url) {
          return !url || /^https?:\/\/res\.cloudinary\.com\/.*$/.test(url);
        },
        message: "Invalid Cloudinary URL for cover image",
      },
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Exclude password from queries by default
    },
    refreshToken: {
      type: String,
      select: false, // Exclude refreshToken from queries by default
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  try {
    // Skip hashing if password is not modified
    if (!this.isModified("password")) {
      return next();
    }

    // Generate salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare input password with stored hash
userSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password);
  } catch (error) {
    throw new Error(`Password comparison failed: ${error.message}`);
  }
};

// Method for generate JWT token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefereshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Index for faster queries
userSchema.index({ userName: 1, email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
