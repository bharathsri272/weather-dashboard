import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function SearchBar({ setLocation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchCities = async (text) => {
    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            q: text,
            limit: 5,
            appid: API_KEY,
          },
        }
      );

      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (cityObj) => {
    setQuery(`${cityObj.name}, ${cityObj.state || ""} ${cityObj.country}`);

    setLocation({
      city: cityObj.name,
      lat: cityObj.lat,
      lon: cityObj.lon,
    });

    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => searchCities(e.target.value)}
        placeholder="Search city..."
        className="search-input"
      />

      {results.length > 0 && (
        <ul className="dropdown">
          {results.map((city, i) => (
            <li key={i} onClick={() => handleSelect(city)}>
              {city.name}, {city.state || ""} {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
