import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Convert ES module URLs to file paths

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// Serve static files from the 'public/views' directory
app.use(express.static(path.join(__dirname, "public", "views")));

// Route for the root path
app.get("/", (req, res) => {
  res.send("This is Home Page!");
});

// 404 middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
