import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  // Check if token exists in cookies
  if (!req.cookies || !req.cookies.token) {
    // Check if the request is for an API endpoint
    if (
      req.originalUrl.match(/\/post\/[^\/]+\/(like|dislike)$/) &&
      req.method === "POST"
    ) {
      return res
        .status(401)
        .json({ error: "Authentication required. Please log in." });
    }
    return res.redirect("/login"); // Redirect to login if no token
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token (e.g., userName, email) to req
    return next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Token verification failed:", error);
    // Check if the request is for an API endpoint
    if (
      req.originalUrl.match(/\/post\/[^\/]+\/(like|dislike)$/) &&
      req.method === "POST"
    ) {
      return res
        .status(401)
        .json({ error: "Invalid or expired token. Please log in." });
    }
    return res.redirect("/login"); // Redirect if token is invalid
  }
};
