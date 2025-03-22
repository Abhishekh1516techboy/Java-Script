// ---------NodeJs backend Server for Hotels---------
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import os from "os";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000; // running PORT 3000

app.use(express.json()); // Middleware to parse JSON


// Custom logging middleware
const logRequest = (req, res, next) => {
  const details = {
    method: req.method,
    url: req.originalUrl,
    hostname: os.hostname(),
    platform: os.platform(),
    osType: os.type(),
    timestamp: new Date().toLocaleString(),
  };
  console.log(details);
  next(); // Proceeds to next middleware/route
};
app.use(logRequest); // Use logRequest middleware

dbConnect(); // Connect to the database


// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my Hotel RadheKrishna.");
});

// Use the Router
app.use("/user", userRoutes); // Handles employee-related endpoints
app.use("/menu",menuRoutes); // Handles menu-related endpoints

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
