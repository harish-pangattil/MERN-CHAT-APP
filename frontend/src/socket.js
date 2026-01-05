import { io } from "socket.io-client";

// Get JWT token from localStorage (if using authentication)
const token = localStorage.getItem("token");

// Connect to backend Socket.IO server
const socket = io("http://localhost:5000", {
  auth: { token },          // optional: send token for backend auth
  transports: ["websocket"] // force WebSocket transport
});

// Optional: handle connection errors
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

socket.on("connect", () => {
  console.log("Connected to Socket.IO server:", socket.id);
});

export default socket;
