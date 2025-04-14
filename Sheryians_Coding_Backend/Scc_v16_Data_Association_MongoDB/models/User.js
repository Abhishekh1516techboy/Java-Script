import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Standardized options
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        index: true,
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

// Export the model, using `Post` as the model name
export default models.BlogUser || model("BlogUser", UserSchema);
