import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import multerConfig from "./config/multerConfig.js";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import UserProfile from "./models/User.js";
import fs from "fs";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

dbConnect(); // connect DB

// index page method (GET)
app.get("/", (req, res) => {
  res.render("index");
});

// register page method (GET)
app.get("/register", (req, res) => {
  res.render("register");
});

// Route for user registration (POST)
app.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if User already exists
    const existingUser = await UserProfile.findOne({ email });

    if (existingUser) {
      return res.send.status(404).json({ message: "User Already exists" });
    }

    // Create new user
    const newUser = new UserProfile({
      name,
      email,
    });
    await newUser.save(); // save new user

    res.status(200).json({ message: "register successfull", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile page (GET)
app.get("/profile", async (req, res) => {
  try {
    // For demo, use a hardcoded user ID; in production
    const userId = "680694f4eaae230b4d3fcc87";
    const user = await UserProfile.findById(userId);
    res.render("profile", { user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for user image upload (POST)
app.post("/image/upload", multerConfig.single("image"), async (req, res) => {
  try {
    // For demo, use a hardcoded user ID; in production
    const userId = "680694f4eaae230b4d3fcc87"; // write now manually

    const user = await UserProfile.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Delete old profile image if it exists
    if (user.profilePic) {
      const oldFilePath = path.join(
        __dirname,
        "public/images/uploads",
        user.profilePic
      );
      try {
        // dont delete default.png Image
        if (user.profilePic !== "default.png") {
          fs.unlink(oldFilePath, (err) => {
            if (err) throw err;
            else console.log("Unlink complete!");
          });
        }
      } catch (err) {
        console.error("Error deleting old profile image:", err);
      }
    }

    // Update user's profile image
    user.profilePic = req.file.filename;
    await user.save(); // save new user

    // Redirect to profile page
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for user image Remove (POST)
app.post("/image/remove", async (req, res) => {
  try {
    // For demo, use a hardcoded user ID; in production
    const userId = "680694f4eaae230b4d3fcc87"; // write now manually

    const user = await UserProfile.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Remove profile image if it exists from DB
    if (user.profilePic) {
      const imagePath = path.join(
        __dirname,
        "public/images/uploads",
        user.profilePic
      );
      try {
        // dont delete default.png Image
        if (user.profilePic !== "default.png") {
          fs.unlink(imagePath, (err) => {
            if (err) throw err;
            else console.log("Unlink complete!");
          });
        }
      } catch (err) {
        console.error("Error deleting old profile image:", err);
      }
    }

    // Update user's profile image default.png
    user.profilePic = "default.png";
    await user.save(); // save new user

    // Redirect to profile page
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
