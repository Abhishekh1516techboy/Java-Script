import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import {
  hiddenAadharNumber,
  hiddenGstinNumber,
  validateGstin,
  validateAadhar,
  validateEmail,
  validateGender,
  validatePhone,
  validatePassword,
  validatePinCode,
} from "../helpers/validators.js";

// ********************** /owner controllers **********************

export const profile = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Get the authenticated owner's ID from JWT
    const authOwnerId = req.user.id;

    //find owner by userId
    const owner = await Owner.findById(authOwnerId)
      .select("+aadharNumber +phone")
      .populate({
        path: "products",
        options: { sort: { updatedAt: -1 } }, // sort createdAt populated products
      })
      .lean();

    // if owner not found
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // hidden Aadhar Number show like "xxxx-xxxx-6194" format
    owner.hiddenAadharNumber = hiddenAadharNumber(owner.aadharNumber);

    // hidden GSTIN Number show like "27A-xxxx-xxxx-F1Z5" format
    owner.hiddenGstin = hiddenGstinNumber(owner.gstin);

    // if password Change show message
    if (req.session.passwordChanged) {
      success = ["Password changed successfully"];
      delete req.session.passwordChanged;
    }

    // // if Profile-Update show message
    if (req.session.profileUpdate) {
      success = ["Profile-Update successfully"];
      delete req.session.profileUpdate;
    }

    // return user response
    res.render("ownerProfile", {
      user: owner,
      error,
      success,
      authPage: true,
      isLogin: !!owner?._id,
      cartCount: owner?.cart?.length || 0, // Example cart count
      wishlistCount: owner?.wishlist?.length || 0,
    });
  } catch (error) {
    console.error("Admin Profile error:", error);
    req.flash("error", "Server error during profile retrieval");
    return res.redirect("/");
  }
};

