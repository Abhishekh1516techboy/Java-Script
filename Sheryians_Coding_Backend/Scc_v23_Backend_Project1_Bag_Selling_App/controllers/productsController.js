import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";

// ********************** /Product controllers **********************
export const createProductPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  let isLogin = false;
  let user;
  if (req.cookies?.token) {
    isLogin = true;
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    user = decoded;
  }
  res.render("createProduct", {
    authPage: false,
    error,
    success,
    user,
    isLogin,
    cartCount: 2,
    wishlistCount: 5,
  });
};

