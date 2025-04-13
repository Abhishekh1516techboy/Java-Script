import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./lib/dbConnect.js";
import UserAuth from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import methodOverride from "method-override";

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

// register page method (GET)
app.get("/", (req, res) => {
  res.render("index");
});

// Create a new user (POST)
app.post("/register", async (req, res) => {
  try {
    const { userName, email, password, age, gender } = req.body;

    // Validate input
    if (!userName || !email || !password || !age || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10); // generate salt using bcryptjs
    const hashPassword = await bcrypt.hash(password, salt); // hash passsword using bcryptjs

    // Check if user already exists
    const existingUser = await UserAuth.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new UserAuth({
      userName,
      email,
      password: hashPassword,
      age,
      gender,
    });
    await newUser.save();

    // JWT jsonWebToken
    const payload = {
      userName,
      email,
    };
    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("token", token);

    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// login page method (GET)
app.get("/login", (req, res) => {
  res.render("login");
});

// login method (POST)
app.post("/login", async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    // Validate input
    if (!userNameOrEmail || !password) {
      return res
        .status(400)
        .json({ message: "Username or email and password are required" });
    }

    // Find user by username or email
    const user = await UserAuth.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    }).select("password userName email");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }

    // // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }

    // JWT jsonWebToken
    const payload = {
      userName: user.userName,
      email: user.email,
    };
    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("token", token);

    return res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/dashboard", (req, res) => {
  const token = req.cookies.token; // get token from cookie
  // Verify JWT token
  const user = jwt.verify(token, process.env.JWT_SECRET); // check token is correct or not
  res.render("dashboard", { user });
});

// logout method (POST)
app.get("/logout", async (req, res) => {
  res.cookie("token", "");
  return res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
