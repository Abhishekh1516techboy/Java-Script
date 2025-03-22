import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true, // Removes extra spaces
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true, // Ensures consistent storage
        },
        phone: {
            type: String, // Keeps phone numbers with leading zeros or special formats
            required: [true, "Phone is required"],
            trim: true,
        },
        message: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Corrected model export
export default models.Contact || model("Contact", ContactSchema);
