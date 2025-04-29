import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import dbConnect from "./config/mongoose-connection.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { isLoggedIn } from "./middleware.js";
import ownersRoutes from "./routes/ownersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

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
// app.use(cookieParser()); // cookie parser

// ------------------------Public Routes---------------------------
// index page method (GET)
app.get("/", (req, res) => {
  res.send("This is backend Project-1 Bag Selling Web App");
});

// Routes
app.use("/owners", ownersRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Immediately Invoked Async Function Expression (IIAFE) to handle app startup
(async () => {
  try {
    console.log(`Running in ${process.env.NODE_ENV} mode`); // Log Production OR Development Mode

    await dbConnect(); // Connect to the database
    console.log("App ready to use database"); // Log successful DB connection

    // Start the server and listen on specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`); // Log server start with port
    });
  } catch (error) {
    console.error("App failed to start:", error); // Log error details
    process.exit(1); // Terminate process with failure code if DB connection fails
  }
})();
