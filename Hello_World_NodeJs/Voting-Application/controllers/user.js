import User from "../models/User.js";
import { generateJwtToken } from "../jwt.js";
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

export const signUp = async (req, res) => {
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
    const existingUser = await User.findOne({
      aadharNumber: data.aadharNumber,
    });
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
};

export const login = async (req, res) => {
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
    const user = await User.findOne({ aadharNumber: aadharNumber }).select(
      "+password"
    );

    // If user does not exist or password does not matched, return error
    if (!user || !(await user.comparePassword(validatedPassword))) {
      return res.status(401).json({ error: "Invalid username OR password!" });
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: user.id,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // Redirect to profile route using user's _id as the slug
    const profileUrl = `/user/profile/${user.id}`;

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
      redirect: profileUrl,
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
};

export const profile = async (req, res) => {
  try {
    // Extract the userId from the route parameter
    const userId = req.params.id;

    // Get the authenticated user's ID from JWT
    const authUserId = req.user.id;

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this profile" });
    }

    //find user by userId
    const user = await User.findById(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // return user response
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error during profile retrieval" });
  }
};

export const passwordChange = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the User ID from URL parameters

    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to Change this password." });
    }

    const { oldPassword, newPassword } = req.body; // Get the data from the request body for change User password

    //check form data is available in body or not
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both oldPassword and newPassword are required" });
    }

    // Apply validations (errors thrown here are caught below)
    const validatedOldPassword = validatePassword(oldPassword);
    const validatedNewPassword = validatePassword(newPassword);

    // check if oldPassword and newPasswor are same
    if (validatedOldPassword === validatedNewPassword) {
      return res
        .status(400)
        .json({ error: "New password must differ from old password" });
    }

    // Find the user by id
    const user = await User.findById(userId).select("+password");

    // Returns 404 if no document matches the provided ID
    if (!user) {
      return res.status(404).json({
        error: "User not found in DataBase",
      });
    }

    // If password does not matched, return error
    if (!(await user.comparePassword(validatedOldPassword))) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    user.password = validatedNewPassword; // Set the new password
    await user.save(); // Save password after change

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "User Password changed successfully",
      user: user.id,
    });
  } catch (error) {
    console.error("User Password-change error:", error);

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

    // Catch any errors during database operation
    res.status(500).json({
      error: "Failed to Changed User Password",
    });
  }
};
