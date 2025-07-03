import mongoose from "mongoose";
import Video from "../models/video.model.js";
import Subscription from "../models/subscription.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ----------Fetches statistics for a user's channel, including total subscribers, views, videos, and likes----------
export const getChannelStats = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Aggregate to count total subscribers for the user's channel
  const totalSubscribers = await Subscription.aggregate([
    // Match subscriptions where the channel is owned by the user
    {
      $match: {
        channel: new mongoose.Types.ObjectId(authUser?._id),
      },
    },
    // Group to count the total number of subscribers
    {
      $group: {
        _id: null,
        subscribersCount: {
          $sum: 1,
        },
      },
    },
  ]);

  // Aggregate to calculate total views, videos, and likes for the user's videos
  const video = await Video.aggregate([
    // Match videos owned by the user
    {
      $match: {
        owner: new mongoose.Types.ObjectId(authUser?._id),
      },
    },
    // Lookup likes associated with each video
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    // Project fields to calculate likes per video and retain views
    {
      $project: {
        totalLikes: {
          $size: "$likes",
        },
        totalViews: "$views",
        totalVideos: 1,
      },
    },
    // Group to sum total likes, views, and count videos
    {
      $group: {
        _id: null,
        totalLikes: {
          $sum: "$totalLikes",
        },
        totalViews: {
          $sum: "$totalViews",
        },
        totalVideos: {
          $sum: 1,
        },
      },
    },
  ]);

  // Combine stats into a single object, defaulting to 0 if no data is found
  const channelStats = {
    totalSubscribers: totalSubscribers[0]?.subscribersCount || 0,
    totalLikes: video[0]?.totalLikes || 0,
    totalViews: video[0]?.totalViews || 0,
    totalVideos: video[0]?.totalVideos || 0,
  };

  // Return success response with channel statistics
  return res
    .status(200)
    .json(
      new ApiResponse(200, channelStats, "Channel stats fetched successfully!")
    );
});

// ----------Fetches all videos uploaded by the user's channel with additional details----------
export const getChannelVideos = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Aggregate to fetch videos with likes and formatted creation date
  const videos = await Video.aggregate([
    // Match videos owned by the user
    {
      $match: {
        owner: new mongoose.Types.ObjectId(authUser?._id),
      },
    },
    // Lookup likes associated with each video
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    // Add fields for formatted creation date and likes count
    {
      $addFields: {
        createdAt: {
          $dateToParts: { date: "$uploadDate" },
        },
        likesCount: {
          $size: "$likes",
        },
      },
    },
    // Sort videos by creation date in descending order (newest first)
    {
      $sort: {
        createdAt: -1,
      },
    },
    // Project specific fields for the response
    {
      $project: {
        _id: 1,
        "videoFile.url": 1,
        "thumbnail.url": 1,
        title: 1,
        description: 1,
        createdAt: {
          year: 1,
          month: 1,
          day: 1,
        },
        isPublished: 1,
        likesCount: 1,
      },
    },
  ]);

  // Return success response with the list of videos
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully!"));
});
