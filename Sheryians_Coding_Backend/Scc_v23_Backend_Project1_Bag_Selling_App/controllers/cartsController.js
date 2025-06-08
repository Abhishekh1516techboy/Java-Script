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
      req.flash("error", "Add To Cart is not for owners");
      return res.redirect("/owners/profile");
    }

    // Extract productId and quantity from request body
    const { productId, quantity } = req.body;

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
      existingUser.cart[cartItemIndex].quantity += Number(quantity);
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

    return res.redirect("/carts");
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

    if (authUser.isOwner) {
      req.flash("error", "Cart is not for owners!");
      return res.redirect("/owners/profile");
    }

    // Fetch user and populate cart product details
    const user = await User.findById(req.user._id).populate({
      path: "cart.product",
      select:
        "productName brandName model price discount category stock productImage bgColor",
    });

    // Prepare cartItems for template
    const cartItems = user.cart
      .map((item) => ({
        _id: item.product._id,
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
      isLogin: !!user?._id,
      cartCount: user?.cart?.length || 0,
      wishlistCount: user?.wishlist?.length || 0,
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

export const removeFromCart = async (req, res) => {
  try {
    let user = req.user;

    // Extract productId from request params
    const productId = req.params.id; // Use 'id' to match route parameter

    // Check if user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      req.flash("success", "Product Not Found.");
      res.redirect("/carts");
    }

    // Check if product is in cart
    const cartItemIndex = existingUser.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex < 0) {
      req.flash("success", "Product not found in cart.");
      res.redirect("/carts");
    }

    // Remove product from cart
    existingUser.cart.splice(cartItemIndex, 1);

    // Save updated user document
    await existingUser.save();

    req.flash("success", "Product Removed from cart.");

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart: product.model,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    req.flash("success", "Product Removed from cart.");
    res.redirect("/");
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const user = req.user;

    // Extract itemId from params and quantity from body
    const itemId = req.params.id;
    const { quantity } = req.body;

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    // Check if user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find the cart item
    const cartItemIndex = existingUser.cart.findIndex((item) => {
      const itemProductId = item.product;
      return itemProductId.toString() === itemId;
    });

    if (cartItemIndex < 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const cartItem = existingUser.cart[cartItemIndex];
    const productId = cartItem.product;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate stock
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ message: `Only ${product.stock} items available in stock` });
    }

    // Update quantity
    existingUser.cart[cartItemIndex].quantity = quantity;

    // Save updated user document
    await existingUser.save();

    req.flash("success", "Product Quantity updated.");

    return res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating quantity" });
  }
};
