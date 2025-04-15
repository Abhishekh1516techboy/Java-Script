import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./lib/dbConnect.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isLoggedIn } from "./middleware.js";
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

// index page method (GET)
app.get("/", (req, res) => {
  res.render("index");
});

// register page method (GET)
app.get("/register", (req, res) => {
  if (req.cookies.token) {
    try {
      jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      return res.redirect("/dashboard"); // Redirect if already logged in
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
    };
    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // set token in cookie
    res.cookie("token", token);

    // Redirect to dashboard (auto-login)
    return res.redirect("/dashboard?newUser=true");
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
      return res.redirect("/dashboard"); // Redirect if already logged in
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

// dashboard page (GET)
app.get("/dashboard", isLoggedIn, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    isNewUser: req.query.newUser === "true", // check new User Registered or Not
  });
});

// logout method (POST)
app.get("/logout", async (req, res) => {
  res.cookie("token", "");
  return res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
