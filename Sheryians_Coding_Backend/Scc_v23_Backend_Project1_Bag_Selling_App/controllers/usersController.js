import User from "../models/user-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

import {
  formatAadharNumber,
  hiddenAadharNumber,
  validateAadhar,
  validateEmail,
  validateAge,
  validateGender,
  validatePhone,
  validatePassword,
  validatePinCode,
} from "../helpers/validators.js";

// ********************** /user **********************
export const profilePage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Extract the userId from the route parameter
    const userId = req.params.id;

    // Get the authenticated user's ID from JWT
    const authUserId = req.user?.id;

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      req.flash("error", "You are not authorized to view this profile");
      return res.redirect("/");
    }

    //find user by userId
    const user = await User.findById(userId).select("+phone +aadharNumber");

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Formated Aadhar Number show like "xxxx-xxxx-6194" format
    user.hiddenAadharNumber = hiddenAadharNumber(user.aadharNumber);

    // if password Change show message
    if (req.session.passwordChanged) {
      success = ["Password changed successfully"];
      delete req.session.passwordChanged;
    }

    // if Profile-Update show message
    if (req.session.profileUpdate) {
      success = ["Profile-Update successfully"];
      delete req.session.profileUpdate;
    }

    // return user response
    res.render("Profile", {
      user,
      error,
      success,
      authPage: true,
      isLogin: !!user?._id,
      cartCount: user?.cart.length || 0,
      wishlistCount: 5,
    });
  } catch (error) {
    console.error("Profile error:", error);
    req.flash("error", "Server error during profile retrieval");
    return res.redirect("/");
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
    const user = await User.findById(userId).select("+password");

    // If user does not exist or password does not matched, return error
    if (!user || !(await user.comparePassword(validatedOldPassword))) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    user.password = validatedNewPassword; // Set the new password
    await user.save(); // Save password after change

    // In passwordChange
    req.session.passwordChanged = true;

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "User Password changed successfully",
      user: user._id,
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
    const userId = req.params.id; // Extract the User ID from URL parameters
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    const { name, phone, aadharNumber, age, address } = req.body;

    // Apply validations (errors thrown here are caught below)
    validatePhone(phone);
    validateAadhar(aadharNumber);
    validatePinCode(address.pinCode);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        aadharNumber,
        age,
        address: {
          state: address.state,
          city: address.city,
          pinCode: address.pinCode,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // In passwordChange
    req.session.profileUpdate = true;

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profileImageUpdate = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the User ID from URL parameters
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        picture: req.file?.buffer, // store image in Buffer
      },
      { new: true, runValidators: true }
    ).select("_id name picture");

    if (!updatedProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    // In passwordChange
    req.session.profileUpdate = true;

    res.status(200).json({
      message: "Profile image updated successfully",
      updatedProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to update profile image" });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     // Extract the :id parameter from the route
//     const UserId = req.params.id;
//     console.log(UserId);

//     // Attempt to find and permanently delete the User document from the database
//     const deletedUserData = await User.findByIdAndDelete(UserId);

//     // If no document is found with the given ID, return a 404 error
//     if (!deletedUserData) {
//       return res.status(404).json({
//         error: "User not found in DataBase", // Indicates the ID doesn't exist
//       });
//     }

//     // Returns status 200 with a message and the deleted User data
//     res.status(200).json({
//       message: "User data deleted successfully", // Confirmation message
//       user: deletedUserData, // Return the deleted document for reference
//     });
//   } catch (error) {
//     // Handle any errors that occur during the database operation
//     res.status(500).json({
//       error: "Failed to Delete User", // Generic error message for client
//     });
//   }
// };
