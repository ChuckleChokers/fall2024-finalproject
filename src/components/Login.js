import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // React Router navigation

  // Password validation function with requirements from documentation
  const validatePassword = (password) => {
    const minLength = 8;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/; // Allowed special characters
    const hasUpperCase = /[A-Z]/;
    const hasDigit = /\d/;

    return (
      password.length >= minLength &&
      hasUpperCase.test(password) &&
      hasDigit.test(password) &&
      specialChars.test(password) &&
      !/[`'"]/g.test(password) // Exclude back quotes, single quotes, and double quotes
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();


    // Password validation
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

      if (response.ok) {
        // Move to search page after successful login
        navigate("/search");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    // Display login form
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
