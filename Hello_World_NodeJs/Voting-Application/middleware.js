import User from "./models/User.js"; // Adjust the path to your User model

const isAdmin = async (req, res, next) => {
  try {
    // Check if req.user exists (set by jwtAuthMiddleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Fetch the user from the database by role [admin, voter]
    const user = await User.findById(req.user.id).select("role");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is an admin or not
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admin privileges required" });
    }

    // If the user is an admin, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ error: "Server error during authorization" });
  }
};

export default isAdmin;