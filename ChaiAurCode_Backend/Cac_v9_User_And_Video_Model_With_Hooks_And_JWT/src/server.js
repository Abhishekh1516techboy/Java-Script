import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config(); // Load environment variables from .env file

const PORT = `${process.env.PORT}` || 3000; // PORT load from .env file

// DB-Connect and Server Connect
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });
    console.log("Database Connected Successfull.");

    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
      console.log(`App is running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo DB connection failed!!", err);
  });