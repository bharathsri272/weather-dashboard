import { useEffect, useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const API_KEY = "c25d90ef06c1b37bcf89c61e947341d1"; // ← replace this

export default function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      })
      .then((res) => {
        // This API returns data for every 3 hours → 40 entries
        // We extract ONE forecast per day at roughly the same time

        const daily = [];
        const list = res.data.list;

        const usedDates = new Set();

        list.forEach((entry) => {
          const date = entry.dt_txt.split(" ")[0];
          if (!usedDates.has(date)) {
            usedDates.add(date);
            daily.push(entry);
          }
        });

        // Only take next 5 days
        setForecast(daily.slice(0, 5));
        setError("");
      })
      .catch(() => {
        setError("Unable to load forecast.");
        setForecast([]);
      });
  }, [city]);

  if (error) return <p className="error">{error}</p>;
  if (forecast.length === 0) return <p className="loading">Loading forecast...</p>;

  const getIcon = (main) => {
    if (main === "Clear") return <WiDaySunny size={40} />;
    if (main === "Clouds") return <WiCloud size={40} />;
    if (main === "Rain") return <WiRain size={40} />;
    if (main === "Snow") return <WiSnow size={40} />;
    return <WiCloud size={40} />;
  };

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>

      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const date = new Date(day.dt_txt);
          const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

          return (
            <div className="forecast-card" key={index}>
              <p className="weekday">{weekday}</p>
              <div>{getIcon(day.weather[0].main)}</div>
              <p className="temp">{Math.round(day.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
