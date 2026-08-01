import React, { useState, useEffect } from 'react';
import { getTravelSpots } from "../../services/api";
import '../../styles/travel-spots.css';


function TravelSpots({ city }) {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  const fetchTravelSpots = async (selectedCity) => {
    setLoading(true);
    setError(null);

    try {
        const data = await getTravelSpots(selectedCity || "");
        console.log("Received Data:", data);

        if (Array.isArray(data.spots)) {
            setSpots(data.spots);
        } else if (Array.isArray(data)) {
            setSpots(data);
        } else {
            setSpots([]);
        }

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelSpots(city);
  }, [city]);

  return (
    <div className="travel-spots-section">
      <div className="spots-header">
        <h2>
          Travel Spots in <span>{city || 'Mumbai'}</span>
        </h2>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Fetching live travel spots from backend...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={() => fetchTravelSpots(city)}>
            Retry Fetching Live Data
          </button>
        </div>
      )}

      {!loading && !error && spots.length === 0 && (
        <div className="empty-state">
          <p>No travel spots found for "{city}". Try searching another city like Mumbai, Delhi, or Goa.</p>
        </div>
      )}

      {!loading && spots.length > 0 && (
        <div className="spots-grid">
          {spots.map((spot, index) => {
            const spotObj = typeof spot === 'string' ? { name: spot } : spot;
            return (
              <div key={index} className="spot-card">
                <span className="spot-badge">{spotObj.category || 'Must Visit'}</span>
                <h3 className="spot-title">{spotObj.name || spotObj.title || 'Popular Destination'}</h3>
                <p className="spot-description">
                  {spotObj.description || spotObj.details || `Discover iconic places and attractions in ${city || 'Mumbai'}.`}
                </p>
                <div className="spot-footer">
                  <span className="spot-rating">★ {spotObj.rating || '4.8'}</span>
                  <span>{spotObj.location || city || 'Mumbai'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TravelSpots;