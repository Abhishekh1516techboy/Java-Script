import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import { randomBytes } from "crypto";
import path from "path";

// Define the port number for the server to listen on
const PORT = 8081;

// Define the path to the JSON file that stores URL mappings
const DATA_FILE = path.join("data", "links.json");

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

// Create an HTTP server to handle incoming requests
const server = createServer(async (req, res) => {
  // Check if the request method is GET
  if (req.method === "GET") {
    let filePath;
    let contentType;

    // Handle requests for the root URL ("/") or "/index.html"
    if (req.url === "/" || req.url === "/index.html") {
      filePath = path.join("public", "index.html");
      contentType = "text/html";
      // Handle requests for the CSS file
    } else if (req.url === "/style.css") {
      filePath = path.join("public", "style.css");
      contentType = "text/css";
      // Handle requests for the js file
    } else if (req.url === "/script.js") {
      filePath = path.join("public", "script.js");
      contentType = "application/javascript";
      // Handle requests for the /links file
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(links));
      // Handle shortened URL (redirects)
    } else if (req.url.startsWith("/")) {
      const links = await loadLinks();
      const shortUrl = req.url.slice(1); // Remove leading slash

      if (links[shortUrl]) {
        res.writeHead(302, {
          Location: links[shortUrl],
          "Content-Type": "text/html",
        });
        res.end();
        return;
        // Handle any other URLs (not found)
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Page not found!");
        return;
      }
    }

    try {
      // Asynchronously read the file at the specified path
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Page not found!");
    }
    // Handle POST requests to the /shorten endpoint
  } else if (req.method === "POST" && req.url === "/shorten") {
    let body = "";
    // Listen for data chunks in the request
    req.on("data", (d) => {
      body += d;
    });

    // work When all data is received
    req.on("end", async () => {
      try {
        // Parse the request body as JSON
        const { url, shortUrl } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { "Content-type": "text/plain" });
          return res.end("URL is required!");
        }

        // Use provided shortUrl or generate a random 8-character hex string
        const finalShortUrl = shortUrl || randomBytes(4).toString("hex");
        // Load existing URL mappings
        const links = await loadLinks();

        // Check if the short URL already exists
        if (links[finalShortUrl]) {
          res.writeHead(400, { "Content-type": "text/plain" });
          return res.end("Short code already exists. Please choose another!");
        }

        // Store the new URL mapping
        links[finalShortUrl] = url;
        // Save the updated mappings to the JSON file
        await saveLinks(links);

        // Return 200 status with JSON response containing the short URL
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, shortUrl: finalShortUrl }));
      } catch (error) {
        // Handle invalid JSON or other errors in the request body
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid request body!");
      }
    });
  } else {
    // Return a 405 status for unsupported methods
    res.writeHead(405, { "Content-Type": "text/html" });
    res.end("405 Method Not Allowed");
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
