import { useEffect, useState } from "react";
import axios from "axios";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const API_KEY = "c25d90ef06c1b37bcf89c61e947341d1"; // ← Replace this

export default function CurrentWeather({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      })
      .then((res) => {
        setWeather(res.data);
        setError("");
      })
      .catch(() => {
        setError("City not found.");
        setWeather(null);
      });
  }, [city]);

  if (error) return <p className="error">{error}</p>;
  if (!weather) return <p className="loading">Loading current weather...</p>;

  return (
    <div className="card current-weather">
      <h2>{weather.name}</h2>
      <p className="temp">{Math.round(weather.main.temp)}°C</p>

      <div className="details">
        <div>
          <WiHumidity size={30} /> {weather.main.humidity}% Humidity
        </div>
        <div>
          <WiStrongWind size={30} /> {weather.wind.speed} m/s Wind
        </div>
      </div>
    </div>
  );
}
