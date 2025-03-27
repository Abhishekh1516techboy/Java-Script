import express from "express";
import User from "../models/User.js";
import { jwtAuthMiddleware, generateJwtToken } from "../jwt.js";
const router = express.Router();

// User SignUp Post Routes
router.post("/signup", async (req, res) => {
  try {
    // Body contains form data
    const data = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
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
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // Respond with the saved User
    res.status(201).json({
      message: "User Data saved successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error saving User:", error);
    res.status(500).json({ message: "Failed to save User" });
  }
});

// Login Route with Passport and JWT Token
router.post("/login", async (req, res) => {
  try {
    // Extract the username and password from req.body
    const { username, password } = req.body;

    // Find the user by userName
    const user = await User.findOne({ userName: username });

    // If user does not exist or password does not matched, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }

    //If username and password matched generate JWT token
    // Create JWT payload
    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    // Generate JWT token
    const token = generateJwtToken(payload);

    // return JWT token as response
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        userName: user.userName, // Ensure 'name' exists in your schema
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User Profile Routes
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // Extract the userData from req.user
    const userId = req.user.id;

    //find user by userId
    const user = await User.findById(userId).select("-password");

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
});

// User Get Routes
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    // Fetch Menu from Database
    const myUser = await User.find();

    // Respond with the find User
    res.status(200).json({
      message: "User Data found successfully",
      user: myUser,
    });
  } catch (error) {
    console.error("Error finding User:", error);
    res.status(500).json({ message: "Failed to find User" });
  }
});

// Define a GET route for fetching User data based on a dynamic slug parameter
router.get("/:slug", jwtAuthMiddleware, async (req, res) => {
  try {
    // Extract the work type from URL parameter
    const slug = req.params.slug;

    // This query searches for Users where the 'role', 'phone', or 'email' field matches the 'slug'
    const myUser = await User.find({
      // The '$or' operator is used to search for documents where any of the conditions match
      $or: [{ role: slug }, { phone: slug }, { email: slug }],
    });

    // If no users are found, return 404 (or 200 if you prefer)
    if (myUser.length === 0) {
      return res.status(404).json({
        message: "No user data found",
        user: [],
      });
    }

    // When matching data is found
    res.status(200).json({
      message: "User Data found successfully",
      user: myUser, // Array of User documents returned from the database
    });
  } catch (error) {
    console.error("Error finding User:", error);
    res.status(500).json({ message: "Failed to find User" });
  }
});

// Update route for updating User data in database by Id
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const UserId = req.params.id; // Extract the User ID from URL parameters
    const updateUser = req.body; // Get the update data from the request body

    // Check if any update data was provided in the request
    if (Object.keys(updateUser).length === 0) {
      return res.status(400).json({ error: "No update data provided by User" });
    }

    // Update User document in database using Mongoose
    const updatedUserData = await User.findByIdAndUpdate(UserId, updateUser, {
      new: true, // Return the modified document rather than original
      runValidators: true, // Ensure schema validations are applied
    });

    // Returns 404 if no document matches the provided ID
    if (!updatedUserData) {
      return res.status(404).json({
        error: "User not found in DataBase",
      });
    }

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUserData, // Return the updated document
    });
  } catch (error) {
    // Catch any errors during database operation
    res.status(500).json({
      error: "Failed to update User",
    });
  }
});

// Delete route for permanently removing User data from the database by ID
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    // Extract the :id parameter from the route
    const UserId = req.params.id;

    // Attempt to find and permanently delete the User document from the database
    const deletedUserData = await User.findByIdAndDelete(UserId);

    // If no document is found with the given ID, return a 404 error
    if (!deletedUserData) {
      return res.status(404).json({
        error: "User not found in DataBase", // Indicates the ID doesn't exist
      });
    }

    // Returns status 200 with a message and the deleted User data
    res.status(200).json({
      message: "User data deleted successfully", // Confirmation message
      user: deletedUserData, // Return the deleted document for reference
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({
      error: "Failed to Delete User", // Generic error message for client
    });
  }
});

export default router;
