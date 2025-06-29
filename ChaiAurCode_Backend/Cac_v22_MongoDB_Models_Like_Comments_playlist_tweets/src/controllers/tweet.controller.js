import mongoose, { isValidObjectId } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Tweet from "../models/tweet.model.js";
import User from "../models/user.model.js";

// ----------Create tweet-----------
export const createTweet = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get tweet content from request body
  const { content } = req.body;

  // Validate content
  if (!content?.trim()) {
    throw new ApiError(400, "Tweet content is required!");
  }

  if (!isValidObjectId(authUser?._id)) {
    throw new ApiError(401, "Invalid user authentication!");
  }

  // Create tweet
  const tweet = await Tweet.create({
    content,
    owner: authUser?._id,
  });

  if (!tweet) {
    throw new ApiError(500, "Failed to create tweet!");
  }

  // Return response Tweet created
  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet created successfully!"));
});

// ----------Get all tweets-----------
export const getUserTweets = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get userId from params
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId!");
  }

  // Verify user exists
  const user = await User.findById(userId).select("_id");

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              userName: 1,
              "avatar.url": 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "like",
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$like",
        },
        owner: {
          $first: "$owner",
        },
        isLiked: {
          $cond: {
            if: { $in: [authUser?._id, "$like.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1, // Newest first
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        likesCount: 1,
        createdAt: 1,
        isLiked: 1,
      },
    },
  ]);

  // Return response get tweets
  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
});

// ----------Update tweet-----------
export const updateTweet = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get tweetId from params
  const { tweetId } = req.params;

  // Get tweet content from request body
  const { content } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId!");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Tweet content is required!");
  }

  // Find tweet and verify ownership
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found!");
  }

  if (tweet.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this tweet!");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  if (!updatedTweet) {
    throw new ApiError(500, "Failed to edit tweet please try again!");
  }

  // Return response tweet updated
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully!"));
});

// ----------Delete tweet-----------
export const deleteTweet = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get tweetId from params
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId!");
  }

  // Find tweet and verify ownership
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found!");
  }

  if (tweet.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this tweet!");
  }

  // Delete tweet
  const dleetedTweet = await Tweet.deleteOne({ _id: tweetId });

  if (!dleetedTweet) {
    throw new ApiError(500, "Failed to delete tweet please try again!");
  }

  // Return response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully!"));
});
