//import './styles/ResultsStyles.css';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation(); // Access the current route
  const [weatherData, setWeatherData] = useState(null); // State for weather data

  const zip = new URLSearchParams(location.search).get("zip"); //  ZIP code from query parameters
  const apiKey = "bf28e2ec66f8261604d86477ac848673"; // API key

  useEffect(() => {
    if (!zip) return;

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data)); // Set weather data
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
