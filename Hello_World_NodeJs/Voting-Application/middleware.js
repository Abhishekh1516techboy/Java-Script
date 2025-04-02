import User from "./models/User.js"; // Adjust the path to your User model

const isAdmin = async (req, res, next) => {
  try {
    // Check if req.user exists (set by jwtAuthMiddleware)
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Authentication required" });
    }

    // Fetch the user from the database by id
    const admin = await User.findById(req.user.id).select("role");
    console.log(admin);

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Check if the user is an admin
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Access denied: Admin privileges required",
      });
    }

    // If the user is an admin, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ error: "Server error during authorization" });
  }
};

export default isAdmin;
