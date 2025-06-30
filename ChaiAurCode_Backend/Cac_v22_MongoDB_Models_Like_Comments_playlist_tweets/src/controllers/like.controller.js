import mongoose, { isValidObjectId } from "mongoose";
import Like from "../models/like.model.js";
import Video from "../models/video.model.js";
import Tweet from "../models/tweet.model.js";
import Comment from "../models/comment.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ----------toggle Video Like/Dislike-----------
export const toggleVideoLike = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get videoId from params
  const { videoId } = req.params;

  // Validate inputs
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  // Check if the video exists
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Check if already liked
  const isAlreadyLiked = await Like.findOne({
    video: videoId,
    likedBy: authUser?._id,
  });

  // Unlike when already liked
  if (isAlreadyLiked) {
    await Like.findByIdAndDelete(isAlreadyLiked?._id);

    // Return response video Unliked
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isLiked: false }, "Video unliked successfully!")
      );
  }

  // Create like
  const like = await Like.create({
    video: videoId,
    likedBy: authUser?._id,
  });

  if (!like) {
    throw new ApiError(500, "Failed to like video!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Video liked successfully!"));
});

// ----------toggle Comment Like/Dislike-----------
export const toggleCommentLike = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get commentId from params
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId!");
  }

  // Check if the comment exists
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found!");
  }

  // Check if already liked
  const isAlreadyLiked = await Like.findOne({
    comment: commentId,
    likedBy: authUser?._id,
  });

  // Unlike when already liked
  if (isAlreadyLiked) {
    await Like.findByIdAndDelete(isAlreadyLiked?._id);

    // Return response comment Unliked
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isLiked: false },
          "Comment unliked successfully!"
        )
      );
  }

  // Create like
  const like = await Like.create({
    comment: commentId,
    likedBy: authUser?._id,
  });

  if (!like) {
    throw new ApiError(500, "Failed to like comment!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { isLiked: true }, "Comment liked successfully!")
    );
});

// ----------toggle Tweet Like/Dislike-----------
export const toggleTweetLike = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get tweetId from params
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId!");
  }

  // Check if the tweet exists
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found!");
  }

  // Check if already liked
  const likedAlready = await Like.findOne({
    tweet: tweetId,
    likedBy: authUser?._id,
  });

  // Unlike when already liked
  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready._id);

    // Return response tweet Unliked
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isLiked: false }, "Tweet unliked successfully!")
      );
  }

  // Create like
  const like = await Like.create({
    tweet: tweetId,
    likedBy: authUser?._id,
  });

  if (!like) {
    throw new ApiError(500, "Failed to like tweet!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Tweet liked successfully!"));
});

// ----------Get All Liked video-----------
export const getLikedVideos = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  const likedVideosAggregate = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(authUser?._id),
        video: { $ne: null }, // Ensure only video likes
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideo",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownerDetails",
            },
          },
          {
            $unwind: "$ownerDetails",
          },
        ],
      },
    },
    {
      $unwind: "$likedVideo",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 0,
        likedVideo: {
          _id: 1,
          "videoFile.url": 1,
          "thumbnail.url": 1,
          owner: 1,
          title: 1,
          description: 1,
          views: 1,
          duration: 1,
          uploadDate: 1,
          isPublished: 1,
          ownerDetails: {
            userName: 1,
            fullName: 1,
            "avatar.url": 1,
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedVideosAggregate,
        "Liked videos fetched successfully!"
      )
    );
});
