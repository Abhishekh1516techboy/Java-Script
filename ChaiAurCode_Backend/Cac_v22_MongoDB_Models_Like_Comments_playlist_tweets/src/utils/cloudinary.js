import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import ApiError from "./ApiError.js";

dotenv.config(); // Load environment variables from .env file

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File uploaded successfully!");

    // Remove the local file after file successfully upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload failed
    return null;
  }
};

export const deleteFromCloudinary = async (
  publicId,
  resource_type = "image"
) => {
  // Validate publicId
  if (!publicId) {
    throw new ApiError(400, "Public ID is required for deletion!");
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: `${resource_type}`,
    });

    // Check deletion result
    if (result.result !== "ok") {
      throw new ApiError(500, `Cloudinary deletion failed: ${result.result}`);
    }

    console.log(`File deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error(
      `Failed to delete file from Cloudinary: ${publicId}`,
      error.message
    );
    throw new ApiError(500, `Cloudinary deletion failed: ${error.message}`);
  }
};
