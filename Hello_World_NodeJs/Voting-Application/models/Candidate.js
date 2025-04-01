import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const CandidateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18, // Assuming users must be adults
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Standardized options
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      match: /^[2-9]{1}[0-9]{11}$/, // Aadhar number must be a 12-digit number starting with 2-9
      index: true, // Optimize lookups
      select: false, // Hide by default in queries
    },
    candidateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true, // Improve query performance
    },
    party: {
      type: String,
      required: true,
      trim: true,
      },
    constituency: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim:true
    },
    votedCount: {
      type: Number,
      min: 0,
      default: 0,
      index: true, // Useful for sorting/ranking
    },
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User", // References users who voted for this candidate
          required: true,
          index: true, // Optimize reverse lookups
        },
        votedAt: {
          type: Date,
          default: Date.now(),
        },
        _id: false, // Disable auto-generated _id
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);


// Add the pre-hook to prevent updates to votedCount and votes
CandidateSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // Get the update object from the query
    const update = this.getUpdate();

    // Remove restricted fields
    delete update.votedCount; // Remove votedCount from the update
    delete update.votes;      // Remove votes from the update

    // Set the modified update object back to the query
    this.setUpdate(update);

    // Proceed to the next middleware or operation
    next();
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
});


// Export the model, using `User` as the model name
export default models.Candidate || model("Candidate", CandidateSchema);
