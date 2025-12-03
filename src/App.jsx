import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import SavedCities from "./components/SavedCities";
import "./App.css";

export default function App() {
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="app-container">
      <h1 className="title">🌤️ Weather Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      {selectedCity ? (
        <>
          <CurrentWeather city={selectedCity} />
          <Forecast city={selectedCity} />
          <SavedCities selectedCity={selectedCity} />
        </>
      ) : (
        <p className="placeholder">Search for a city to begin.</p>
      )}
    </div>
  );
}
