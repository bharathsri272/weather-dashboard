import { AiFillStar } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function SavedCities({
  savedCities,
  setSavedCities,
  setLocation,
}) {
  const loadCity = (cityObj) => {
    setLocation({
      city: cityObj.city,
      lat: cityObj.lat,
      lon: cityObj.lon,
    });
  };

  const deleteCity = (cityObj) => {
    setSavedCities(
      savedCities.filter(
        (c) => c.lat !== cityObj.lat || c.lon !== cityObj.lon
      )
    );
  };

  return (
    <div className="saved-container">
      <h2 className="saved-title">⭐ Saved Cities</h2>

      {savedCities.length === 0 && <p>No saved cities yet.</p>}

      {savedCities.map((c, index) => (
        <div key={index} className="saved-item">
          <AiFillStar size={22} color="gold" />

          <span className="saved-text" onClick={() => loadCity(c)}>
            {c.city}
          </span>

          <FaTrash
            size={18}
            color="red"
            className="trash-icon"
            onClick={() => deleteCity(c)}
          />
        </div>
      ))}
    </div>
  );
}
