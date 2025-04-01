import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  try {
    // Extract JWT Token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info in the request object
    req.user = decoded;

    return next();
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Unauthorized: Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

// Generate JWT Token
const generateJwtToken = (userData) => {
  // Generate new JWT token using userData
  return jwt.sign(userData, process.env.JWT_SECRET);
};

export { jwtAuthMiddleware, generateJwtToken };
