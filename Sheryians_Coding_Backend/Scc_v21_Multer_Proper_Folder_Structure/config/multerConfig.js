import multer from "multer";
import crypto from "crypto";
import path from "path";

// Set up disk storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads/"); // uploads images folder path
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, bytes) => {
      const fileName = bytes.toString("hex") + path.extname(file.originalname); // create unique file name
      cb(null, fileName);
    });
  },
});

// Initialize multer with storage
const upload = multer({ storage });

// Export the upload middleware
export default upload;
