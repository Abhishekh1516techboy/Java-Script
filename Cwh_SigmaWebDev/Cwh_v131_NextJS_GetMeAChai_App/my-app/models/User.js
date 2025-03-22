import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // Email is mandatory
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String, // URL to the user's profile image
        default: ""   // Default to an empty string if no image is provided
    },
    coverPic: {
        type: String, // URL to the user's cover image
        default: ""   // Default to an empty string if no image is provided
    },
    razorpayId: {
        type: String, // Razorpay Customer ID
        default: ""   // Default to an empty string if no ID is provided
    },
    razorpaySecret: {
        type: String, // Razorpay Secret Key
        default: ""   // Default to an empty string if no key is provided
    },
    provider: {
        type: String, // The provider (e.g., 'google', 'github')
        required: true,
        enum: ['google', 'github', 'local'], // Limit to specific providers
    },
}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)


// Export the model, using `User` as the model name
export default models.User || model("User", UserSchema);
