import { useEffect, useState } from "react";
import axios from "axios";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function CurrentWeather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      })
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err));
  }, [city]);

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="card current-weather">
      <h2>{weather.name}</h2>

      {/* ICON */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="forecast-icon"
      />

      {/* TEMPERATURE */}
      <p className="temp-large">{Math.round(weather.main.temp)}°C</p>

      {/* DESCRIPTION */}
      <p style={{ color: "#333", textTransform: "capitalize" }}>
        {weather.weather[0].description}
      </p>

      {/* DETAILS */}
      <div className="details">
        <div>
          <WiHumidity size={32} /> {weather.main.humidity}% Humidity
        </div>
        <div>
          <WiStrongWind size={32} /> {weather.wind.speed} m/s Wind
        </div>
      </div>
    </div>
  );
}
