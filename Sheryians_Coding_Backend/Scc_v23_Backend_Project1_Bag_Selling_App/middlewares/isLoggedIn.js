import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";

export const isLoggedIn = async (req, res, next) => {
  // Check if token exists in cookies
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "You need to login first!");
    return res.redirect("/");
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check Owner or User Login
    let user;
    if (!decoded.isOwner) {
      user = await User.findById(decoded.id);
      if (!user) {
        req.flash("error", "User not found. Please log in again.");
        return res.redirect("/users/auth/login");
      }
    } else {
      user = await Owner.findById(decoded.id);
      if (!user) {
        req.flash("error", "Owner not found. Please log in again.");
        return res.redirect("/owners/auth/login");
      }
    }

    req.user = user; // Attach user/owner data to req
    return next(); // Proceed to the next middleware/route
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      req.flash("error", "Your session has expired. Please log in again.");
    } else if (error.name === "JsonWebTokenError") {
      req.flash("error", "Invalid token. Please log in again.");
    } else {
      console.error("Authentication error:", error.message); // Log for debugging
      req.flash("error", "Authentication failed. Please log in again.");
    }
    return res.status(401).redirect("/");
  }
};
