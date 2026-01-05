// config/db.js
import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using environment variable or fallback to local
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/chat-app"
    );

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    // Log the error and stop the server if DB connection fails
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
