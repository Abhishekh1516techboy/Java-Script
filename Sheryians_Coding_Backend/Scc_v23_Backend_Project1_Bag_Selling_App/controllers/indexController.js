import User from "../models/user-model.js";
import Owner from "../models/owner-model.js";
import Product from "../models/product-model.js";
import jwt from "jsonwebtoken";

// Example bag data (replace with database query in production)
const carouselData = [
  {
    id: 1,
    name: "Urban Explorer Backpack",
    description:
      "Durable and stylish, ideal for city adventures and daily commutes.",
    price: 55.99,
    image:
      "https://skybags.co.in/cdn/shop/files/main-banner-backpack-2025-collection_2048x.jpg?v=1745838826",
    category: "Backpacks",
    rating: 4.5,
    offer: null,
  },
  {
    id: 2,
    name: "Classic Leather Tote",
    description: "Elegant and spacious, perfect for work or casual outings.",
    price: 79.99,
    image:
      "https://skybags.co.in/cdn/shop/files/website-banner_2048x.jpg?v=1745836659",
    category: "Duffel Bags",
    rating: 4.1,
    offer: 15,
  },
  {
    id: 3,
    name: "City Trek Backpack",
    description: "Lightweight and sturdy, designed for urban explorers.",
    price: 49.99,
    image:
      "https://vipbags.com/cdn/shop/files/Lexus_coral_1920x700_4ded0ccd-f631-481e-b930-4d59a9888362.jpg?v=1744357130",
    category: "Backpacks",
    rating: 4.2,
    offer: 10,
  },
  {
    id: 4,
    name: "TravelPro Trolley",
    description: "Robust and sleek, perfect for frequent travelers.",
    price: 99.99,
    image:
      "https://skybags.co.in/cdn/shop/files/Skybags_KV_Web_banner_2048x.webp?v=1744887326",
    category: "Trolley Bags",
    rating: 4.5,
    offer: null,
  },
  {
    id: 5,
    name: "Family Voyager Luggage",
    description: "Spacious and durable, ideal for family trips.",
    price: 129.99,
    image: "https://vipbags.com/cdn/shop/files/family-travel.png?v=1696326469",
    category: "Luggage",
    rating: 4.0,
    offer: 20,
  },
  {
    id: 6,
    name: "Student Scholar Backpack",
    description: "Comfortable and roomy, tailored for school essentials.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
    category: "School Bags",
    rating: 4.4,
    offer: 10,
  },
  {
    id: 7,
    name: "TechGuard Laptop Bag",
    description: "Padded and sleek, designed to protect your devices.",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Laptop Bags",
    rating: 4.7,
    offer: null,
  },
  {
    id: 8,
    name: "Adventure Duffel",
    description: "Versatile and tough, great for gym or weekend getaways.",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUyfHx8ZW58MHx8fHx8",
    category: "Duffel Bags",
    rating: 4.6,
    offer: null,
  },
];

const reviews = [
  {
    text: "Absolutely love my new bag!",
    author: "Priya S.",
    profilePic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    num: 4.5,
  },
  {
    text: "Great quality and fast shipping.",
    author: "Rahul M.",
    profilePic:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    num: 3.5,
  },
  {
    text: "Very good and fast shipping.",
    author: "Subham k.",
    profilePic:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
    num: 3.7,
  },
  {
    text: "Bags price and quility is awesom.",
    author: "Rounak kr.",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnN8ZW58MHx8MHx8fDA%3D",
    num: 4.0,
  },
  {
    text: "Nice bags good service.",
    author: "karishma k.",
    profilePic:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8",
    num: 4.2,
  },
];

// index page method (GET)
export const indexPage = async (req, res) => {
  let error = req.flash("error"); // Retrieve error flash messages
  let success = req.flash("success"); // Retrieve success flash messages

  try {
    // Check if product already exists by model
    const products = await Product.find().limit("12").sort({ updatedAt: -1 });

    if (!products) {
      req.flash("error", "Not Products Lists");
      return res.redirect("/");
    }

    let user = null;
    if (req.cookies?.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      user = decoded;
      //find user by userId and set picture in user
      if (!user?.isOwner) {
        user = await User.findById(user?.id);
        // --------------Add isInCart flag to products--------------
        const cartProductIds = user?.cart?.map((item) =>
          item.product.toString()
        );
        products.forEach((product) => {
          product.isInCart = cartProductIds.includes(product._id.toString());
        });
        products.isInCart = cartProductIds || false; // Default to false for non-logged-in users

        // -----------Add isInWishlist flag to products--------------
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
        user = await Owner.findById(user?.id);
      }
    }
    // console.log(products.id)
    res.render("index", {
      authPage: false,
      error,
      success,
      user,
      isLogin: !!user?._id,
      bags: products, // Pass the enhanced array of bags
      carouselData, // pass carousel poster
      reviews: reviews,
      cartCount: user?.cart?.length || 0,
      wishlistCount: user?.wishlist?.length || 0,
    });
  } catch (error) {
    console.error("Index Page error:", error);
    req.flash("error", "Server error in Index page");
    return res.redirect("/");
  }
};
