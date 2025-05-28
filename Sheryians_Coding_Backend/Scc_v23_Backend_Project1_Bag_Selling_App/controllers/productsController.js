import Product from "../models/product-model.js";
// import Users from "../models/user-model.js";

// ********************** /Product controllers **********************
export const productsPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Get the authenticated user's ID from JWT
    const authUser = req.user;

    if (!authUser.id) {
      req.flash("error", "You are not authorized!");
      return res.redirect("/");
    }

    // Check if product already exists by model
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) {
      req.flash("error", "Not Products Lists");
      return res.redirect("/products/create");
    }

    let isLogin = false;
    if (authUser.id) {
      isLogin = true;
    }

    res.render("productsPage", {
      authPage: false,
      products,
      error,
      success,
      user: authUser,
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
