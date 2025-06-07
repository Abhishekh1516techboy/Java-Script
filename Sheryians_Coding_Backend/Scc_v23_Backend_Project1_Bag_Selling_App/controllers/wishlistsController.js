import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";

// ********************** /Carts controllers **********************
export const wishlistPage = async (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");

  try {
    const authUser = req.user;

    // Restrict owners from accessing wishlist
    if (authUser.isOwner) {
      req.flash("error", "Wishlist is not for owners!");
      return res.redirect("/owners/profile");
    }

    // Fetch user and populate wishlist product details
    const user = await User.findById(authUser._id)
      .populate({
        path: "wishlist.product",
        select:
          "productName brandName model price discount category stock productImage bgColor",
      })
      .lean();

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // Prepare wishlistItems for template
    const wishlistItems = user.wishlist
      .map((item) => ({
        _id: item.product?._id,
        category: item.product?.category,
        productImage: item.product?.productImage,
        productName: item.product?.productName,
        brandName: item.product?.brandName,
        model: item.product?.model,
        price: item.product?.price,
        discount: item.product?.discount || 0, // Default to 0 if undefined
        stock: item.product?.stock, // Include stock for availability
        bgColor: item.product?.bgColor,
        addedAt: item.addedAt,
      }))
      .filter((item) => item._id) // Remove items with invalid products
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    res.render("wishlist", {
      authPage: false,
      error,
      success,
      user: authUser,
      isLogin: !!authUser._id,
      cartCount: user.cart?.length || 0,
      wishlistCount: user?.wishlist?.length || 0, // Accurate count
      wishlistItems,
    });
  } catch (error) {
    console.error("Wishlist page error:", error);
    req.flash("error", "Server error while loading wishlist");
    return res.redirect("/");
  }
};

// Add product to wishlist (POST)
export const addToWishlist = async (req, res) => {
  try {
    let user;
    if (req.cookies?.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;
      //find user by userId and set picture in user
      if (!user?.isOwner) {
        user = await User.findById(user?.id);
      } else {
        user = await Owner.findById(user?.id);
      }
    }

    if (!user?._id) {
      req.flash("error", "Login required!");
      return res.redirect("/users/auth/login");
    }

    // Restrict cart functionality to User (optional, remove if Owner has cart)
    if (user?.isOwner) {
      req.flash("error", "Add To Wishlist is not for owners");
      return res.redirect("/owners/profile");
    }

    const product = await Product.findById(req.params.id);

    if (!product || !user) {
      return res.status(404).json({ error: "Product or user not found" });
    }

    // Check if product is already in wishlist
    const productExists = user.wishlist.some(
      (item) => item.product.toString() === req.params.id
    );

    if (productExists) {
      req.flash("error", "Product already in wishlist.");
      return res.redirect(req.headers.referer || "/wishlists");
    }

    // Add product to wishlist
    user.wishlist.push({
      product: req.params.id,
      addedAt: new Date(),
    });

    await user.save();

    req.flash("success", "Product added to wishlist.");

    return res.redirect("/wishlists");
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    req.flash("error", "Error adding to wishlist:");
    return res.redirect("/");
  }
};

// Remove product from wishlist (DELETE)
export const removeFromWishlist = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!product || !user) {
      return res.status(404).json({ error: "Product or user not found" });
    }

    // Check if product exists in wishlist
    const initialWishlistLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== req.params.id
    );

    if (initialWishlistLength === user.wishlist.length) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    await user.save();
    req.flash("success", "Product Remove from wishlist.");

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    req.flash("success", "Error removing from wishlist.");
    res.redirect("/");
  }
};
