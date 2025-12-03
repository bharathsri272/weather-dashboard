import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import SavedCities from "./components/SavedCities";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");

  return (
    <div className="app-container">
      <h1>🌤️ Weather Dashboard</h1>

      <SearchBar setCity={setCity} />

      <CurrentWeather city={city} />

      <Forecast city={city} />

      <SavedCities setCity={setCity} />
    </div>
  );
}

export default App;
