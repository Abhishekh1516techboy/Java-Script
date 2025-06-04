import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";

// ********************** /Carts controllers **********************
export const addToCart = async (req, res) => {
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
      req.flash("error", "Cart functionality is not available for owners");
      return res.redirect("/owners/profile");
    }

    // Extract productId and quantity from request body
    const { productId } = req.body;
    const quantity = 1;

    // Check if user exists
    const existingUser = await User.findById(user?._id);
    if (!existingUser) {
      req.flash("error", "User not found!");
      return res.redirect("/users/auth/login");
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/");
    }

    // Check if product is already in cart
    const cartItemIndex = existingUser.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex >= 0) {
      // Product exists in cart, update quantity
      existingUser.cart[cartItemIndex].quantity += quantity;
      existingUser.cart[cartItemIndex].addedAt = new Date();
    } else {
      // Add new product to cart
      existingUser.cart.push({
        product: productId,
        quantity,
        addedAt: new Date(),
      });
    }

    // Save updated user document
    await existingUser.save();

    req.flash("success", "Product added to cart.");

    req.flash("success", "Product added to cart.");
    return res.redirect("/products/shop"); // or redirect to a specific page like `/cart`
    
  } catch (error) {
    console.error("Error adding to cart:", error);
    req.flash("error", "Server error while adding to cart");
    return res.redirect("/");
  }
};

export const cartPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    const authUser = req.user; // Safe access to req.user.id

    // Fetch user and populate cart product details
    const user = await User.findById(req.user._id).populate({
      path: "cart.product",
      select:
        "productName brandName model price discount category stock productImage bgColor",
    });

    if (!user) {
      req.flash("error", "cart Item not found!");
      return res.redirect("/");
    }

    // Prepare cartItems for template
    const cartItems = user.cart
      .map((item) => ({
        id: item._id.toString(),
        category: item.product.category,
        productImage: item.product.productImage,
        productName: item.product.productName,
        brandName: item.product.brandName,
        model: item.product.model,
        price: item.product.price,
        discount: item.product.discount,
        bgColor: item.product.bgColor,
        stock: item.product.stock, // For quantity validation
        quantity: item.quantity,
        addedAt: item.addedAt,
      }))
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    // Calculate summary
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount = cartItems.reduce(
      (sum, item) => sum + ((item.price * item.discount) / 100) * item.quantity,
      0
    );

    const tax = cartItems.reduce(
      (sum, item) =>
        sum +
        ((item.price - (item.price * item.discount) / 100) *
          item.quantity *
          18) /
          100,
      0
    );

    const total = subtotal - discount + tax;

    res.render("cart", {
      authPage: false,
      error,
      success,
      user: authUser,
      isLogin: !!req.user?._id,
      cartCount: cartItems.length,
      wishlistCount: 5,
      cartItems,
      subtotal,
      discount,
      tax,
      total,
    });
  } catch (error) {
    console.error("Create Product error:", error);
    req.flash("error", "Server error during Product creating");
    return res.redirect("/");
  }
};
