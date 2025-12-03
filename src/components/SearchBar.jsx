import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
    </div>
  );
}
