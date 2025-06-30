import mongoose, { isValidObjectId } from "mongoose";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// -------------Get all videos with optional query, sort, and pagination-------------
export const getAllVideos = asyncHandler(async (req, res) => {
  // Extract query parameters for pagination, search, sorting, and user filtering
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  // Validate pagination parameters
  if (page < 1 || limit < 1) {
    throw new ApiError(400, "Page and limit must be positive integers!");
  }

  // Initialize aggregation pipeline
  const pipeline = [];

  // Add search stage if query is provided (uses MongoDB Atlas search index)
  if (query) {
    pipeline.push({
      $search: {
        index: "search-videos",
        text: {
          query: query,
          path: ["title", "description"], // Search only in title and description
        },
      },
    });
  }

  // Filter videos by userId if provided
  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId!");
    }
    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    });
  }

  // Fetch only published videos set isPublished as true
  pipeline.push({ $match: { isPublished: true } });

  // Sort videos by specified field and order, default to newest first
  if (sortBy && sortType) {
    pipeline.push({
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    });
  } else {
    pipeline.push({ $sort: { createdAt: -1 } });
  }

  // Join with users collection to get owner details
  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
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
      $unwind: "$ownerDetails",
    }
  );

  // Execute aggregation
  const videoAggregate = Video.aggregate(pipeline);

  // Set pagination options
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  // Paginate results using mongoose-aggregate-paginate-v2
  const videos = await Video.aggregatePaginate(videoAggregate, options);

  // Return response paginated videos
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully!"));
});

// -------------Publish a new video with video file and thumbnail-------------
export const publishAVideo = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract and validate title and description
  const { title, description } = req.body;

  if ([title, description].some((field) => !field?.trim())) {
    throw new ApiError(400, "Title and description are required!");
  }

  // Extract file paths from uploaded files
  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  // Validate file uploads
  if (!videoFileLocalPath) {
    throw new ApiError(400, "Video file is required!");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required!");
  }

  // Upload files to Cloudinary
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  // Validate upload results
  if (!videoFile) {
    throw new ApiError(400, "Failed to upload video file on cloudinary!");
  }

  if (!thumbnail) {
    throw new ApiError(400, "Failed to upload thumbnail on cloudinary!");
  }

  // Create video document
  const video = await Video.create({
    title,
    description,
    duration: videoFile.duration,
    videoFile: {
      url: videoFile.url,
      public_id: videoFile.public_id,
    },
    thumbnail: {
      url: thumbnail.url,
      public_id: thumbnail.public_id,
    },
    owner: authUser?._id,
    uploadDate: Date.now(),
    isPublished: false,
  });

  // Verify video creation
  const videoUploaded = await Video.findById(video._id);

  if (!videoUploaded) {
    throw new ApiError(500, "Video upload failed, please try again!");
  }

  // Return response video uploaded
  return res
    .status(200)
    .json(new ApiResponse(200, videoUploaded, "Video uploaded successfully!"));
});

// -------------Get a video by ID with likes and subscription details-------------
export const getVideoById = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract and validate videoId
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  // Aggregate video details with likes and owner information
  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
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
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              subscribersCount: { $size: "$subscribers" },
              isSubscribed: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(authUser?._id),
                      "$subscribers.subscriber",
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              userName: 1,
              "avatar.url": 1,
              subscribersCount: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        owner: { $first: "$owner" },
        isLiked: {
          $cond: {
            if: {
              $in: [
                new mongoose.Types.ObjectId(authUser?._id),
                "$likes.likedBy",
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        "videoFile.url": 1,
        title: 1,
        description: 1,
        views: 1,
        uploadDate: 1,
        duration: 1,
        comments: 1,
        owner: 1,
        likesCount: 1,
        isLiked: 1,
      },
    },
  ]);

  // Check if video was found
  if (!video?.length) {
    throw new ApiError(404, "Video not found!");
  }

  // Increment views if video fetched successfully
  await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

  // Add video to user's watch history
  await User.findByIdAndUpdate(authUser?._id, {
    $addToSet: { watchHistory: videoId },
  });

  // Return response video (first item from aggregation)
  return res
    .status(200)
    .json(
      new ApiResponse(200, video[0], "Video details fetched successfully!")
    );
});

// -------------Update video details (title, description, thumbnail)-------------
export const updateVideo = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract and validate videoId
  const { videoId } = req.params;

  // Extract and validate title and description
  const { title, description } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(400, "Title and description are required!");
  }

  // Verify video exists
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Check ownership
  if (video.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this video!");
  }

  // Get old thumbnail public_id for deletion
  const thumbnailToDelete = video.thumbnail?.public_id;

  // Validate new thumbnail upload
  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required!");
  }

  // Upload new thumbnail to Cloudinary
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Failed to update thumbnail on clodinary!");
  }

  // Update video document
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: {
          url: thumbnail.url,
          public_id: thumbnail.public_id,
        },
      },
    },
    { new: true }
  );

  // Verify update
  if (!updatedVideo) {
    throw new ApiError(500, "Failed to update video, please try again!");
  }

  // Delete old thumbnail from Cloudinary
  await deleteFromCloudinary(thumbnailToDelete);

  // Return response thumbnail updated
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedVideo,
        "Video thumbnail updated successfully!"
      )
    );
});

// -------------Delete a video and its associated files, likes, and comments-------------
export const deleteVideo = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract and validate videoId
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  // Verify video exists
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Check ownership
  if (video.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(403, "Unzuthorized to delete this video!");
  }

  // Delete video document
  const deletedVideo = await Video.findByIdAndDelete(videoId);

  if (!deletedVideo) {
    throw new ApiError(500, "Failed to delete video, please try again!");
  }

  // Delete video and thumbnail from Cloudinary
  await deleteFromCloudinary(video.thumbnail?.public_id);
  await deleteFromCloudinary(video.videoFile?.public_id, "video"); // specify video while deleting video

  // Delete associated likes
  await Like.deleteMany({ video: videoId });

  // Delete associated comments
  await Comment.deleteMany({ video: videoId });

  // Return response video deleted
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully!"));
});

// -------------Toggle the publish status of a video-------------
export const togglePublishStatus = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract and validate videoId
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  // Verify video exists
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Check ownership
  if (video.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(403, "Unauthorized to toggle publish status!");
  }

  // Toggle publish status
  const toggledVideoPublish = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: !video.isPublished,
      },
    },
    { new: true }
  );

  // Verify update
  if (!toggledVideoPublish) {
    throw new ApiError(500, "Failed to toggle video publish status!");
  }

  // Return response updated publish status
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isPublished: toggledVideoPublish.isPublished },
        "Video publish status toggled successfully!"
      )
    );
});
