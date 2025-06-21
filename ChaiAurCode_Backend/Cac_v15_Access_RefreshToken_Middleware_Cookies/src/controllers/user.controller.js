import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

// Generate Access and Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    // Call Access and Refresh Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefereshToken();

    // Store RefreshToken in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return Access and Refresh Tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Refresh and Access token!"
    );
  }
};

// ----------Register user-----------
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

// ----------Login user-----------
export const loginUser = asyncHandler(async (req, res) => {
  // Get user details from frontend (userName, email, password)
  const { userName, email, password } = req.body;

  if (!userName || !email) {
    throw new ApiError(400, "userName OR Email is required!");
  }

  // find the user in Db userName || email
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "Invalid user Credentials!");
  }

  // if user found check password is matched or not
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid user Credentials!");
  }

  // if password matched generate AccessToken & RefreshToken
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // if password matched Update lastLogin in DB
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // if password matched Set Cookes in frontend
  const options = {
    httpOnly: true,
    secure: true,
  };

  // send response Logged In Successfully!
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully!"
      )
    );
});

// ----------Logout user-----------
export const logoutUser = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user._id;

  await User.findOneAndUpdate(
    authUser,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  // Clear cookies from frontend
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully!"));
});
