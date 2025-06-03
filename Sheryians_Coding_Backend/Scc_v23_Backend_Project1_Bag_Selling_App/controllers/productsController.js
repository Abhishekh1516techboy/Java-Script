import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";
// import Users from "../models/user-model.js";

// ********************** /Product controllers **********************
export const productsPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Check if product already exists by model
    const products = await Product.find().limit("50").sort({ updatedAt: -1 });

    if (!products) {
      req.flash("error", "Not Products Lists");
      return res.redirect("/products/create");
    }

    let isLogin = false;
    let user;
    if (req.cookies?.token) {
      isLogin = true;
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;
      //find user by userId and set picture in user
      if (!user.isOwner) {
        user = await User.findById(user.id);
      } else {
        user = await Owner.findById(user.id);
      }
    }

    res.render("productsPage", {
      authPage: false,
      products,
      error,
      success,
      user,
      isLogin,
      cartCount: 2,
      wishlistCount: 5,
    });
  } catch (error) {
    console.error("Create Product error:", error);
    req.flash("error", "Server error during Product creating");
    return res.redirect("/");
  }
};
