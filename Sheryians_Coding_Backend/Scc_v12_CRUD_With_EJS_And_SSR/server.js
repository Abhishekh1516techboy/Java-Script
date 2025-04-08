import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
import User from "./models/User.js";
import dbConnect from "./lib/dbConnect.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

dbConnect(); // Connect to the database

app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

app.get("/", (req, res) => {
  res.render("index");
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
        res.redirect("/");
    }

    // if user not exist create new user
    const newUser = new User(data);
    await newUser.save(); // save User in DB

    res.status(201).redirect("/users");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    // Check if user already exists by email
    const users = await User.find();
    if (users) {
      res.render("allUsers", { users });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.get("/user/:email", async (req, res) => {
  const email = decodeURIComponent(req.params.email);
  const user = await User.findOne({ email });

  const userPosts = {
    bio: "Frontend dev | Music lover | Coffee addict ☕️",
    posts: [
      { image: "https://picsum.photos/300/300?random=1" },
      { image: "https://picsum.photos/300/300?random=2" },
      { image: "https://picsum.photos/300/300?random=3" },
      { image: "https://picsum.photos/300/300?random=4" },
      { image: "https://picsum.photos/300/300?random=5" },
      { image: "https://picsum.photos/300/300?random=6" },
      { image: "https://picsum.photos/300/300?random=7" },
      { image: "https://picsum.photos/300/300?random=8" },
      { image: "https://picsum.photos/300/300?random=9" },
    ],
  };

  res.render("user", { user, userPosts });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
