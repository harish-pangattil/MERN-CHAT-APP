// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect Socket.IO connections
// Ensures that only authenticated users can connect via sockets


export const protectSocket = async (socket, next) => {
  try {
    // Get JWT token sent from client during handshake
    const token = socket.handshake.auth.token;

    if (!token) {
      // If no token, reject connection
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB and exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    // Attach user info to socket object for later use
    socket.user = user;

    // Allow the connection
    next();
  } catch (error) {
    console.error("Socket authentication error:", error.message);
    next(new Error("Authentication error"));
  }
  
};

