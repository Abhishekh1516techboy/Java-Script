import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbConnect = async () => {
    if (mongoose.connection.readyState === 0) { // check if the connection is not established
        try {
            await mongoose.connect(process.env.MONGODB_URI); // connect to MongoDB server
            console.log("Database Connected Successfully!")
        } catch (error) {
            console.error("Database connection error:", error);
            throw new Error("Failed to connect to the database");
        }
    }
}

export default dbConnect;