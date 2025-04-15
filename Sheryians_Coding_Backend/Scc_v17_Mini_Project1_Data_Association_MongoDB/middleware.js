import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  // Check if token exists in cookies
  if (!req.cookies || !req.cookies.token) {
    return res.redirect("/login"); // Redirect to login if no token
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token (e.g., userName, email) to req
    return next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.redirect("/login"); // Redirect if token is invalid
  }
};
