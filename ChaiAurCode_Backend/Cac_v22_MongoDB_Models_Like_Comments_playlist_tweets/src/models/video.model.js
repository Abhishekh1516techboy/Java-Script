import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      url: {
        type: String, // Cloudinary URL
        required: [true, "Video file is required"],
        trim: true,
        validate: {
          validator: function (url) {
            return /^https?:\/\/res\.cloudinary\.com\/.*\.(mp4|mov|avi|mkv|webm)$/.test(
              url
            );
          },
          message: "Invalid Cloudinary URL for video file",
        },
      },
      public_id: {
        type: String,
        required: [true, "Cloudinary public_id is required"],
      },
    },
    thumbnail: {
      url: {
        type: String, // Cloudinary URL
        required: [true, "Thumbnail is required"],
        trim: true,
        validate: {
          validator: function (url) {
            return /^https?:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png|webp)$/.test(
              url
            );
          },
          message: "Invalid Cloudinary URL for thumbnail",
        },
      },
      public_id: {
        type: String,
        required: [true, "Cloudinary public_id is required"],
      },
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    duration: {
      type: Number, // Duration in seconds from Cloudinary
      required: [true, "Video duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Video owner is required"],
      index: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

// Text index for search functionality
videoSchema.index({ title: "text" });

const Video = mongoose.model("Video", videoSchema);
export default Video;
