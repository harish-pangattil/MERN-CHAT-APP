import React, { useState } from "react";
import ChatBox from "./components/ChatBox.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <h2>MERN Chat Application</h2>

      {!user ? (
        <div className="form-wrapper">
          <Register onRegister={setUser} />
          <Login onLogin={setUser} />
        </div>
      ) : (
        <ChatBox user={user} /> // user has username + token
      )}
    </div>
  );
}

export default App;
