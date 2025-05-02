import Owner from "../models/owner-model.js";
// import { generateJwtToken } from "../jwt.js";
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
// Render owner signUp page only in Development Mode
export const signUpPage = (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).render("error", {
      error: "Owner signup is not allowed in Production environment",
    });
  }
  res.render("ownerSignUp", {
    wishlistCount: 5,
    cartCount: 2, // Example cart count
  });
};

export const signUp = async (req, res) => {
  try {
    // Restrict Owner signup to Production environment
    if (process.env.NODE_ENV !== "development") {
      return res.status(403).json({
        success: false,
        message: "Owner signup is only allowed in development environment.",
      });
    }

    const { name, gender, email, gstin, aadharNumber, password } = req.body;

    // Check if form data is provided
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
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
      return res.status(409).json({
        success: false,
        message: "An owner already exists. Only one owner is allowed.",
      });
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

    // Respond with created owner
    res.status(201).json({
      success: true,
      message: "Owner created successfully",
      owner: {
        id: newOwner._id,
        name: newOwner.name,
        gender: newOwner.gender,
        email: newOwner.email,
        isOwner: newOwner.isOwner,
      },
    });
  } catch (error) {
    console.error("Error saving Owner:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    // Handle custom validation errors
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to save Owner" });
  }
};

// Render owner login page
export const loginPage = (req, res) => {
  res.render("ownerLogin", {
    wishlistCount: 5,
    cartCount: 2, // Example cart count
  });
};

export const login = async (req, res) => {
  try {
    // Extract the aadharNumber and password from req.body
    const { email, aadharNumber, password } = req.body;

    //check form data is available in body or not
    if (!email && !aadharNumber && !password) {
      return res.status(400).json({
        success: false,
        message: "Email, Aadhar number and password are required",
      });
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(aadharNumber);
    // const validatedPassword = validatePassword(password);

    // Find owner by email and aadharNumber (include password field)
    const owner = await Owner.findOne({
      $and: [{ email }, { aadharNumber }],
    }).select("+password");

    // if Owner eamil and Aadhar not matched
    if (!owner) {
      return res
        .status(401)
        .json({ message: "Invalid email or Aadhar Number" });
    }

    // If user does not exist or password does not matched, return error
    // if (!owner || !(await owner.comparePassword(validatedPassword))) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Invalid Aadhar number or password" });
    // }

    // Check if the user is an admin
    if (!owner.isOwner) {
      return res.status(400).json({
        success: false,
        message: "You are not an Owner. Please login as a user",
      });
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    // const payload = {
    //   id: admin.id,
    //   role: admin.role,
    // };

    // Generate JWT token
    // const token = generateJwtToken(payload);

    // Redirect to profile route using after Loginin success
    // const profileUrl = `/owner/profile`;

    // return JWT token as response
    res.status(200).json({
      success: true,
      message: "owner logged in successfully",
      user: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
        isOwner: owner.isOwner,
      },
      // authToken: token,
      // redirect: profileUrl,
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

// export const profile = async (req, res) => {
//   try {
//     // Get the authenticated user's ID from JWT
//     const authAdminId = req.user.id;

//     //find user by userId
//     const admin = await User.findById(authAdminId).select(
//       "-hasVoted -votedCandidateId -votedParty -votedAt"
//     );

//     // if user not found
//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     // return user response
//     res.status(200).json({ admin });
//   } catch (error) {
//     console.error("Admin Profile error:", error);
//     res
//       .status(500)
//       .json({ message: "Server error during Admin profile retrieval" });
//   }
// };

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
