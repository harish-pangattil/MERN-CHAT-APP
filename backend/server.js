// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { protectSocket } from "./middleware/authMiddleware.js";
import { registerUser, loginUser } from "./controllers/authController.js";
import Message from "./models/Message.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "https://mern-chat-app-1-0dan.onrender.com/", credentials: true ,headers: ["Content-Type"]}));
app.use(express.json());

// Auth routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// Fetch messages (page load only)
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// HTTP server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://mern-chat-app-1-0dan.onrender.com/",
    methods: ["GET", "POST"],
    headers: ["Content-Type"]
  },
});

// Socket auth
io.use(protectSocket);

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.user.username);

  socket.on("sendMessage", async ({ content }) => {
    try {
      if (!content?.trim()) return;

      const message = await Message.create({
        sender: socket.user.username, // TRUST SERVER
        content,
      });

      // send to everyone
      io.emit("receiveMessage", message);
    } catch (err) {
      console.error("Message error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.user.username);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
