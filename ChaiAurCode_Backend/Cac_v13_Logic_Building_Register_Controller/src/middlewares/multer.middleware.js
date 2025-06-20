import multer from "multer";
import path from "path";

// --------------Multer disk-storage configuration-----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // file extension extract
    const fileExt = path.extname(file.originalname);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});

const upload = multer({ storage });

export default upload;
