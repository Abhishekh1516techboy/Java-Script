import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const MenuSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    itemType: {
        type: String,
        enum: ['Beverage', 'Snack', 'Meal', 'Dessert'],
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: '', // Default to empty string if not provided
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    itemSell: {
        type: Number,
        min: 0,
        default: 0,
    },
    itemStock: {
        type: Number,
        min: 0,
        default: 0,
    },

}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)


// Export the model, using `Menu` as the model name
export default models.Menu || model("Menu", MenuSchema);
