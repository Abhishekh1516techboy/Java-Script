import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const PostSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    postTitle: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // References user who post for this posts
      required: true,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    postedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.Post || model("Post", PostSchema);
