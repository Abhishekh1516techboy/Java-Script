import multer from "multer";

// --------------Multer disk-storage configuration-----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

export default upload;
