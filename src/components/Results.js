import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation(); // Access the current route
  const [weatherData, setWeatherData] = useState(null); // State for weather data

  // take zipcode from query parameter
  const zip = new URLSearchParams(location.search).get("zip");

  useEffect(() => {
    if (!zip) return;

    // Fetch weather data from backend
    fetch(`http://localhost:3010/api/curweather?zip=${zip}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data)) // Set weather data
      .catch((error) => console.error("Error fetching weather data:", error)); // Handle errors
  }, [zip]);

  return (
    <div>
      <h1>Weather</h1>

      {/* Display data */}
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <ul>
            <li>Current Temperature: {weatherData.main.temp}°F</li>
            <li>Relative Humidity: {weatherData.main.humidity}%</li>
            <li>Feels-like Temperature: {weatherData.main.feels_like}°F</li>
            <li>Sky Conditions: {weatherData.weather[0].description}</li>
            <li>High Temperature: {weatherData.main.temp_max}°F</li>
            <li>Low Temperature: {weatherData.main.temp_min}°F</li>
          </ul>
        </div>
      )}

      {/* Loading message */}
      {!weatherData && <p>Loading...</p>}
    </div>
  );
};

export default Results;
