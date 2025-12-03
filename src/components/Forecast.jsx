import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function Forecast({ city }) {
  const [forecast, setForecast] = useState(null);

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
        // OpenWeather gives 40 entries (3-hour increments)
        // Reduce to one per day (every 8 items)
        const daily = res.data.list.filter((_, index) => index % 8 === 0);
        setForecast(daily);
      })
      .catch((err) => console.log(err));
  }, [city]);

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

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="forecast-icon"
            />

            {/* Temperature */}
            <p className="temp">{Math.round(day.main.temp)}°C</p>

            {/* Description */}
            <p style={{ textTransform: "capitalize" }}>
              {day.weather[0].description}
            </p>
          </div>
        ))}

      </div>
    </>
  );
}
