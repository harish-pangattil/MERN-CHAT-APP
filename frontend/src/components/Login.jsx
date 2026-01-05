import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState(""); // using email for login
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Save token in localStorage
        localStorage.setItem("token", data.token);
        onLogin({ username: data.username, token: data.token });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
