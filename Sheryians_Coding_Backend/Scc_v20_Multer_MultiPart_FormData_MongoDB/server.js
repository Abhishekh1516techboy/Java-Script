import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import multer from "multer";
import crypto from "crypto";

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads/");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, bytes) => {
      const fileName = bytes.toString("hex") + path.extname(file.originalname); // create unique file name
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });

// index page method (GET)
app.get("/", (req, res) => {
  res.render("index");
});

// test page method (GET)
app.get("/test", (req, res) => {
  res.render("test");
});

// Route for single image upload (POST)
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: `./public/images/uploads/${req.file.filename}`,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
