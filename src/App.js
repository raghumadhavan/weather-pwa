import React, { useState } from "react";
import { fetchWeather } from "./api/FetchWeather";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const search = async e => {
    if (e.key === "Enter") {
      const response = await fetchWeather(query);
      const { data } = response;
      if (!data) {
        setQuery("");
        setWeather("");
        setError(response.message);
        return;
      }
      setWeather(data);
      setError("");
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {error && (
        <div className="city">
          <h2 className="city-name">{error}</h2>
        </div>
      )}
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-map">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
