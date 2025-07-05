import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";

// Define the port number for the server to listen on
const PORT = 8081;

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
      // Handle any other URLs (not found)
    } else {
      // Return a 404 status with an HTML error message
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Page not found!");
      return;
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
    // Handle non-GET requests (e.g., POST, PUT)
  } else {
    // Return a 405 status for unsupported methods
    res.writeHead(405, { "Content-Type": "text/html" });
    res.end("405 Method Not Allowed");
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
