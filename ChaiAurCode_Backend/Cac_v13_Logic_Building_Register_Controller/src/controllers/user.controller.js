import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { userName, email, fullName, password } = req.body;

  // Validation - not empty
  if (
    [userName, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if user already exists by (userName, email)
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  }).select("userName email");

  if (existedUser) {
    throw new ApiError(409, "User already exist with this email or userName.");
  }

  // Check for images, avatar image is required
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  // upload images to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file not upload on cloudinary.");
  }

  // Create user object - create new new-User document in DB
  const createdUser = await User.create({
    userName,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  // check for user creation or failed
  if (!createdUser) {
    throw new ApiError(400, "User creation failed!");
  }

  // return API response if user created successfully
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered Successfully."));
});
