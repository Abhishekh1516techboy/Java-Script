import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Convert ES module URLs to file paths
import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import { randomBytes } from "crypto";
import dotenv from "dotenv";

const app = express();
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.port || 8081;

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.json()); // For JSON payloads
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' folder

// Define the path to the JSON file that stores URL mappings
const DATA_FILE = path.join("data", "links.json");

// Path to the JSON file for URL mappings
// const DATA_FILE = path.join(__dirname, "data", "links.json");

// Function to load URL mappings from the JSON file
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data); // Return parsed JSON object
  } catch (error) {
    if (error.code === "ENOENT") {
      // Create an empty JSON file and return an empty object
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Function to save URL mappings to the JSON file
const saveLinks = async (links) => {
  try {
    // Write the links object to the JSON file
    await writeFile(DATA_FILE, JSON.stringify(links));
  } catch (error) {
    console.error("Error saving links:", error.message);
  }
};

// Root route: Serve index.html from 'views' folder
app.get("/", async (req, res) => {
  try {
    const file = await readFile(
      path.join(__dirname, "views", "index.html"),
      "utf8"
    );
    const links = await loadLinks();

    const content = file.toString().replaceAll(
      "{{short_Url}}",
      Object.entries(links)
        .map(
          ([short_Url, url]) =>
            `<li class="links-list">
          <a href="/${short_Url}" target="_blank">
          ${req.host}/${short_Url}
          </a> ${url}
        </li>`
        )
        .join("")
    );

    res.set("Content-Type", "text/html");
    res.send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

app.post("/", async (req, res) => {
  try {
    // get form data from frontend
    const { fullUrl, shortUrl } = req.body;

    if (!fullUrl && !shortUrl) {
      res.status(400).send("Form data required!");
    }

    // Use provided shortUrl or generate a random 8-character hex string
    const finalShortUrl = shortUrl || randomBytes(4).toString("hex");

    // Load existing URL mappings
    const links = await loadLinks();

    // Check if the short URL already exists
    if (links[finalShortUrl]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another!");
    }

    // Store the new URL mapping
    links[finalShortUrl] = fullUrl;

    // Save the updated mappings to the JSON file
    await saveLinks(links);

    // redirect after form submit
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// Redirect to original URL
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();
    const url = links[shortCode];

    if (url) {
      res.redirect(url);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
