import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./lib/dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Post from "./models/Post.js";
import methodOverride from "method-override";
import { isLoggedIn } from "./middleware.js";

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
app.use(cookieParser()); // cookie parser
app.use(methodOverride("_method")); // method override middleware

dbConnect(); // Connect to the database

// index page method (GET)
app.get("/", (req, res) => {
  res.render("index");
});

// Blog's page method (GET)
app.get("/blogs", async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.content = { $regex: search, $options: "i" };
    }

    // Fetch posts
    const posts = await Post.find(query)
      .populate("author", "userName")
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Fetch latest post
    const latestPost = await Post.findOne(query)
      .populate("author", "userName")
      .sort({ postedAt: -1 })
      .lean();

    // Count total posts
    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    // Log user for debugging
    console.log("req.user:", req.user);

    res.render("blogs", {
      posts,
      latestPost,
      user: req.user || null,
      search,
      category,
      page: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Failed to load blogs");
  }
});

// register page method (GET)
app.get("/register", (req, res) => {
  if (req.cookies.token) {
    try {
      jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      return res.redirect("/profile"); // Redirect if already logged in
    } catch {
      // Proceed to render login if token is invalid
      res.clearCookie("token"); // Clear invalid token
    }
  }

  res.render("register", { errors: [] });
});

// Create a new user (POST)
app.post("/register", async (req, res) => {
  try {
    const { userName, name, age, gender, email, password } = req.body;

    // Validate input
    if (!userName || !name || !age || !gender || !email || !password) {
      res.render("register", { errors: [{ msg: "All fields are required" }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10); // generate salt using bcryptjs
    const hashPassword = await bcrypt.hash(password, salt); // hash passsword using bcryptjs

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      res.render("register", { errors: [{ msg: "User already exists" }] });
    }

    // Create new user
    const newUser = new User({
      userName,
      name,
      age,
      gender,
      email,
      password: hashPassword, // save hash Password
    });
    await newUser.save(); // save new user

    // JWT jsonWebToken
    const payload = {
      userName,
      email,
      id: newUser.id,
    };
    console.log(payload);
    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("token", token);

    // Redirect to profile (auto-login)
    return res.redirect("/profile?newUser=true");
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// login page method (GET)
app.get("/login", (req, res) => {
  if (req.cookies.token) {
    try {
      jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      return res.redirect("/profile"); // Redirect if already logged in
    } catch {
      // Proceed to render login if token is invalid
      res.clearCookie("token");
    }
  }

  res.render("login", {
    registerUser: (() => {
      // if new user register return otherwise not
      try {
        return jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      } catch {
        return null;
      }
    })(),
    errors: [],
  });
});

// login method (POST)
app.post("/login", async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    // Validate input
    if (!userNameOrEmail || !password) {
      return res.render("login", {
        errors: [{ msg: "Username or email & password are required" }],
        registerUser: (() => {
          try {
            return jwt.verify(req.cookies.token, process.env.JWT_SECRET);
          } catch {
            return null;
          }
        })(),
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    }).select("password userName email");

    if (!user) {
      return res.render("login", {
        registerUser: (() => {
          try {
            return jwt.verify(req.cookies.token, process.env.JWT_SECRET);
          } catch {
            return null;
          }
        })(),
        errors: [{ msg: "Invalid username/email or password" }],
      });
    }

    // // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        registerUser: (() => {
          try {
            return jwt.verify(req.cookies.token, process.env.JWT_SECRET);
          } catch {
            return null;
          }
        })(),
        errors: [{ msg: "Invalid username/email or password" }],
      });
    }

    // JWT jsonWebToken
    const payload = {
      userName: user.userName,
      email: user.email,
      id: user.id,
    };
    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("token", token);

    return res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// profile page (GET)
app.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if id exists in the request
    if (!userId) {
      return res.status(400).send("ID is required");
    }

    // Fetch user and populate posts, sorted by postedAt in descending order
    const user = await User.findById(userId)
      .populate({
        path: "posts",
        options: { sort: { postedAt: -1 } }, // -1 for descending (newest first)
      })
      .lean();

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile", {
      posts: user.posts || [], // Ensure posts is an array even if empty
      user,
      isNewUser: req.query.newUser === "true", // check new User Registered or Not
    });
  } catch (error) {
    console.error("Error viewing user profile:", error);
    res.status(500).send("Failed to view user profile");
  }
});

// Create a post (POST)
app.post("/create/post", isLoggedIn, async (req, res) => {
  try {
    const { category, postData } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!postData || !userId) {
      return res
        .status(400)
        .json({ message: "Content and user ID are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new post
    const post = new Post({
      category,
      content: postData,
      author: userId,
      postedAt: new Date(),
    });

    // Update user's posts array
    user.posts.push(post.id); // Add post ID to user's posts array

    // save post and user
    await post.save();
    await user.save();

    return res.redirect("/profile?newPost=true");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read Posts (GET)
app.get("/read/:id/blog", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    // Check if id exists in the request
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const post = await Post.findById(id); // find post by id

    // If no post found with that id
    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("show", { post, user }); // if post found render show page
  } catch (error) {
    console.error("Error viewing show:", error);
    res.status(500).send("Failed to view show");
  }
});

// View update Post route (GET)
app.get("/post/:id/update", isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if id exists in the request
    if (!postId) {
      return res.status(400).send("ID is required");
    }

    const post = await Post.findById(postId); // find post by id

    // If no post found with that id
    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("edit", { post }); // if post found render edit page for updating
  } catch (error) {
    console.error("Error fetching post for edit:", error);
    res.status(500).send("Failed to fetch post");
  }
});

// update post Route (PUT)
app.put("/post/:id/update", isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id;
    const { category, content } = req.body;

    // validation
    if (!category || !content) {
      return res.status(400).send("form data required");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("post not found");
    }

    // Check if data has changed
    const isSameCategory = post.category === category;
    const isSameContent = post.content === content;

    if (isSameCategory && isSameContent) {
      return res.status(400).redirect(`/post/${postId}/update`);
    }

    // Update only if data is different
    await Post.findByIdAndUpdate(postId, { category, content });
    return res.redirect("/profile");
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Failed to update post");
  }
});

// post Delete route (DELETE)
app.delete("/post/:id/delete", isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Check if id exists in the request
    if (!postId) {
      return res.status(400).send("ID is required");
    }

    // Delete post only if it belongs to the user
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    // if post not found by id in DB
    if (!deletedPost) {
      return res.status(404).send("Post not found or unauthorized");
    }

    // Remove post ID from user's posts array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send(`User not found for post ID removal:`, userId);
    }

    res.redirect("/profile"); // redirect when post delete
  } catch (error) {
    console.error("Error deleting Post:", error);
    res.status(500).send("Failed to delete Post");
  }
});

// logout method (POST)
app.get("/logout", async (req, res) => {
  res.cookie("token", "");
  return res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
