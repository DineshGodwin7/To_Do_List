import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      if (response.data["Sign In"] === "Success") {
        setMessage("Login successful!");
        console.log(response.data.Token)
        console.log(response.data.UserId)
        sessionStorage.setItem("Token", response.data.Token)
        sessionStorage.setItem("UserId", response.data.UserId)
        sessionStorage.setItem("Name", response.data.FirstName)
        navigate("/addtodo")
      } else {
        setError(response.data["User"]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {message && <p className="login-message success">{message}</p>}
        {error && <p className="login-message error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" className="login-input" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="login-input" onChange={handleChange} required />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
