import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function ChatBox({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  // Initialize socket after user logs in
  useEffect(() => {
    if (!user?.token) return;

    const s = io("https://mern-chat-app-xzs6.onrender.com", {
      auth: { token: user.token },
      transports: ["websocket"],
    });

    s.on("connect", () => console.log("🟢 Connected to Socket.IO:", s.id));
    s.on("connect_error", (err) => console.error("Socket connection error:", err.message));

    setSocket(s);

    return () => s.disconnect();
  }, [user]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch all messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // Listen for socket messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    const msgData = { sender: user.username, content: message };
    socket.emit("sendMessage", msgData); // realtime emit
    setMessage("");
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No messages yet</p>
        ) : (
          messages.map((m, i) => {
            const isUser = m.sender === user.username;
            return (
              <div
                key={i}
                className={`message ${isUser ? "user-message" : "other-message"}`}
              >
                <strong>{m.sender}</strong>: {m.content}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
