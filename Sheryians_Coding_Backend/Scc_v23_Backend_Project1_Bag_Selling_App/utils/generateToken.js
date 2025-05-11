import jwt from "jsonwebtoken";

// Generate JWT Token
export default (userData) => {
  // Generate new JWT token using userData
  return jwt.sign(userData, process.env.JWT_SECRET);
};
