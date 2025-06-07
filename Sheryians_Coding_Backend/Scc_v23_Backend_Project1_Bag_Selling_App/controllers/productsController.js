import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";

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

    let user = null;
    if (req.cookies?.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;
      //find user by userId and set picture in user
      if (!user?.isOwner) {
        user = await User.findById(user?.id);
        // --------------Add isInCart flag to products--------------
        const cartProductIds = user.cart.map((item) => item.product.toString());
        products.forEach((product) => {
          product.isInCart = cartProductIds.includes(product._id.toString());
        });
        products.isInCart = cartProductIds || false; // Default to false for non-logged-in users

        // --------------Add isInWishlist flag to products--------------
        const wishlistProductIds = user.wishlist.map((item) =>
          item.product.toString()
        );
        products.forEach((product) => {
          product.isInWishlist = wishlistProductIds.includes(
            product._id.toString()
          );
        });
        products.isInWishlist = wishlistProductIds || false; // Default to false for non-logged-in users
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
      isLogin: !!user?._id,
      cartCount: user?.cart?.length || 0,
      wishlistCount: user?.wishlist?.length || 0,
    });
  } catch (error) {
    console.error("Create Product error:", error);
    req.flash("error", "Server error during Product creating");
    return res.redirect("/");
  }
};
