// ---------NodeJs backend Server for Voting Application 28/03/2025---------
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import votingRoutes from "./routes/votingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000; // running PORT 3000

app.use(express.json()); // Middleware to parse JSON

dbConnect(); // Connect to the database

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Voting application.");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/manage", candidateRoutes);
app.use("/admin/manage/u", adminUserRoutes);
app.use("/voting", votingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
