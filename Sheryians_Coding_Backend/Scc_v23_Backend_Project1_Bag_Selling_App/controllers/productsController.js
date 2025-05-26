import Product from "../models/product-model.js";
import Users from "../models/user-model.js";

// ********************** /Product controllers **********************
export const createProductPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Get the authenticated user's ID from JWT
    const authUser = req.user;

    if (!authUser.id) {
      req.flash("error", "You are not authorized!");
      return res.redirect("/");
    }

    let isLogin = false;
    if (authUser.id) {
      isLogin = true;
    }

    res.render("createProduct", {
      authPage: false,
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

export const createProduct = async (req, res) => {
  try {
    // Get the authenticated user's ID from JWT
    const authUserId = req.user.id;

    // Body contains form data
    const {
      productName,
      brandName,
      category,
      model,
      price,
      discount,
      stock,
      bgColor,
      panelColor,
      description,
    } = req.body;

    //check form data is available in body or not
    if (!req.body || Object.keys(req.body).length === 0) {
      req.flash("error", "Form data is required");
      return res.redirect("/products/create");
    }

    // if (!req.file) {
    //   req.flash("error", "Product image is required");
    //   return res.redirect("/products/create");
    // }

    // Validate price
    if (!price || isNaN(price) || price < 0) {
      req.flash("error", "Price must be a positive number");
      return res.redirect("/products/create");
    }

    // Validate discount
    if (discount && (isNaN(discount) || discount < 0 || discount > 100)) {
      req.flash("error", "Discount must be between 0 and 100");
      return res.redirect("/products/create");
    }

    if (!stock || isNaN(stock) || stock < 0) {
      req.flash("error", "Stock quantity must be a positive number");
      return res.redirect("/products/create");
    }

    // Check if product already exists by model
    const existingProduct = await Product.findOne({ model });
    if (existingProduct) {
      req.flash("error", "A product with this model already exists!");
      return res.redirect("/products/create");
    }

    // Create new product document
    const newProduct = new Product({
      productName,
      // productImage: req.file.path, // Store the file path
      productImage: "https://www.unsplash.com",
      brandName,
      category,
      model,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      panelColor,
      bgColor,
      description,
      ownerId: authUserId, // set OwnerId
    });

    // Save to MongoDB
    await newProduct.save();

    // Show Flash message
    req.flash("success", "Product Created successfully!");

    // Redirect to owner profile
    return res.redirect(`/owners/profile`);
  } catch (error) {
    console.error("Error Creating Product:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      req.flash("error", `Validation failed: ${errors.message}`);
      return res.redirect("/products/create");
    }

    req.flash("error", "Failed to Create product");
    return res.redirect("/products/create");
  }
};

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
    const products = await Product.find();

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
