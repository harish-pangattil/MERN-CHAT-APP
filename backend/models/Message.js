// models/Message.js
import mongoose from "mongoose";

// Define the structure of a chat message
const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // Who sent the message
    content: { type: String, required: true }, // Message text
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a model based on the schema
const Message = mongoose.model("Message", messageSchema);

export default Message;
