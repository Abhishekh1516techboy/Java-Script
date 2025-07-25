import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
    userName: userName?.toLowerCase(), // Store in lowerCase
    email,
    fullName,
    avatar: {
      url: avatar.url,
      public_id: avatar.public_id,
    },
    coverImage: coverImage
      ? {
          url: coverImage.url,
          public_id: coverImage.public_id,
        }
      : {
          url: "", // optional default empty
          public_id: "",
        },
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
    const user = await User.findById(decodedToken?._id).select("refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid refresh token: User not found");
    }

    // Match incoming refresh token with the refresh token stored in the DB
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired!");
    }

    // if Refresh Token matched generate new AccessToken & RefreshToken
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // if Refresh Token matched Set new Cookes in frontend
    const options = {
      httpOnly: true,
      secure: true,
    };

    // send response Access token refresh Successfully!
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            newRefreshToken: refreshToken,
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
  const user = await User.findById(authUser?._id).select("password");

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
    { new: true, runValidators: true } // enables regex and other schema validation
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

  // remove old Avatar from cloudinary
  const oldUser = await User.findById(authUser._id);
  if (oldUser?.avatar?.public_id) {
    await deleteFromCloudinary(oldUser.avatar.public_id);
  }

  // find the user by _id
  const updatedUser = await User.findByIdAndUpdate(
    authUser?._id,
    {
      $set: {
        avatar: {
          url: avatar.url,
          public_id: avatar.public_id,
        },
      },
    },
    { new: true, runValidators: true } // enables regex and other schema validation
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

  // remove old coverImage from cloudinary
  const oldUser = await User.findById(authUser._id);
  if (oldUser?.coverImage?.public_id) {
    await deleteFromCloudinary(oldUser.coverImage.public_id);
  }

  // find the user by _id and Update new coverImage
  const updatedUser = await User.findByIdAndUpdate(
    authUser?._id,
    {
      $set: {
        coverImage: {
          url: coverImage.url,
          public_id: coverImage.public_id,
        },
      },
    },
    { new: true, runValidators: true } // enables regex and other schema validation
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

// ----------Get User Channel Profile-----------
export const getUserChannelProfile = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract userName from URL params
  const { userName } = req.params;

  if (!userName?.trim()) {
    throw new ApiError(400, "UserName is missing!");
  }

  // Find by Aggregation Pipelines
  const channel = await User.aggregate([
    {
      $match: {
        userName: { $eq: userName?.toLowerCase() }, // Match userName case-sensitively
      },
    },
    {
      $lookup: {
        from: "subscriptions", // Join with subscriptions collection
        localField: "_id", // Match User._id
        foreignField: "channel", // With subscriptions.channel
        as: "subscribers", // Store results in subscribers array
      },
    },
    {
      $lookup: {
        from: "subscriptions", // Join with subscriptions collection
        localField: "_id", // Match User._id
        foreignField: "subscriber", // With subscriptions.subscriber
        as: "subscribedTo", // Store results in subscribers array
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: "$subscribers" }, // Number of subscribers
        subscribedToCount: { $size: "$subscribedTo" }, // Number of subscriptions
        isSubscribed: {
          $cond: {
            if: { $in: [authUser?._id, "$subscribers.subscriber"] }, // Check if authUser._id is in subscribers
            then: true, // User is subscribed
            else: false, // User is not subscribed
          },
        },
      },
    },
    {
      $project: {
        userName: 1,
        email: 1,
        fullName: 1,
        avatar: 1,
        coverImage: 1,
        subscribersCount: 1,
        subscribedToCount: 1,
        isSubscribed: 1, // Include subscription status
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel does not exists!");
  }

  // Return response Channel Fetched Successfully
  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User Channel Fetched Successfully!")
    );
});

// ----------Get Watch History-----------
export const getWatchHistory = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(authUser._id), // Get user with this ID
      },
    },
    // Get video details for user's watch history
    {
      $lookup: {
        from: "videos", // Look in videos collection
        localField: "watchHistory", // User's watchHistory (video IDs)
        foreignField: "_id", // Match with video _id
        as: "watchHistory", // Save results as watchHistory
        pipeline: [
          // Extra steps for each video
          // Get owner info for each video
          {
            $lookup: {
              from: "users", // Look in users collection
              localField: "owner", // Video's owner ID
              foreignField: "_id", // Match with user _id
              as: "owner", // Save as owner
              pipeline: [
                // Pick user details
                {
                  $project: {
                    fullName: 1, // Keep full name
                    userName: 1, // Keep username
                    avatar: 1, // Keep avatar
                  },
                },
              ],
            },
          },
          // Make owner a single object
          {
            $addFields: {
              owner: { $first: "$owner" }, // Take first owner from array
            },
          },
        ],
      },
    },
  ]);

  // Return response Watch History Fetched Successfully!
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch History Fetched Successfully!"
      )
    );
});
