import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Indian 10-digit phone number
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Validate email to allow only @gmail.com addresses
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setPhoneError("");
    setEmailError("");

    // Validate phone number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError("Invalid Indian phone number (10 digits starting with 6-9)");
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError("Email must be a valid @gmail.com address");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      setMessage(response.data.Message);
      // Redirect to login page after 2 seconds (to show the success message)
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.Error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        {message && <p className="signup-message success">{message}</p>}
        {error && <p className="signup-message error">{error}</p>}
        {usernameError && <p className="signup-message error">{usernameError}</p>}
        {phoneError && <p className="signup-message error">{phoneError}</p>}
        {emailError && <p className="signup-message error">{emailError}</p>}
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" className="signup-input" onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="signup-input" onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" className="signup-input" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email (@gmail.com)" className="signup-input" onChange={handleChange} required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number (Indian 10-digit)" className="signup-input" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="signup-input" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="signup-input" onChange={handleChange} required />
          <button type="submit" className="signup-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
