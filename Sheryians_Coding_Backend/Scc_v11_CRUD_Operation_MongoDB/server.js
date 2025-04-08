import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";
import dbConnect from "./lib/dbConnect.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

dbConnect(); // Connect to the database

// ---------Routing---------
app.get("/", (req, res) => {
  res.send("Thei is CRUD Operation MongoDB");
});

// User creation route
app.post("/user/create", async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        error: "A user with this email already exists in the database",
      });
    }

    // if user not exist create new user
    const newUser = new User(data);
    await newUser.save(); // save User in DB

    res.status(201).json({
      message: "User created successfully",
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// User Read route
app.get("/user/read", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    // if user not found by email in DB
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User found successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error Find user:", error);
    res.status(500).json({ error: "Failed to Find user" });
  }
});

// User Update route
app.put("/user/update", async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
    }

    // Check if email exists in the request
    if (!data.email) {
      return res.status(400).json({ error: "Email is required for update" });
    }

    // find by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      data,
      { new: true }
    );

    // If no user found with that email
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({
      message: "User Update successfully",
      updatedUser: updatedUser.toJSON(),
    });
  } catch (error) {
    console.error("Error saving Update:", error);
    res.status(500).json({ error: "Failed to Update user" });
  }
});

// User Delete route
app.delete("/user/delete", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Delete user by email
    const deleteUser = await User.findOneAndDelete({ email: email });

    // if user not found by email in DB
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User Deleted successfully",
      deleteUser: deleteUser.toJSON(),
    });
  } catch (error) {
    console.error("Error Deleted user:", error);
    res.status(500).json({ error: "Failed to Deleted user" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
