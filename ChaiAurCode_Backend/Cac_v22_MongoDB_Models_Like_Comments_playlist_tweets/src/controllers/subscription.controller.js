import mongoose, { isValidObjectId } from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Subscription from "../models/subscription.model.js";

// ------------toggle subscription status for a channel------------
export const toggleSubscription = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract channelId from request parameters
  const { channelId } = req.params;

  // Validate channelId is a valid MongoDB ObjectId
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channelId!");
  }

  // Check if the user is already subscribed to the channel
  const isSubscribed = await Subscription.findOne({
    subscriber: authUser?._id, // Authenticated user's ID
    channel: channelId,
  });

  // If already subscribed, remove the subscription (unsubscribe)
  if (isSubscribed) {
    await Subscription.findByIdAndDelete(isSubscribed?._id);

    // Return response indicating successful unsubscription
    return res
      .status(200)
      .json(
        new ApiResponse(200, { subscribed: false }, "Unsubscribed successfully")
      );
  }

  // If not subscribed, create a new subscription
  await Subscription.create({
    subscriber: authUser?._id,
    channel: channelId,
  });

  // Return response successful subscription
  return res
    .status(200)
    .json(
      new ApiResponse(200, { subscribed: true }, "Subscribed successfully!")
    );
});

// ------------fetch the list of subscribers for a specific channel------------
export const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  // Extract channelId from request parameters
  let { channelId } = req.params;

  // Validate channelId is a valid MongoDB ObjectId
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channelId!");
  }

  // Aggregate to fetch subscribers and their details
  const subscribers = await Subscription.aggregate([
    {
      // Match subscriptions for the given channel
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      // Lookup to join with users collection to get subscriber details
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            // Nested lookup to check if the channel is subscribed to the subscriber (mutual subscription)
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },
          {
            // Add fields for mutual subscription status and subscriber count
            $addFields: {
              subscribedToSubscriber: {
                $cond: {
                  if: {
                    $in: [channelId, "$subscribedToSubscriber.subscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscribersCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      // Unwind the subscriber array to flatten results
      $unwind: "$subscriber",
    },
    {
      // Project specific fields for the response
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          userName: 1,
          fullName: 1,
          "avatar.url": 1,
          subscribedToSubscriber: 1,
          subscribersCount: 1,
        },
      },
    },
  ]);

  // Return the list of subscribers
  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully!")
    );
});

// ------------fetch the list of channels a user is subscribed to---------
export const getSubscribedChannels = asyncHandler(async (req, res) => {
  // Extract subscriberId from request parameters
  const { subscriberId } = req.params;

  // Validate channelId is a valid MongoDB ObjectId
  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriberId!");
  }

  // Aggregate to fetch subscribed channels and their latest video
  const subscribedChannels = await Subscription.aggregate([
    {
      // Match subscriptions for the given subscriber
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      // Lookup to join with users collection to get channel details
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedChannel",
        pipeline: [
          {
            // Nested lookup to fetch videos owned by the channel
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "owner",
              as: "videos",
              pipeline: [
                {
                  // Sort videos by creation date to ensure latest video is last
                  $sort: { createdAt: -1 },
                },
              ],
            },
          },
          {
            // Add field for the latest video
            $addFields: {
              latestVideo: {
                $last: "$videos",
              },
            },
          },
        ],
      },
    },
    {
      // Unwind the subscribedChannel array to flatten results
      $unwind: "$subscribedChannel",
    },
    {
      // Project specific fields for the response
      $project: {
        _id: 0,
        subscribedChannel: {
          _id: 1,
          userName: 1,
          fullName: 1,
          "avatar.url": 1,
          latestVideo: {
            _id: 1,
            "videoFile.url": 1,
            "thumbnail.url": 1,
            owner: 1,
            title: 1,
            description: 1,
            duration: 1,
            createdAt: 1,
            views: 1,
          },
        },
      },
    },
  ]);

  // Return the list of subscribed channels
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed channels fetched successfully!"
      )
    );
});
