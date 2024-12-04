import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [zip, setZip] = useState(""); // State for ZIP code input
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSearch = () => {
    // Navigate to the results page 
    // use zip are query parameter
    if (zip) {
      navigate(`/results?zip=${zip}`);
    } else {
      alert("Please enter a ZIP code."); // Prompt if no ZIP is entered
    }
  };

  return (
    <div>
      <h1>Weather Search</h1>
      <div>
        {/* Input field for ZIP code */}
        <input
          type="text"
          placeholder="ZIP code:"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        {/* Button to trigger search */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
