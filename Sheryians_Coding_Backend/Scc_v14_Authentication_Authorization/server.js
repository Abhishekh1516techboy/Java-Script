import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"; // Added bcryptjs
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config(); // Load environment variables from .env file
const port = 3000;

// --------Middleware setup--------
app.use(cookieParser()); // parse cookies

app.get("/", async (req, res) => {
  // --------encrypt password--------
  const myPassword = "@012345abhi6789"; // This is simple password examples
  const salt = await bcrypt.genSalt(10); // generate salt using bcryptjs
  const hashPassword = await bcrypt.hash(myPassword, salt); // hash passsword using bcryptjs
  // Store hash in your password DB
  console.log(hashPassword); // log password in has format like random long string

  // -------decrypt Password--------
  // Load hash from your password DB
  const verifyPassword = await bcrypt.compare(myPassword, hashPassword); // compare password is correct or not
  console.log(verifyPassword); //log if password match "True" otherwise "False"

  // --------JWT jsonWebToken--------
  const payload = {
    userName: "Abhishekh1516techboy",
    age: "22",
    email: "abhishekhkumar1516@gmail.com",
  };
  // generate JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  console.log("Token: ", token); // log token

  // --------Set cookie in client side browser---------
  res.cookie("name", "Abhishekh kumar");
  res.cookie("age", "22");
  res.cookie("email", "abhishekhkumar1516@gmail.com");
  res.cookie("mode", "dark");
  res.cookie("token", token); // set token in cookie

  res.send("Done");
});

// read cookie route
app.get("/read", (req, res) => {
  console.log(req.cookies); // get cookie from client side browser

  const token = req.cookies.token; // get token from cookie
  // Verify JWT token
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET); // check token is correct or not
  console.log(verifyToken); // log payload data if token verify

  res.send("Read Page");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
