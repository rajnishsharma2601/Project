
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import connectToDB from "./configs/dbConn.js";
import app from "./app.js"; // make sure the extension is included

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Connect to DB before handling requests
await connectToDB();

// ✅ Export the app for serverless (Vercel/Netlify)
export default app;

// // ✅ If running locally, start the server
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running locally at http://localhost:${PORT}`);
//   });
// }



// import { v2 } from "cloudinary";
// import Razorpay from "razorpay";
// import connectToDB from "./configs/dbConn.js";
// import app from './app';

// // Cloudinary configuration
// v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Razorpay configuration
// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// //  const PORT = process.env.PORT || 5000;

// await connectToDB();

// // app.listen(PORT, async () => {
// //   // Connect to DB
// //   await connectToDB();
// //   console.log(`App is running at http://localhost:${PORT}`);
// // });