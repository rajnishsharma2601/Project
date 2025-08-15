// import path from "path";

// import multer from "multer";

// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
//   storage: multer.diskStorage({
//     destination: "uploads/",
//     filename: (_req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
//   fileFilter: (_req, file, cb) => {
//     let ext = path.extname(file.originalname);

//     if (
//       ext !== ".jpg" &&
//       ext !== ".jpeg" &&
//       ext !== ".webp" &&
//       ext !== ".png" &&
//       ext !== ".mp4"
//     ) {
//       cb(new Error(`Unsupported file type! ${ext}`), false);
//       return;
//     }

//     cb(null, true);
//   },
// });

// export default upload;


import path from "path";
import multer from "multer";
import fs from "fs";

// Detect if running in serverless environment
const isServerless = process.env.AWS_EXECUTION_ENV || process.env.VERCEL;

// Use writable folder in production, 'uploads/' locally
const uploadDir = isServerless ? "/tmp" : path.join(process.cwd(), "uploads");

// Create local folder if it doesn’t exist (local only)
if (!isServerless && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = [".jpg", ".jpeg", ".webp", ".png", ".mp4"];

    if (!allowedExts.includes(ext)) {
      return cb(new Error(`Unsupported file type! ${ext}`), false);
    }
    cb(null, true);
  },
});

export default upload;
