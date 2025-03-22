import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true, // Name is mandatory
    },
    to_User: {
        type: String,   
        required: true, // to_User is mandatory
    },
    from_User: {
        type: String,
        required: true, // from_User is mandatory
    },
    profilePic: {
        type: String,
        required: true, // profilePic
    },
    orderID: {
        type: String,
        required: true, // orderID is mandatory
    },
    message: {
        type: String,
    },
    amount: {
        type: Number,
        required: true, // Amount is mandatory
    },
    done: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)

// Export the model, using `User` as the model name
export default models.Payment || model("Payment", PaymentSchema);

