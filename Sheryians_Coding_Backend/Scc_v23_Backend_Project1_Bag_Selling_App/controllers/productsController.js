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
    const products = await Product.find().sort({ updatedAt: -1 });

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

export const productViewPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    const productId = req.params.id;

    // Check if product already exists by model
    const products = await Product.find();

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

    const product = await Product.findById(productId).populate(
      "reviews.userId",
      "name picture"
    );

    const price = product.price;
    const discountAmount = (price * product.discount) / 100;
    const discountedPrice = price - discountAmount;

    // 18% tax on discounted price
    const tax = (discountedPrice * 18) / 100;

    // Total = discounted price + tax
    const total = discountedPrice + tax;
    product.total = total;
    
    res.render("productViewPage", {
      authPage: false,
      products,
      product,
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

// New API endpoint for infinite scroll
export const productView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Fetch products
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .lean();

    // Add isInCart and isInWishlist flags if user is logged in
    let user = null;
    if (req.cookies?.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        user = decoded;
        if (!user.isOwner) {
          const userData = await User.findById(user.id);
          const cartProductIds =
            userData?.cart?.map((item) => item.product.toString()) || [];
          const wishlistProductIds =
            userData?.wishlist?.map((item) => item.product.toString()) || [];
          products.forEach((product) => {
            product.isInCart = cartProductIds.includes(product._id.toString());
            product.isInWishlist = wishlistProductIds.includes(
              product._id.toString()
            );
          });
        }
      } catch (jwtError) {
        console.error("JWT verification error:", jwtError.message);
      }
    }

    // Convert productImage Buffer to base64
    const formattedProducts = products.map((product) => ({
      ...product,
      productImage: product.productImage
        ? product.productImage.toString("base64")
        : null,
    }));

    const totalProducts = await Product.countDocuments();

    res.json({
      products: formattedProducts,
      totalProducts,
      hasMore: skip + products.length < totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /products/:productId/reviews
export const submitReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, reviewText } = req.body;
  const userId = req.user._id;

  if (!userId) {
    req.flash("error", "Login required!");
    return res.redirect("/users/auth/login");
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating" });
  }
  if (!reviewText || reviewText.length < 5 || reviewText.length > 300) {
    return res.status(400).json({ message: "Invalid review text" });
  }

  try {
    const product = await Product.findById(productId);
    const existingReview = product.reviews.find(
      (review) => review.userId.toString() === userId.toString()
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    product.reviews.push({ userId, reviewText, rating });
    const totalRatings = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.ratings = totalRatings / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
};
