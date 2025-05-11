import Owner from "../models/owner-model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import {
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
      "-products -bankDetails -aadharNumber -gstin -address"
    );

    // if owner not found
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // set owner is login
    let isLogin = false;
    if (authOwnerId) {
      isLogin = true;
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
    });
  } catch (error) {
    console.error("Admin Profile error:", error);
    res
      .status(500)
      .json({ message: "Server error during Owner profile retrieval" });
  }
};

// export const passwordChange = async (req, res) => {
//   try {
//     const authUserId = req.user.id; // Get the authenticated user's ID from JWT

//     const { oldPassword, newPassword } = req.body; // Get the data from the request body for change admin password

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
//     const admin = await User.findById(authUserId).select("+password");

//     // Returns 404 if no document matches the provided ID
//     if (!admin) {
//       return res.status(404).json({
//         error: "Admin not found in DataBase",
//       });
//     }

//     // If password does not matched, return error
//     if (!(await admin.comparePassword(validatedOldPassword))) {
//       return res.status(401).json({ error: "Incorrect old password" });
//     }

//     admin.password = validatedNewPassword; // Set the new password
//     await admin.save(); // Save password after change

//     // Success response with status 200 and updated User data
//     res.status(200).json({
//       message: "Admin Password changed successfully",
//       admin: admin.id,
//     });
//   } catch (error) {
//     console.error("Admin Password-change error:", error);

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
//       error: "Failed to Changed Admin Password",
//     });
//   }
// };
