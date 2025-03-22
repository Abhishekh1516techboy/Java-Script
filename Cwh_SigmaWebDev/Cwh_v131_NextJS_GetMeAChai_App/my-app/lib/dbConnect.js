import mongoose from "mongoose";

export default async function DbConnectMongo () {
    if (mongoose.connection.readyState === 0) { // check if the connection is not established
        try {
            await mongoose.connect(process.env.MONGODB_URI); // connect to MongoDB server
        } catch (error) { 
            console.error("Database connection error:", error);
            throw new Error("Failed to connect to the database");
        }
    }
} 