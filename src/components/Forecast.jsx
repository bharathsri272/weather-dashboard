import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function Forecast({ location, unit }) {
  const [forecast, setForecast] = useState(null);

  if (!location) return null;
  if (!location.lat || !location.lon) return null;

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat: location.lat,
          lon: location.lon,
          units: unit,
          appid: API_KEY,
        },
      })
      .then((res) => {
        const daily = res.data.list.filter((_, index) => index % 8 === 0);
        setForecast(daily);
      })
      .catch((err) => console.log(err));
  }, [location, unit]);

  if (!forecast) return <p>Loading forecast...</p>;

  return (
    <>
      <h2 className="forecast-title">5-Day Forecast</h2>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              className="forecast-icon"
            />

            <p className="temp">
              {Math.round(day.main.temp)}°
              {unit === "metric" ? "C" : "F"}
            </p>

            <p style={{ textTransform: "capitalize" }}>
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
