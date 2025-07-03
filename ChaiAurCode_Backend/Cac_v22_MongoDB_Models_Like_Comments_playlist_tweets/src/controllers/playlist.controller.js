import mongoose, { isValidObjectId } from "mongoose";
import Playlist from "../models/playlist.model.js";
import Video from "../models/video.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// -----------Creates a new playlist with name and description-----------
export const createPlaylist = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract name and description from request body
  const { name, description } = req.body;

  // Validate that both name and description are provided
  if (!name || !description) {
    throw new ApiError(400, "Name and description both are required!");
  }

  // Create a new playlist with the provided details and the authenticated user's ID
  const playlist = await Playlist.create({
    name,
    description,
    owner: authUser?._id,
  });

  // Check if playlist creation was successful
  if (!playlist) {
    throw new ApiError(500, "failed to create playlist!");
  }

  // Return success response with the created playlist
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully!"));
});

// -----------Updates an existing playlist's name and description-----------
export const updatePlaylist = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract name, description from request
  const { name, description } = req.body;

  // Extract playlistId from request parameters
  const { playlistId } = req.params;

  // Validate that name and description are provided
  if (!name || !description) {
    throw new ApiError(400, "Name and description both are required!");
  }

  // Validate the playlistId format
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid PlaylistId!");
  }

  // Find the playlist by ID
  const playlist = await Playlist.findById(playlistId);

  // Check if playlist exists
  if (!playlist) {
    throw new ApiError(404, "Playlist not found!");
  }

  // Verify that the authenticated user is the playlist owner
  if (playlist.owner.toString() !== authUser?._id.toString()) {
    throw new ApiError(400, "unauthorized to Create playlist!");
  }

  // Update the playlist with new name and description
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlist?._id,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  );

  // Return success response with the updated playlist
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully!")
    );
});

// -----------Deletes a playlist by its ID-----------
export const deletePlaylist = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract playlistId from request parameters
  const { playlistId } = req.params;

  // Validate the playlistId format
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid PlaylistId!");
  }

  // Find the playlist by ID
  const playlist = await Playlist.findById(playlistId);

  // Check if playlist exists
  if (!playlist) {
    throw new ApiError(404, "Playlist not found!");
  }

  // Verify that the authenticated user is the playlist owner
  if (playlist.owner.toString() !== authUser?._id.toString()) {
    throw new ApiError(400, "Unauthorized to delete the playlist!");
  }

  // Delete the playlist
  await Playlist.findByIdAndDelete(playlist?._id);

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Playlist deleted successfully!"));
});

// -----------Adds a video to a playlist-----------
export const addVideoToPlaylist = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract playlistId and videoId from request parameters
  const { playlistId, videoId } = req.params;

  // Validate both playlistId and videoId formats
  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid PlaylistId or videoId!");
  }

  // Find the playlist and video by their IDs
  const playlist = await Playlist.findById(playlistId);
  const video = await Video.findById(videoId);

  // Check if playlist exists
  if (!playlist) {
    throw new ApiError(404, "Playlist not found!");
  }

  // Check if video exists
  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Verify that the authenticated user owns both the playlist and the video
  if (
    playlist.owner?.toString() !== authUser?._id.toString() ||
    video.owner?.toString() !== authUser?._id.toString()
  ) {
    throw new ApiError(403, "Unauthorized to add video to thier playlist!");
  }

  // Check if the video is already in the playlist to avoid unnecessary updates
  if (playlist.videos.some((id) => id.toString() === videoId.toString())) {
    throw new ApiError(400, "Video is already in the playlist!");
  }

  // Add the video to the playlist's videos array (using $addToSet to avoid duplicates)
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlist?._id,
    {
      $addToSet: {
        videos: videoId,
      },
    },
    { new: true }
  );

  // Check if the update was successful
  if (!updatedPlaylist) {
    throw new ApiError(400, "Failed to add video to playlist!");
  }

  // Return success response with the updated playlist
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPlaylist,
        "Added video to playlist successfully!"
      )
    );
});

// -----------Removes a video from a playlist-----------
export const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  // authenticated user from cookies
  const authUser = req.user;

  // Extract playlistId and videoId from request parameters
  const { playlistId, videoId } = req.params;

  // Validate both playlistId and videoId formats
  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid PlaylistId or videoId!");
  }

  // Find the playlist and video by their IDs
  const playlist = await Playlist.findById(playlistId);
  const video = await Video.findById(videoId);

  // Check if playlist exists
  if (!playlist) {
    throw new ApiError(404, "Playlist not found!");
  }
  // Check if video exists
  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  // Verify that the authenticated user owns both the playlist and video
  if (
    (playlist.owner?.toString() && video.owner.toString()) !==
    authUser?._id.toString()
  ) {
    throw new ApiError(
      404,
      "Unauthorized to remove video from thier playlist!"
    );
  }

  // Remove the video from the playlist's videos array
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        videos: videoId,
      },
    },
    { new: true }
  );

  // Return success response with the updated playlist
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPlaylist,
        "Removed video from playlist successfully!"
      )
    );
});

// -----------Fetches a playlist by its ID, including detailed video and owner information-----------
export const getPlaylistById = asyncHandler(async (req, res) => {
  // Extract playlistId from request parameters
  const { playlistId } = req.params;

  // Validate the playlistId format
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid PlaylistId!");
  }

  // Find the playlist by ID
  const playlist = await Playlist.findById(playlistId);

  // Check if playlist exists
  if (!playlist) {
    throw new ApiError(404, "Playlist not found!");
  }

  // Aggregate playlist data with video and owner details
  const playlistVideos = await Playlist.aggregate([
    // Match the playlist by ID
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    // Lookup videos associated with the playlist
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    // Filter for published videos only
    {
      $match: {
        "videos.isPublished": true,
      },
    },
    // Lookup owner details
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    // Add computed fields for total videos and views
    {
      $addFields: {
        totalVideos: {
          $size: "$videos",
        },
        totalViews: {
          $sum: "$videos.views",
        },
        owner: {
          $first: "$owner",
        },
      },
    },
    // Project specific fields for the response
    {
      $project: {
        name: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        totalVideos: 1,
        totalViews: 1,
        videos: {
          _id: 1,
          "videoFile.url": 1,
          "thumbnail.url": 1,
          title: 1,
          description: 1,
          duration: 1,
          createdAt: 1,
          views: 1,
        },
        owner: {
          userName: 1,
          fullName: 1,
          "avatar.url": 1,
        },
      },
    },
  ]);

  // Return success response with the aggregated playlist data
  return res
    .status(200)
    .json(
      new ApiResponse(200, playlistVideos[0], "Playlist fetched successfully!")
    );
});

// -----------Fetches all playlists owned by a specific user-----------
export const getUserPlaylists = asyncHandler(async (req, res) => {
  // Extract userId from request parameters
  const { userId } = req.params;

  // Validate the userId format
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId!");
  }

  // Aggregate playlists for the user with video details
  const playlists = await Playlist.aggregate([
    // Match playlists by owner ID
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    // Lookup videos associated with each playlist
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    // Add computed fields for total videos and views
    {
      $addFields: {
        totalVideos: {
          $size: "$videos",
        },
        totalViews: {
          $sum: "$videos.views",
        },
      },
    },
    // Project specific fields for the response
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        totalVideos: 1,
        totalViews: 1,
        updatedAt: 1,
      },
    },
  ]);

  // Return success response with the user's playlists
  return res
    .status(200)
    .json(
      new ApiResponse(200, playlists, "User playlists fetched successfully!")
    );
});
