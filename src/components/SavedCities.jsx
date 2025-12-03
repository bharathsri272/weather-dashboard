import { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";

export default function SavedCities({ selectedCity }) {
  const [saved, setSaved] = useState([]);

  // Load saved cities from localStorage on load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedCities")) || [];
    setSaved(stored);
  }, []);

  // Save city when it changes
  useEffect(() => {
    if (!selectedCity) return;

    setSaved((prev) => {
      if (prev.includes(selectedCity)) return prev; // avoid duplicates

      const updated = [...prev, selectedCity];
      localStorage.setItem("savedCities", JSON.stringify(updated));
      return updated;
    });
  }, [selectedCity]);

  // Remove city
  const removeCity = (city) => {
    const filtered = saved.filter((c) => c !== city);
    setSaved(filtered);
    localStorage.setItem("savedCities", JSON.stringify(filtered));
  };

  if (saved.length === 0) return null;

  return (
    <div className="saved-container">
      <h2>⭐ Saved Cities</h2>

      <ul className="saved-list">
        {saved.map((city, idx) => (
          <li key={idx} className="saved-item">
            <FaStar color="gold" />
            <span>{city}</span>
            <FaTrash
              className="trash-icon"
              onClick={() => removeCity(city)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
