import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import SavedCities from "./components/SavedCities";
import "./App.css";

function App() {
  // Start with no selected location
  const [location, setLocation] = useState(null);

  // temp unit: metric (°C) or imperial (°F)
  const [unit, setUnit] = useState("metric");

  // Saved cities list
  const [savedCities, setSavedCities] = useState([]);

  // Load saved settings on first load
  useEffect(() => {
    const storedUnit = localStorage.getItem("weatherUnit");
    if (storedUnit) setUnit(storedUnit);

    const storedCities = localStorage.getItem("savedCities");
    if (storedCities) setSavedCities(JSON.parse(storedCities));
  }, []);

  // Save unit
  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  // Save cities
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  // Add city to saved list
  const addCity = (cityObj) => {
    if (!cityObj || !cityObj.lat || !cityObj.lon) return;

    // avoid duplicates
    if (savedCities.some((c) => c.lat === cityObj.lat && c.lon === cityObj.lon)) return;

    setSavedCities([...savedCities, cityObj]);
  };

  return (
    <div className="app-container">
      <h1>🌤️ Weather Dashboard</h1>

      {/* UNIT TOGGLE */}
      <div className="unit-toggle">
        <button
          className={unit === "metric" ? "active" : ""}
          onClick={() => setUnit("metric")}
        >
          °C
        </button>
        <button
          className={unit === "imperial" ? "active" : ""}
          onClick={() => setUnit("imperial")}
        >
          °F
        </button>
      </div>

      {/* SEARCH */}
      <SearchBar setLocation={setLocation} />

      {/* Only show weather after search */}
      {location && (
        <>
          <CurrentWeather location={location} unit={unit} addCity={addCity} />
          <Forecast location={location} unit={unit} />
        </>
      )}

      {/* Saved cities list */}
      <SavedCities
        savedCities={savedCities}
        setSavedCities={setSavedCities}
        setLocation={setLocation}
      />
    </div>
  );
}

export default App;
