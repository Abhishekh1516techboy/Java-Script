import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config(); // Load environment variables from .env file

connectDB();

/* ---------First Approach---------
import express from "express";
const app = express(); // Initialize Express app

// Connect DB
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });
    console.log("Database Connected Successfull.");

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on PORT: ${process.env.PORT}`);
      console.log(`App is running on: http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();
*/
