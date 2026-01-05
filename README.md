# MERN Chat App

Hey there!

This is a simple real-time chat app I built using the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**.  
It lets users **register, login, and chat instantly** with others. Messages are saved in a **MongoDB database**, so nothing gets lost.

---

## Features

- Register and login with a username (JWT auth in the backend)
- Real-time chat with **instant updates** for everyone connected
- Messages are **stored in MongoDB** for persistence
- Responsive, clean UI with smooth chat bubbles
- Easy to extend for more features in the future

---

## How to Run It

### 1. Clone the repo

git clone https://github.com/harish-pangattil/Mern_Chat_Application
cd mern-chat-app

### 2. Backend Setup

cd backend
npm install

Create a .env file in the backend folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend server:
npm run dev

### 3. Frontend Setup

cd frontend
npm install
npm run dev
The app should now be running at http://localhost:5173 and backend at http://localhost:5000.

How to Use?
1.Open the app in your browser.
2.Register a new account or login if you already have one.
3.Start chatting! Messages will appear in real-time for everyone connected.

Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO
Frontend: React, Vite, CSS
Real-time communication: Socket.IO

Notes
Make sure MongoDB is running locally or use a cloud URI.
The app currently uses a simple login/register system on the frontend; backend JWT authentication is implemented.
All messages are broadcast instantly thanks to Socket.IO.