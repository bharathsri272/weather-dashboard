import { useEffect, useState } from "react";
import axios from "axios";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function CurrentWeather({ location, unit, addCity }) {
  const [weather, setWeather] = useState(null);

  // Nothing selected yet
  if (!location) return <p>Search for a city...</p>;
  if (!location.lat || !location.lon) return null;

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: location.lat,
          lon: location.lon,
          units: unit,
          appid: API_KEY,
        },
      })
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err));
  }, [location, unit]);

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="card current-weather">
      <h2>{weather.name}</h2>

      <p className="temp-large">
        {Math.round(weather.main.temp)}°
        {unit === "metric" ? "C" : "F"}
      </p>

      <div className="details">
        <div>
          <WiHumidity size={32} /> {weather.main.humidity}% Humidity
        </div>
        <div>
          <WiStrongWind size={32} /> {weather.wind.speed} m/s Wind
        </div>
      </div>

      {/* Save city button */}
      <button
        className="save-button"
        onClick={() =>
          addCity({
            city: weather.name,
            lat: location.lat,
            lon: location.lon,
          })
        }
      >
        ⭐ Save City
      </button>
    </div>
  );
}
