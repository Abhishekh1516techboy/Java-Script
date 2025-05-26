import Owner from "../models/owner-model.js";
import Products from "../models/product-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import {
  hiddenAadharNumber,
  hiddenGstinNumber,
  validateGstin,
  validateAadhar,
  validateEmail,
  validateAge,
  validateGender,
  validatePhone,
  validatePassword,
  validatePinCode,
} from "../helpers/validators.js";

// ********************** /owner controllers **********************

export const profile = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Get the authenticated owner's ID from JWT
    const authOwnerId = req.user.id;

    //find owner by userId
    const owner = await Owner.findById(authOwnerId).select(
      "+aadharNumber +phone"
    );

    // if owner not found
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // fetch All products new first
    const products = await Products.find().sort({ createdAt: -1 }); // Sort by createdAt

    // hidden Aadhar Number show like "xxxx-xxxx-6194" format
    owner.hiddenAadharNumber = hiddenAadharNumber(owner.aadharNumber);

    // hidden GSTIN Number show like "27A-xxxx-xxxx-F1Z5" format
    owner.hiddenGstin = hiddenGstinNumber(owner.gstin);

    // set owner is login
    let isLogin = false;
    if (authOwnerId) {
      isLogin = true;
    }

    // if password Change show message
    if (req.session.passwordChanged) {
      success = ["Password changed successfully"];
      delete req.session.passwordChanged;
    }

    // // if Profile-Update show message
    if (req.session.profileUpdate) {
      success = ["Profile-Update successfully"];
      delete req.session.profileUpdate;
    }

    // return user response
    res.render("ownerProfile", {
      user: owner,
      error,
      success,
      authPage: true,
      isLogin,
      wishlistCount: 5,
      cartCount: 2, // Example cart count
      products,
    });
  } catch (error) {
    console.error("Admin Profile error:", error);
    req.flash("error", "Server error during profile retrieval");
    return res.redirect("/");
  }
};

export const passwordChange = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (!authUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const { currentPassword, newPassword } = req.body; // Get the data from the request body for change User password

    //check form data is available in body or not
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both currentPassword and newPassword are required" });
    }

    // Apply validations (errors thrown here are caught below)
    const validatedOldPassword = validatePassword(currentPassword);
    const validatedNewPassword = validatePassword(newPassword);

    // check if oldPassword and newPasswor are same
    if (validatedOldPassword === validatedNewPassword) {
      return res
        .status(400)
        .json({ message: "New password must differ from old password" });
    }

    // Find the user by id
    const owner = await Owner.findById(authUserId).select("+password");

    // If user does not exist or password does not matched, return error
    if (!owner || !(await owner.comparePassword(validatedOldPassword))) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    owner.password = validatedNewPassword; // Set the new password
    await owner.save(); // Save password after change

    // In passwordChange
    req.session.passwordChanged = true;

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "User Password changed successfully",
      owner: owner._id,
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
    return res.status(500).json({
      message: "Failed to Changed User Password",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (!authUserId) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    const {
      name,
      gender,
      email,
      phone,
      gstIn,
      aadharNumber,
      address,
      bankDetails,
    } = req.body;

    // Apply validations (errors thrown here are caught below)
    validateEmail(email);
    validateGender(gender);
    validatePhone(phone);
    validateAadhar(aadharNumber);
    validatePinCode(address.pinCode);
    validateGstin(gstIn);

    const updatedUser = await Owner.findByIdAndUpdate(
      authUserId,
      {
        name,
        gender,
        email,
        phone,
        gstIn,
        aadharNumber,
        address: {
          state: address.state,
          city: address.city,
          pinCode: address.pinCode,
        },
        bankDetails: {
          bankName: bankDetails.bankName,
          accountNumber: bankDetails.accountNumber,
          ifscCode: bankDetails.ifscCode,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // In passwordChange
    req.session.profileUpdate = true;

    res
      .status(200)
      .json({ message: "Profile updated successfully", owners: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
