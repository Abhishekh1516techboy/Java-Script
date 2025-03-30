import mongoose from "mongoose";
// import bcrypt from "bcryptjs"; // Added bcrypt import

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
      match: /^[2-9]{1}[0-9]{11}$/, // Aadhar number must be a 12-digit number starting with 2-9
      //   select: false, // Hide by default in queries
    },
    candidateId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Improve query performance
    },
    party: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
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
          select: false, // Hidden by default for privacy and performance
        },
        votedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt)
);

//// Hash password before saving
// UserSchema.pre("save", async function (next) {
//   try {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // Generate hash with salt rounds of 10
//     const salt = await bcrypt.genSalt(10);
//     // password encryption and save
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

//// Add comparePassword method for matching password by user and database stored password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     throw new Error("Password comparison failed");
//   }
// };

// Export the model, using `User` as the model name
export default models.Candidate || model("Candidate", CandidateSchema);