export const passwordChange = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (!authUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const { currentPassword, newPassword } = req.body; // Get the data from the request body for change User password

    //check form data is available in body or not
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both currentPassword and newPassword are required" });
    }

    // Apply validations (errors thrown here are caught below)
    const validatedOldPassword = validatePassword(currentPassword);
    const validatedNewPassword = validatePassword(newPassword);

    // check if oldPassword and newPasswor are same
    if (validatedOldPassword === validatedNewPassword) {
      return res
        .status(400)
        .json({ message: "New password must differ from old password" });
    }

    // Find the user by id
    const owner = await Owner.findById(authUserId).select("+password");

    // If user does not exist or password does not matched, return error
    if (!owner || !(await owner.comparePassword(validatedOldPassword))) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    owner.password = validatedNewPassword; // Set the new password
    await owner.save(); // Save password after change

    // In passwordChange
    req.session.passwordChanged = true;

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "User Password changed successfully",
      owner: owner._id,
    });
  } catch (error) {
    console.error("User Password-change error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: errors, // Array of specific validation errors
      });
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    // Catch any errors during database operation
    return res.status(500).json({
      message: "Failed to Changed User Password",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT

    // Check if the requested userId matches the authenticated user's ID
    if (!authUserId) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    // Parse textual data from req.body.data
    if (!req.body.data) {
      return res.status(400).json({ message: "No profile data provided" });
    }

    // Parse json data
    const updateData = JSON.parse(req.body.data);

    const {
      name,
      gender,
      email,
      phone,
      gstIn,
      aadharNumber,
      address,
      bankDetails,
    } = updateData;

    // Apply validations (errors thrown here are caught below)
    validateEmail(email);
    validateGender(gender);
    validatePhone(phone);
    validateAadhar(aadharNumber);
    validatePinCode(address.pinCode);
    validateGstin(gstIn);

    const updatedUser = await Owner.findByIdAndUpdate(
      authUserId,
      {
        name,
        gender,
        email,
        phone,
        gstIn,
        aadharNumber,
        address: {
          state: address.state,
          city: address.city,
          pinCode: address.pinCode,
        },
        picture: req.file?.buffer, // store image in Buffer
        bankDetails: {
          bankName: bankDetails.bankName,
          accountNumber: bankDetails.accountNumber,
          ifscCode: bankDetails.ifscCode,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // In passwordChange
    req.session.profileUpdate = true;

    res
      .status(200)
      .json({ message: "Profile updated successfully", owners: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    res.render("createProduct", {
      authPage: false,
      error,
      success,
      user: authUser,
      isLogin: !!authUser?._id,
      cartCount: authUser?.cart?.length || 0, // Example cart count
      wishlistCount: authUser?.wishlist?.length || 0,
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
      return res.redirect("/owners/createProduct");
    }

    if (!req.file) {
      req.flash("error", "Product image is required");
      return res.redirect("/owners/createProduct");
    }

    // Validate price
    if (!price || isNaN(price) || price < 0) {
      req.flash("error", "Price must be a positive number");
      return res.redirect("/owners/createProduct");
    }

    // Validate discount
    if (discount && (isNaN(discount) || discount < 0 || discount > 100)) {
      req.flash("error", "Discount must be between 0 and 100");
      return res.redirect("/owners/createProduct");
    }

    if (!stock || isNaN(stock) || stock < 0) {
      req.flash("error", "Stock quantity must be a positive number");
      return res.redirect("/owners/createProduct");
    }

    // Check if product already exists by model
    const existingProduct = await Product.findOne({ model });
    if (existingProduct) {
      req.flash("error", "A product with this model already exists!");
      return res.redirect("/owners/createProduct");
    }

    // Create new product document
    const newProduct = new Product({
      productName,
      productImage: req.file?.buffer, // store image in Buffer
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

    // find Owner by id
    const owner = await Owner.findById(authUserId);
    if (!owner) {
      req.flash("error", "Something went wrong!");
      return res.redirect("/");
    }

    // Add product ID to owner's products array
    owner.products.push(newProduct._id);

    // Save to MongoDB
    await newProduct.save();
    await owner.save();

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

      errors.forEach((err) =>
        req.flash("error", `${err.path}: ${err.message}`)
      );
      return res.redirect("/owners/createProduct");
    }

    req.flash("error", "Failed to Create product");
    return res.redirect("/owners/createProduct");
  }
};

export const updateProductPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Get the authenticated user's ID from JWT
    const authUser = req.user;

    // Extract the userId from the route parameter
    const productId = req.params.id;

    if (!authUser.id) {
      req.flash("error", "You are not authorized!");
      return res.redirect("/");
    }

    // find Products by ID
    const product = await Product.findById(productId);

    // set product data in authUser
    authUser.product = product;

    res.render("updateProduct", {
      authPage: false,
      error,
      success,
      user: authUser,
      isLogin: !!authUser?._id,
      cartCount: authUser?.cart?.length || 0, // Example cart count
      wishlistCount: authUser?.wishlist?.length || 0,
    });
  } catch (error) {
    console.error("Create Product error:", error);
    req.flash("error", "Server error during Product creating");
    return res.redirect("/");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID from JWT
    const productId = req.params.id; // Get product ID from URL params

    // Verify product exists
    const product = await Product.findById(productId);

    if (product.ownerId.toString() !== authUserId) {
      req.flash("error", "Unauthorized!");
      return res.redirect("/");
    }

    // Parse textual data from req.body.data
    if (!req.body.data) {
      return res.status(400).json({ message: "No product data provided" });
    }

    // Parse JSON data
    const data = JSON.parse(req.body.data);

    // Body contains updated-form data
    const {
      productName,
      brandName,
      category,
      price,
      discount,
      stock,
      bgColor,
      panelColor,
      description,
    } = data;

    //check form data is available in body or not
    if (!req.body || Object.keys(req.body).length === 0) {
      req.flash("error", "Form data is required");
      return res.redirect(`/owners/updateProduct/${productId}`);
    }

    // Validate price
    if (!price || isNaN(price) || price < 0) {
      req.flash("error", "Price must be a positive number");
      return res.redirect(`/owners/updateProduct/${productId}`);
    }

    // Validate discount
    if (discount && (isNaN(discount) || discount < 0 || discount > 100)) {
      req.flash("error", "Discount must be between 0 and 100");
      return res.redirect(`/owners/updateProduct/${productId}`);
    }

    // Validate stock
    if (stock === undefined || stock === null || isNaN(stock) || stock < 0) {
      req.flash("error", "Stock quantity must be a positive number");
      return res.redirect(`/owners/updateProduct/${productId}`);
    }

    // Prepare update object
    const updateData = {
      productName,
      brandName,
      category,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      bgColor,
      panelColor,
      description,
    };

    // Include image if uploaded
    if (req.file) {
      updateData.productImage = req.file.buffer;
    }

    // Update product in database
    await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    req.flash("success", "Product updated successfully");

    res
      .status(200)
      .json({ message: "Product updated successfully", updateData });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error);
    req.flash("error", "Server error during product update");
    res.redirect(`/owners/updateProduct/${req.params.id}`);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Get the authenticated user's ID from JWT
    const authUser = req.user.id;
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/owners/profile");
    }

    // Check if the user owns the product
    if (product.ownerId.toString() !== authUser) {
      req.flash("error", "Something went wrong!");
      return res.redirect("/");
    }

    // Find the owner and remove the product ID from their products array
    const owner = await Owner.findById(authUser);
    if (owner) {
      owner.products.pull(productId);
      await owner.save();
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    req.flash("success", "Product deleted successfully");
    res.status(200).json({ message: "Product Delete successfully", product });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error);
    req.flash("error", "Server error during product deletion");
    res.redirect("/owners/profile");
  }
};
