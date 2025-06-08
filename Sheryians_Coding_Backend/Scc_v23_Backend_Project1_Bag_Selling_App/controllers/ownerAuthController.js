import Owner from "../models/owner-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import {
  validateGstin,
  validateAadhar,
  validateEmail,
  validateGender,
  validatePassword,
} from "../helpers/validators.js";

// Render owner signUp page only in Development Mode
export const signUpPage = (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  let user = null;
  if (req.cookies?.token) {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    user = decoded;
  }

  // only render in Development Mode
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).render("error", {
      error: "Owner signup is not allowed in Production environment",
    });
  }

  res.render("ownerSignUp", {
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
    // Restrict Owner signup to Production environment
    if (process.env.NODE_ENV !== "development") {
      req.flash(
        "error",
        "Owner signup is only allowed in development environment"
      );
      return res.redirect("/");
    }

    const { name, gender, email, gstin, aadharNumber, password } = req.body;

    // Check if form data is provided
    if (!req.body || Object.keys(req.body).length === 0) {
      req.flash("error", "Form data is required");
      return res.redirect("/owners/auth/signup");
    }

    // Apply validations
    validateAadhar(aadharNumber);
    validateGender(gender);
    validateEmail(email);
    validateGstin(gstin);
    validatePassword(password);

    // Check for existing owner (single-owner rule)
    const ownerCount = await Owner.countDocuments();
    if (ownerCount > 0) {
      req.flash("error", "An owner already exists. Only one owner is allowed!");
      return res.redirect("/owners/auth/signup");
    }

    // Create and save new owner
    const newOwner = new Owner({
      name,
      gender,
      email,
      gstin,
      aadharNumber,
      password,
    });

    // save newOwner in DB
    await newOwner.save();

    // Create JWT payload
    const payload = {
      id: newOwner._id,
      email: newOwner.email,
      isOwner: newOwner.isOwner,
    };

    // Generate JWT token
    const token = generateToken(payload);

    // set token in cookie
    res.cookie("token", token);

    // Show Flash message
    req.flash("success", "Sign-Up & auto-login successfully!");

    // Redirect to Owner profile (auto-login)
    return res.redirect("/owners/profile");
  } catch (error) {
    console.error("Error saving Owner:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      req.flash("error", `Validation failed: ${errors}`);
      return res.redirect("/owners/auth/signup");
    }

    // Handle custom validation errors
    if (error.message.includes("Invalid")) {
      req.flash("error", `${error.message}`);
      return res.redirect("/owners/auth/signup");
    }

    req.flash("error", "Failed to save Owner");
    return res.redirect("/owners/auth/signup");
  }
};

// Render owner login page
export const loginPage = (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  let user = null;
  if (req.cookies?.token) {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    user = decoded;
  }

  res.render("ownerLogin", {
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
    // Extract the aadharNumber and password from req.body
    const { email, aadharNumber, password } = req.body;

    //check form data is available in body or not
    if (!email && !aadharNumber && !password) {
      req.flash("error", "Email, Aadhar number and password are required");
      return res.redirect("/owners/auth/login");
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(aadharNumber);
    const validatedPassword = validatePassword(password);

    // Find owner by email and aadharNumber (include password field)
    const owner = await Owner.findOne({
      $and: [{ email }, { aadharNumber }],
    }).select("+password");

    // If user does not exist or password does not matched, return error
    if (!owner || !(await owner.comparePassword(validatedPassword))) {
      req.flash("error", "Invalid Credentials!");
      return res.redirect("/owners/auth/login");
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: owner._id,
      email: owner.email,
      isOwner: owner.isOwner,
    };

    // Generate JWT token
    const token = generateToken(payload);

    // set token in cookie
    res.cookie("token", token);

    // Show Flash message
    req.flash("success", "Log In successfully!");

    // Redirect to profile route using after Loginin success
    return res.redirect("/owners/profile");
  } catch (error) {
    console.error("Login error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      req.flash("error", `Validation failed: ${errors}`);
      return res.redirect("/owners/auth/login");
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      req.flash("error", error.message);
      return res.redirect("/owners/auth/login");
    }

    req.flash("error", "Server error during login");
    return res.redirect("/users/auth/login");
  }
};
