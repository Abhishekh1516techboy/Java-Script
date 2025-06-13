import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
      min: 0,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    experienceInYears: {
      type: Number,
      default: 0,
      min: 0,
    },
    workStartTime: {
      type: String,
      required: true,
      trim: true,
    },
    workEndTime: {
      type: String,
      required: true,
      trim: true,
    },
    worksInHospitals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
