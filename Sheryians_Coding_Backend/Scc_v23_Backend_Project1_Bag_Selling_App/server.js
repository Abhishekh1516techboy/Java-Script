import express from "express";
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Utility to convert ES module URLs to file paths
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import dbConnect from "./config/mongoose-connection.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { isLoggedIn } from "./middleware.js";
import ownersRoutes from "./routes/ownersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

app.set("view engine", "ejs"); // EJS templates will be used for dynamic HTML

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// --------Middleware setup--------
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory
// app.use(cookieParser()); // cookie parser

// ------------------------Public Routes---------------------------
// index page method (GET)
// app.get("/", (req, res) => {
//   res.render("index", { bags: [], reviews: [], cartCount: 2 });
// });

// Example bag data (replace with database query in production)
const bags = [
  {
    id: 1,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://skybags.co.in/cdn/shop/files/main-banner-backpack-2025-collection_2048x.jpg?v=1745838826",
  },
  {
    id: 2,
    name: "Classic Leather Tote",
    description: "Elegant, spacious, and perfect for any occasion.",
    price: 79.99,
    image:
      "https://skybags.co.in/cdn/shop/files/website-banner_2048x.jpg?v=1745836659",
  },
  {
    id: 3,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://vipbags.com/cdn/shop/files/Lexus_coral_1920x700_4ded0ccd-f631-481e-b930-4d59a9888362.jpg?v=1744357130",
  },
  {
    id: 4,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://skybags.co.in/cdn/shop/files/Skybags_KV_Web_banner_2048x.webp?v=1744887326",
  },
  {
    id: 4,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image: "https://vipbags.com/cdn/shop/files/family-travel.png?v=1696326469",
  },
  {
    id: 5,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
  },
  {
    id: 6,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    name: "Urban Backpack",
    description: "Durable and stylish, ideal for city life.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
  },
  // Add more bags as needed
];

// Example reviews (optional)
const reviews = [
  { text: "Absolutely love my new bag!", author: "Priya S." },
  { text: "Great quality and fast shipping.", author: "Rahul M." },
];

app.get("/", (req, res) => {
  res.render("index", {
    bags: bags, // Pass the array of bags
    reviews: reviews, // Pass customer reviews
    cartCount: 2, // Example cart count
    wishlistCount: 5,
  });
});

// Routes
app.use("/owners", ownersRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Immediately Invoked Async Function Expression (IIAFE) to handle app startup
(async () => {
  try {
    console.log(`Running in ${process.env.NODE_ENV} mode`); // Log Production OR Development Mode

    await dbConnect(); // Connect to the database
    console.log("App ready to use database"); // Log successful DB connection

    // Start the server and listen on specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`); // Log server start with port
    });
  } catch (error) {
    console.error("App failed to start:", error); // Log error details
    process.exit(1); // Terminate process with failure code if DB connection fails
  }
})();
