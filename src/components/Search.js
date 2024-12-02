//import './styles/SearchStyles.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [zip, setZip] = useState(""); // State for ZIP code input
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSearch = () => {
    //Nav to results place 
    //zip code as query 
    navigate(`/results?zip=${zip}`);
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
        {/* Button to trigger the search */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
