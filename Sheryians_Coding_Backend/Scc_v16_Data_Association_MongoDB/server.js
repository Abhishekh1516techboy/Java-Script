import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import BlogUser from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

dbConnect(); // Connect to the database

// method (GET)
app.get("/", (req, res) => {
  res.send("Bloging Web App");
});

// Create a new user (POST)
app.post("/create", async (req, res) => {
  try {
    const { userName, age, gender } = req.body;

    // Validate input
    if (!userName || !age || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await BlogUser.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new BlogUser({
      userName,
      age,
      gender,
    });
    await newUser.save();

    res.status(200).json({
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a post (POST)
app.post("/post", async (req, res) => {
  try {
    const { content, userId } = req.body;

    // Validate input
    if (!content || !userId) {
      return res
        .status(400)
        .json({ message: "Content and user ID are required" });
    }

    // Check if user exists
    const user = await BlogUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new post
    const post = new Post({
      content,
      author: userId,
      postedAt: new Date(),
    });

    // Update user's posts array
    user.posts.push(post.id); // Add post ID to user's posts array

    // save post and user
    await post.save();
    await user.save();

    res.status(201).json({
      message: "Post Created Successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
