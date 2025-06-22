import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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

  if (!avatar?.url) {
    throw new ApiError(400, "Error while uploading Avatar on Cloudinary");
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

  if (!userName && !email) {
    throw new ApiError(400, "userName And Email is required!");
  }

  // find the user in Db userName && email
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  }).select("password");

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

  // find LoggedIn user by userId
  const loggedInUser = await User.findById(user._id);

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
          user: loggedInUser,
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
  const authUser = req.user;

  // Find user by _id
  await User.findOneAndUpdate(
    authUser?._id,
    {
      $unset: { refreshToken: 1 }, // removes the field from document
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

// ----------Refresh Access Token-----------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // Extract token from cookies OR body
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request!");
    }

    // Verify Refresh Token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // find user exist in DB or not
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token: User not found");
    }

    // Match incoming refresh token with the refresh token stored in the DB
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired!");
    }

    // if Refresh Token matched generate new AccessToken & RefreshToken
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    // if Refresh Token matched Set new Cookes in frontend
    const options = {
      httpOnly: true,
      secure: true,
    };

    // send response Access token refresh Successfully!
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refresh successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token!");
  }
});

// ----------Change User Password-----------
export const chnageCurrentUserPassword = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get data from frontend
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Validate password legth
  if (newPassword.length < 8) {
    throw new ApiError(400, "New password must be at least 8 characters long!");
  }

  // Check newpassword OR confirmPassword is matched
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password do not match!");
  }

  // Find user by _id
  const user = await User.findById(authUser?._id);

  // Check password is matched or not
  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    throw new ApiError(400, "Invalid password!");
  }

  // Set new Password in DB
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  // Return response password change Successfully
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Chnaged Successfully!"));
});

// ----------Get Current User-----------
export const getCurrentUser = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Return response Current user
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: authUser,
      },
      "Current User Fetched Successfully!"
    )
  );
});

// ----------Update Account Datails-----------
export const updateAccountDetails = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get data from frontend
  const { fullName, email } = req.body;

  if (!fullName && !email) {
    throw new ApiError(400, "All fields are required!");
  }

  // find the user by _id
  const updatedUser = await User.findByIdAndUpdate(
    authUser?._id,
    {
      $set: { fullName, email },
    },
    { new: true }
  );

  // check for user Updation success or failed
  if (!updatedUser) {
    throw new ApiError(400, "Account Details Updation failed!");
  }

  // Return response Updated user
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: updatedUser,
      },
      "Account Details Updated Successfully!"
    )
  );
});

// ----------Update User Avatar-----------
export const updateUserAvatar = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract Avatar From Frontend
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing!");
  }

  // upload Avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar?.url) {
    throw new ApiError(400, "Error while uploading Avatar on Cloudinary!");
  }

  // find the user by _id
  const updatedUser = await User.findByIdAndUpdate(
    authUser?._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true }
  );

  // check for user Updation success or failed
  if (!updatedUser) {
    throw new ApiError(400, "User Avatar Updation failed!");
  }

  // Return response Updated user
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: updatedUser,
      },
      "User Avatar Updation Successfully!"
    )
  );
});

// ----------Update User coverImage-----------
export const updateUserCoverImage = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract CoverImage From Frontend
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "CoverImage file is missing!");
  }

  // upload CoverImage to cloudinary
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage?.url) {
    throw new ApiError(400, "Error while uploading CoverImage on Cloudinary!");
  }

  // find the user by _id
  const updatedUser = await User.findByIdAndUpdate(
    authUser?._id,
    {
      $set: { coverImage: coverImage.url },
    },
    { new: true }
  );

  // check for user Updation success or failed
  if (!updatedUser) {
    throw new ApiError(400, "User CoverImage Updation failed!");
  }

  // Return response Updated user
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: updatedUser,
      },
      "User CoverImage Updation Successfully!"
    )
  );
});
