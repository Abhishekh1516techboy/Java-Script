import User from "../models/user-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

import {
  validateEmail,
  validateGender,
  validatePhone,
  validatePassword,
} from "../helpers/validators.js";

// -------------------Render user signUp page-------------------
export const signUpPage = (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  let user;
  // Check if JWT token exists in cookies
  if (req.cookies?.token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;

      // Token is valid — redirect the user to their profile page
      return res.redirect(`/users/profile/${user.id}`);
    } catch (err) {
      // Token is invalid or expired — log the error and clear the cookie
      console.error("Invalid or expired token:", err.message);
      res.clearCookie("token"); // Remove invalid token from client
      return res.redirect("/login"); // Redirect to login page
    }
  }

  res.render("userSignUp", {
    authPage: true,
    error,
    success,
    user,
    isLogin: !!user?._id,
    cartCount: user?.cart?.length || 0,
    wishlistCount: user?.wishlist?.length || 0,
  });
};

export const signUp = async (req, res) => {
  try {
    // Body contains form data
    const { name, age, gender, email, phone, password } = req.body;

    //check form data is available in body or not
    if (!req.body || Object.keys(req.body).length === 0) {
      req.flash("error", "Form data is required");
      return res.redirect("/users/auth/signup");
    }

    // Apply validations (errors thrown here are caught below)
    validateGender(gender);
    validateEmail(email);
    validatePhone(phone);
    validatePassword(password);

    // Check if user already exists by Unique Aadhar Number
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists!");
      return res.redirect("/users/auth/signup");
    }

    // Create new newUser document using mongoose model
    const newUser = new User({
      name,
      age,
      gender,
      email,
      phone,
      password,
    });

    // Save to MongoDB
    await newUser.save();

    // Create JWT payload
    const payload = {
      id: newUser._id,
      email: newUser.email,
    };

    // Generate JWT token
    const token = generateToken(payload);

    // set token in cookie
    res.cookie("token", token);

    // Show Flash message
    req.flash("success", "Sign-Up & auto-login successfully!");

    // Redirect to Owner profile (auto-login)
    return res.redirect(`/users/profile/${newUser._id}`);
  } catch (error) {
    console.error("Error saving User:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      req.flash("error", `Validation failed: ${errors}`);
      return res.redirect("/users/auth/signup");
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      req.flash("error", `${error.message}`);
      return res.redirect("/users/auth/signup");
    }

    req.flash("error", "Failed to save User");
    return res.redirect("/users/auth/signup");
  }
};

// -------------------Render user login page-------------------
export const loginPage = (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  let user = null;
  // Check if JWT token exists in cookies
  if (req.cookies?.token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;

      // Token is valid — redirect the user to their profile page
      return res.redirect(`/users/profile/${user.id}`);
    } catch (err) {
      // Token is invalid or expired — log the error and clear the cookie
      console.error("Invalid or expired token:", err.message);
      res.clearCookie("token"); // Remove invalid token from client
      return res.redirect("/login"); // Redirect to login page
    }
  }

  res.render("userLogin", {
    authPage: true,
    error,
    success,
    user,
    isLogin: !!user?._id,
    cartCount: user?.cart?.length || 0,
    wishlistCount: user?.wishlist?.length || 0,
  });
};

export const login = async (req, res) => {
  try {
    // Extract the email and password from req.body
    const { email, password } = req.body;

    //check form data is available in body or not
    if (!email && !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/users/auth/login");
    }

    // Apply validations (errors thrown here are caught below)
    const validatedPassword = validatePassword(password);

    // Find the user by aadharNumber
    const user = await User.findOne({ email }).select("+password");

    // If user does not exist or password does not matched, return error
    if (!user || !(await user.comparePassword(validatedPassword))) {
      req.flash("error", "Invalid username or password!");
      return res.redirect("/users/auth/login");
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: user._id,
      email: user.email,
    };

    // Generate JWT token
    const token = generateToken(payload);

    // set token in cookie
    res.cookie("token", token);

    // Show Flash message
    req.flash("success", "Log In successfully!");

    // Redirect to profile route after Loginin success
    return res.redirect(`/users/profile/${user._id}`);
  } catch (error) {
    console.error("Login error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      req.flash("error", `Validation failed: ${errors}`);
      return res.redirect("/users/auth/login");
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      req.flash("error", error.message);
      return res.redirect("/users/auth/login");
    }
    req.flash("error", "Server error during login");
    return res.redirect("/users/auth/login");
  }
};
