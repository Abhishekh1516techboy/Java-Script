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
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['chef', 'waiter', 'manager', 'cleaner', 'receptionist'],
        require: true
    },
    salary: {
        type: Number,
        require: true
    }

}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)


// Export the model, using `Employee` as the model name
export default models.Employee || model("Employee", EmployeeSchema);
