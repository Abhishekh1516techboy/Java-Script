import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Convert ES module URLs to file paths
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); // Initialize Express app

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory
app.use(cookieParser()); // cookie parser

export default app;
