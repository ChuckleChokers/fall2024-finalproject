import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginStyles.css"; // Import styles
import logo from "../assets/images/Weather.jpg"; // Import logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

//validate password and make sure it meets requirements

  const validatePassword = (password) => {
    const minLength = 8;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const hasUpperCase = /[A-Z]/;
    const hasDigit = /\d/;

    return (
      password.length >= minLength &&
      hasUpperCase.test(password) &&
      hasDigit.test(password) &&
      specialChars.test(password) &&
      !/[`'"]/g.test(password)
    );
  };

  /*handle login function to send a post request to the server*/
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, one digit, and one special character."
      );
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3010/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data); // log the response
  
      if (response.ok) {
        navigate("/search");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      setError("An unexpected error occurred");
    }
  };

  /*return the login form*/
  /*display form*/
  return (
    <div className="login-container">
      <img src={logo} alt="Weather Wise Logo" className="logo" />
      <div className="card">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
