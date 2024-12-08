import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchStyles.css"; // Import the updated styles
import logo from "../assets/images/Weather.jpg"; // Import the logo

const Search = () => {
  const [zip, setZip] = useState(""); // State for ZIP code input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSearch = () => {
    // Validate ZIP code to make sure user enters 5 digit number
    const zipCodePattern = /^\d{5}$/; // Pattern for 5 digits
    if (!zipCodePattern.test(zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    // Navigate to the results page if valid
    setError(""); // Clear previous error
    navigate(`/results?zip=${zip}`);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={logo} alt="Weather Wise Logo" className="logo" />

      </div>
      <div className="container">
        <p>Enter your Zip Code to Display the Weather.</p>
        <div>
          <input
            type="text"
            placeholder="Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Search;
