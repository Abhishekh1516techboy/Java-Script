import express from "express";
import Student from "../models/Student.js";
import multer, { memoryStorage } from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs/promises";

const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// --------------Multer disk-storage configuration-----------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../uploads");
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const email = req.body.email || "unknown"; // Fallback if email isn't available yet
//     const localPart = email.split("@")[0];
//     const suffix = Date.now();
//     const ext = path.extname(file.originalname);
//     const fileName = `${suffix}-${localPart}${ext}`;
//     cb(null, fileName);
//   },
// });

// --------------Multer memory-storage as buffer configuration-----------------
const storage = memoryStorage({});

const upload = multer({ storage });

// Middleware to check if student exists
const checkStudentExists = async (req, res, next) => {
  try {
    // Ensure req.body exists
    if (!req.body || !req.body.email) {
      return res.status(400).json({ error: "Email is required in form data" });
    }

    const { email } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      // Cleanup uploaded file if it exists
      // if (req.file) {
      //   await fs
      //     .unlink(path.join(__dirname, "../uploads", req.file.filename))
      //     .catch((err) => {
      //       console.error("Error deleting file:", err);
      //     });
      // }
      return res.status(409).json({ error: "Student already exists" });
    }

    next();
  } catch (error) {
    // Cleanup on error
    // if (req.file) {
    //   await fs
    //     .unlink(path.join(__dirname, "../uploads", req.file.filename))
    //     .catch((err) => {
    //       console.error("Error deleting file:", err);
    //     });
    // }
    console.error("Error checking student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Student creation route
router.post(
  "/create",
  upload.single("photo"), // Parse form data first
  checkStudentExists, // Then check student existence
  async (req, res) => {
    try {
      const data = req.body;
      const file = req.file;

      // if (!data || Object.keys(data).length === 0) {
      //   if (file)
      //     await fs.unlink(path.join(__dirname, "../uploads", file.filename));
      //   return res.status(400).json({ error: "Form data is required" });
      // }

      if (!file) {
        return res.status(400).json({ error: "Student photo is required" });
      }

      const newStudent = new Student({
        ...data,
        // photo: req.file.filename,
        photo: req.file.buffer.toString("base64"),
      });

      await newStudent.save();

      res.status(201).json({
        message: "Student created successfully",
        student: newStudent.toJSON(),
      });
    } catch (error) {
      // if (req.file) {
      //   await fs
      //     .unlink(path.join(__dirname, "../uploads", req.file.filename))
      //     .catch((err) => {
      //       console.error("Error deleting file:", err);
      //     });
      // }
      console.error("Error saving student:", error);
      res.status(500).json({ error: "Failed to save student" });
    }
  }
);

export default router;
