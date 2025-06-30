import mongoose, { isValidObjectId } from "mongoose";
import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
import Like from "../models/like.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// -----------Get all comments for a video-----------
export const getVideoComments = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get videoId from params
  const { videoId } = req.params;

  // Extract pagination options from query
  const { page = 1, limit = 10 } = req.query;

  // Validate videoId and check if video exists
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  // Check if the video exists in the database
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  //  Aggregation pipeline to fetch comments
  const commentsAggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    // Join with users collection to get owner details
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    // Join with likes collection to get likes for each comment
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
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
    // Sort comments by creation date (newest first)
    {
      $sort: {
        createdAt: -1,
      },
    },
    // Project only the required fields for the response
    {
      $project: {
        content: 1,
        createdAt: 1,
        likesCount: 1,
        owner: {
          userName: 1,
          fullName: 1,
          "avatar.url": 1,
        },
        isLiked: 1,
      },
    },
  ]);

  // Set pagination options
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  // Execute aggregation with pagination
  const comments = await Comment.aggregatePaginate(commentsAggregate, options);

  // return response comment fetched
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully!"));
});

// -----------Add a comment to a video-----------
export const addComment = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get videoId from params
  const { videoId } = req.params;

  // Get content from req.body
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Content is required!");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId!");
  }

  // Verify video exists
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: authUser?._id,
  });

  if (!comment) {
    throw new ApiError(500, "Failed to add comment, please try again!");
  }

  // Return response comment added
  return res
    .status(201)
    .json(new ApiResponse(200, comment, "Comment added successfully!"));
});

// -----------Update a comment-----------
export const updateComment = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get commentId from params
  const { commentId } = req.params;

  // Get content from req.body
  const { content } = req.body;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId!");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Content is required!");
  }

  // Verify comment exists and ownership
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(400, "Unauthorized to edit this comment comment!");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { $set: { content } },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(500, "Failed to edit comment, please try again!");
  }

  // Return response comment edited
  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment edited successfully!"));
});

// -----------Delete a comment-----------
export const deleteComment = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Get commentId from params
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  // Verify comment exists and ownership
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found!");
  }

  if (comment.owner?.toString() !== authUser?._id.toString()) {
    throw new ApiError(400, "Unauthorized delete this comment!");
  }

  // Delete comment and associated likes
  await Comment.findByIdAndDelete(commentId);

  await Like.deleteMany({
    comment: commentId,
    // likedBy: authUser?._id,
  });

  // Return response comment deleted
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully!"));
});
