import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  try {
    // Try to get token from Authorization header
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If not in header, check cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    return next();
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Unauthorized: Token expired" });
    }

    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export { jwtAuthMiddleware };
