import express from "express";
import User from "../models/User.js";
import passport from "../auth.js";
const router = express.Router();

// middleware local Authentication
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Login Route with Passport
router.post("/login", localAuthMiddleware, async (req, res) => {
  try {
    // Since localAuthMiddleware already authenticated the user, req.user will be populated
    const user = req.user;

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name, // Ensure 'name' exists in your schema
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User Post Routes
router.post("/", async (req, res) => {
  // Body contains form data
  const data = req.body;

  try {
    // Create new newUser document using mongoose model
    const newUser = new User(data);

    // Save to MongoDB
    await newUser.save();

    // Respond with the saved User
    res.status(201).json({
      message: "User Data saved successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error saving User:", error);
    res.status(500).json({ message: "Failed to save User" });
  }
});

// User Get Routes
router.get("/", localAuthMiddleware, async (req, res) => {
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
router.get("/:slug", localAuthMiddleware, async (req, res) => {
  // Extract the work type from URL parameter
  const slug = req.params.slug;

  try {
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
router.put("/:id", localAuthMiddleware, async (req, res) => {
  const UserId = req.params.id; // Extract the User ID from URL parameters
  const updateUser = req.body; // Get the update data from the request body

  // Check if any update data was provided in the request
  if (Object.keys(updateUser).length === 0) {
    return res.status(400).json({ error: "No update data provided by User" });
  }

  try {
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
router.delete("/:id", localAuthMiddleware, async (req, res) => {
  const UserId = req.params.id; // Captures the :id parameter from the route

  try {
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
