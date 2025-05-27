import multer from "multer";

// --------------Multer memory-storage as buffer configuration-----------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export the upload middleware
export default upload;
