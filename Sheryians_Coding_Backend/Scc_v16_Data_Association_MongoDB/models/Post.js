import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "BlogUser", // References user who post for this posts
      required: true,
      index: true, 
    },
    postedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `User` as the model name
export default models.Post || model("Post", PostSchema);
