import express from "express";
import User from "../models/User.js";
import { jwtAuthMiddleware, generateJwtToken } from "../jwt.js";
import {
  //   formatAadharNumber,
  validateAadhar,
  validateEmail,
  validateAge,
  validateGender,
  validatePhone,
  validatePassword,
  validatePinCode,
} from "../helpers/validators.js";
const router = express.Router();

// User SignUp Post Routes
router.post("/auth/signup", async (req, res) => {
  try {
    // Body contains form data
    const data = req.body;

    //check form data is available in body or not
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(data.aadharNumber);
    validateEmail(data.email);
    validateAge(data.age);
    validateGender(data.gender);
    validatePhone(data.phone);
    validatePassword(data.password);
    validatePinCode(data.address.pinCode);

    // Check if user already exists by Unique Aadhar Number
    const existingUser = await User.findOne({ aadharNumber: data.aadharNumber});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    // Create new newUser document using mongoose model
    const newUser = new User(data);

    // Save to MongoDB
    await newUser.save();

    // Create JWT payload
    const payload = {
      id: newUser.id,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // Respond with the saved User
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        gender: newUser.gender,
        email: newUser.email,
      },
      authToken: token,
    });
  } catch (error) {
    console.error("Error saving User:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: errors, // Array of specific validation errors
      });
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to save User" });
  }
});

// Login Route with Passport and JWT Token
router.post("/auth/login", async (req, res) => {
  try {
    // Extract the aadharNumber and password from req.body
    const { aadharNumber, password } = req.body;

     //check form data is available in body or not
     if (!aadharNumber && !password) {
      return res.status(400).json({ error: "Form data is required" });
    }


    // Apply validations (errors thrown here are caught below)
    validateAadhar(aadharNumber);
    const validatedPassword = validatePassword(password);


    // Find the user by aadharNumber
    const user = await User.findOne({ aadharNumber: aadharNumber }).select("+password");

    // If user does not exist or password does not matched, return error
    if (!user || !(await user.comparePassword(validatedPassword))) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: user.id,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // return JWT token as response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        gender: user.gender,
        email: user.email,
      },
      authToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);

      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          path: err.path,
          message: err.message,
        }));
        return res.status(400).json({
          message: "Validation failed",
          errors: errors, // Array of specific validation errors
        });
      }
  
      // Handle custom validation errors from validators.js
      if (error.message.includes("Invalid")) {
        return res.status(400).json({ message: error.message });
      }

    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
