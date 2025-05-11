import User from "../models/user-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

import {
  validateAadhar,
  validateEmail,
  validateAge,
  validateGender,
  validatePhone,
  validatePassword,
  validatePinCode,
} from "../helpers/validators.js";

// ********************** /user **********************
export const profile = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Extract the userId from the route parameter
    const userId = req.params.id;

    // Get the authenticated user's ID from JWT
    const authUserId = req.user.id;

    // Check if the requested userId matches the authenticated user's ID
    if (userId !== authUserId) {
      req.flash("error", "You are not authorized to view this profile");
      return res.redirect("/");
    }

    //find user by userId
    const user = await User.findById(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // set user is login
    let isLogin = false;
    if (authUserId) {
      isLogin = true;
    }

    // return user response
    res.render("Profile", {
      user,
      error,
      success,
      authPage: true,
      isLogin,
      wishlistCount: 5,
      cartCount: 2, // Example cart count
    });
  } catch (error) {
    console.error("Profile error:", error);
    req.flash("error", "Server error during profile retrieval");
    return res.redirect("/");
  }
};

// export const passwordChange = async (req, res) => {
//   try {
//     const userId = req.params.id; // Extract the User ID from URL parameters

//     const authUserId = req.user.id; // Get the authenticated user's ID from JWT

//     // Check if the requested userId matches the authenticated user's ID
//     if (userId !== authUserId) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to Change this password." });
//     }

//     const { oldPassword, newPassword } = req.body; // Get the data from the request body for change User password

//     //check form data is available in body or not
//     if (!oldPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ error: "Both oldPassword and newPassword are required" });
//     }

//     // Apply validations (errors thrown here are caught below)
//     const validatedOldPassword = validatePassword(oldPassword);
//     const validatedNewPassword = validatePassword(newPassword);

//     // check if oldPassword and newPasswor are same
//     if (validatedOldPassword === validatedNewPassword) {
//       return res
//         .status(400)
//         .json({ error: "New password must differ from old password" });
//     }

//     // Find the user by id
//     const user = await User.findById(userId).select("+password");

//     // Returns 404 if no document matches the provided ID
//     if (!user) {
//       return res.status(404).json({
//         error: "User not found in DataBase",
//       });
//     }

//     // If password does not matched, return error
//     if (!(await user.comparePassword(validatedOldPassword))) {
//       return res.status(401).json({ error: "Incorrect old password" });
//     }

//     user.password = validatedNewPassword; // Set the new password
//     await user.save(); // Save password after change

//     // Success response with status 200 and updated User data
//     res.status(200).json({
//       message: "User Password changed successfully",
//       user: user.id,
//     });
//   } catch (error) {
//     console.error("User Password-change error:", error);

//     // Handle Mongoose validation errors
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => ({
//         path: err.path,
//         message: err.message,
//       }));
//       return res.status(400).json({
//         message: "Validation failed",
//         errors: errors, // Array of specific validation errors
//       });
//     }

//     // Handle custom validation errors from validators.js
//     if (error.message.includes("Invalid")) {
//       return res.status(400).json({ message: error.message });
//     }

//     // Catch any errors during database operation
//     res.status(500).json({
//       error: "Failed to Changed User Password",
//     });
//   }
// };

// ********************** /admin/manage/u **********************
// export const getAllUsers = async (req, res) => {
//   try {
//     // Fetch AllUsers from Database
//     const users = await User.find({ role: { $ne: "admin" } });
//     // Respond with the find User
//     res.status(200).json({
//       message: "User Data found successfully",
//       user: users,
//     });
//   } catch (error) {
//     console.error("Error finding User:", error);
//     res.status(500).json({ message: "Failed to find User" });
//   }
// };

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
