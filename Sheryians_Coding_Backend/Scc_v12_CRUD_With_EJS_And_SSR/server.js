import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
import methodOverride from "method-override";
import User from "./models/User.js";
import dbConnect from "./lib/dbConnect.js";

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
app.use(methodOverride("_method")); // method override middleware

dbConnect(); // Connect to the database

app.get("/", (req, res) => {
  res.render("index");
});

// User creation route (POST)
app.post("/user/create", async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send("Form data is required");
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.redirect("/");
    }

    // if user not exist create new user
    const newUser = new User(data);
    await newUser.save(); // save User in DB

    res.redirect("/users");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Failed to save user");
  }
});

// All-Users List (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("allUsers", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users");
  }
});

// User Profile view (GET)
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id exists in the request
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const user = await User.findById(id); // find user by id

    // If no user found with that email
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Dummy userPost data for testing
    const userPosts = {
      bio: "Full-Stack developer | Music lover | Coffee addict ☕️",
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

    res.render("user", { user, userPosts }); // if user found render profile page
  } catch (error) {
    console.error("Error viewing user profile:", error);
    res.status(500).send("Failed to view user profile");
  }
});

// Edit User route (GET)
app.get("/user/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id exists in the request
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const user = await User.findById(id); // find user by id

    // If no user found with that email
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("edit", { user }); // if user found render profile page
  } catch (error) {
    console.error("Error fetching user for edit:", error);
    res.status(500).send("Failed to fetch user");
  }
});

// update user Route (PUT)
app.put("/user/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, imageUrl } = req.body;

    // validation
    if (!name || !imageUrl) {
      return res.status(400).send("form data required");
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(400).send("user not found");
    }

    // Check if data has changed
    const isSameName = existingUser.name === name;
    const isSameImage = existingUser.imageUrl === imageUrl;

    if (isSameName && isSameImage) {
      return res.status(400).redirect(`/user/${userId}`);
    }

    // Update only if data is different
    await User.findByIdAndUpdate(userId, { name, imageUrl });
    res.redirect(`/user/${userId}`);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Failed to update user");
  }
});

// User Delete route (DELETE)
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id exists in the request
    if (!id) {
      return res.status(400).send("ID is required");
    }

    // Delete user by email
    const deleteUser = await User.findOneAndDelete({ _id: id });

    // if user not found by email in DB
    if (!deleteUser) {
      return res.status(404).send("User not found");
    }

    res.redirect("/users"); // redirect when user delete
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
