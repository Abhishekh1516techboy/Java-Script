// ---------NodeJs backend Server for Voting Application 28/03/2025---------
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000; // running PORT 3000

app.use(express.json()); // Middleware to parse JSON

dbConnect(); // Connect to the database

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to Voting application.");
  });

app.use("/user", userRoutes); // Handles users related endpoints
app.use("/admin/manage", candidateRoutes); // Handles employee-related endpoints

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  