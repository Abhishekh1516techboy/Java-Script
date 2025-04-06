import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
const app = express();
const port = 3000;

// Configure the view engine to use EJS for rendering templates
app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads, making them available in req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data (e.g., from HTML forms)
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (e.g., CSS, JS, images) from the 'public' directory

// ---------Routing---------
app.get("/", (req, res) => {
  res.render("index");
});

// ---------Dynamic Routes----------
app.get("/profile/:user", async (req, res) => {
  try {
    const userName = req.params.user; // Get the username from the URL

    const user = {
      name: userName,
      email: `${userName.split(" ").join("").toLowerCase()}@example.com`,
      location: "Patna Bihar, INDIA",
      joined: "April 6, 2025",
      bio: `Hi, I'm ${userName}! I love coding and building projects.`,
      projects: 42,
      followers: 15,
      following: 28,
    };

    res.render("profile", { user }); // Pass user to profile.ejs
  } catch (error) {
    console.error("Error in profile route:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
