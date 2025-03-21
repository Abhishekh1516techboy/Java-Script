import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for the User
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['chef', 'waiter', 'manager', 'cleaner', 'receptionist'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    }

}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)


// Export the model, using `Employee` as the model name
export default models.Employee || model("Employee", EmployeeSchema);
