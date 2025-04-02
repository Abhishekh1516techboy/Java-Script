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

// ********************** /admin **********************
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

    // Check if an admin already exists in the database
    const adminExist = await User.findOne({ role: "admin" });

    if (adminExist) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. Only one admin is allowed.",
      });
    }

    // Check if user already exists by Unique Aadhar Number
    const existingAdmin = await User.findOne({
      aadharNumber: data.aadharNumber,
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin Already exists" });
    }

    // Create new newAdmin document using mongoose model
    const newAdmin = new User(data);

    // Save to MongoDB
    await newAdmin.save();

    // Create JWT payload
    const payload = {
      id: newAdmin.id,
      role: newAdmin.role,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // Respond with the saved User
    res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: newAdmin.id,
        name: newAdmin.name,
        gender: newAdmin.gender,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      authToken: token,
    });
  } catch (error) {
    console.error("Error saving Admin:", error);

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

    res.status(500).json({ message: "Failed to save Admin" });
  }
};

export const login = async (req, res) => {
  try {
    // Extract the aadharNumber and password from req.body
    const { aadharNumber, password } = req.body;

    //check form data is available in body or not
    if (!aadharNumber && !password) {
      return res.status(400).json({
        success: false,
        message: "Aadhar number and password are required",
      });
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(aadharNumber);
    const validatedPassword = validatePassword(password);

    // Find the user by aadharNumber and include password field
    const admin = await User.findOne({ aadharNumber: aadharNumber }).select(
      "+password"
    );

    // If user does not exist or password does not matched, return error
    if (!admin || !(await admin.comparePassword(validatedPassword))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Aadhar number or password" });
    }

    // Check if the user is an admin
    if (admin.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You are not an admin. Please login as a user",
      });
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: admin.id,
      role: admin.role,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // Redirect to profile route using after Loginin success
    const profileUrl = `/admin/profile`;

    // return JWT token as response
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      user: {
        id: admin.id,
        name: admin.name,
        gender: admin.gender,
        email: admin.email,
        role: admin.role,
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
    // Get the authenticated user's ID from JWT
    const authAdminId = req.user.id;

    //find user by userId
    const admin = await User.findById(authAdminId).select("-hasVoted -votedCandidateId -votedParty -votedAt");

    // if user not found
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // return user response
    res.status(200).json({ admin });
  } catch (error) {
    console.error("Admin Profile error:", error);
    res
      .status(500)
      .json({ message: "Server error during Admin profile retrieval" });
  }
};

export const passwordChange = async (req, res) => {
  try {

    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    const { oldPassword, newPassword } = req.body; // Get the data from the request body for change admin password

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
    const admin = await User.findById(authUserId).select("+password");

    // Returns 404 if no document matches the provided ID
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found in DataBase",
      });
    }

    // If password does not matched, return error
    if (!(await admin.comparePassword(validatedOldPassword))) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    admin.password = validatedNewPassword; // Set the new password
    await admin.save(); // Save password after change

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "Admin Password changed successfully",
      admin: admin.id,
    });
  } catch (error) {
    console.error("Admin Password-change error:", error);

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
      error: "Failed to Changed Admin Password",
    });
  }
};
