import React, { useEffect, useState } from 'react';
import { getPlaces } from '../../services/api';
import '../../styles/travel-spots.css';

const categoryLabelMap = {
    'catering.restaurant': 'Restaurants',
    'healthcare.hospital': 'Hospitals',
    'catering.cafe': 'Cafes',
    'healthcare.pharmacy': 'Medicals',
    'public_transport.bus': 'Bus Stops',
    'leisure.park': 'Parks',
    'entertainment.cinema': "Cinemas",
};

const getCategoryLabel = (category) => categoryLabelMap[category] || category || 'Places';

function Places({ city, category }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlaces = async (selectedCity, selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
        const data = await getPlaces(selectedCity || '', selectedCategory || '');
        console.log("Backend Response:", data);
        console.log("Places Array:", data.places);

        if (Array.isArray(data.places)) {
            setPlaces(data.places);
        } else if (Array.isArray(data.spots)) {
            setPlaces(data.spots);
        } else if (Array.isArray(data)) {
            setPlaces(data);
        } else {
            setPlaces([]);
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

  useEffect(() => {
    fetchPlaces(city, category);
  }, [city, category]);

  const headingCategory = getCategoryLabel(category);
  const headingCity = city || 'Mumbai';

  return (
    <div className="travel-spots-section">
      <div className="spots-header">
        <h2>
          {headingCategory} in <span>{headingCity}</span>
        </h2>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Fetching live places from backend...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={() => fetchPlaces(city, category)}>
            Retry Fetching Live Data
          </button>
        </div>
      )}

      {!loading && !error && places.length === 0 && (
        <div className="empty-state">
          <p>
            No {headingCategory.toLowerCase()} found for "{headingCity}". Try searching another city or category.
          </p>
        </div>
      )}

      {!loading && places.length > 0 && (
        <div className="spots-grid">
          {places.map((place, index) => {
            const placeObj = typeof place === 'string' ? { name: place } : place;
            const cardCategory = placeObj.place_type || placeObj.category || headingCategory;

            return (
              <div key={index} className="spot-card">
                <span className="spot-badge">{cardCategory || 'Place'}</span>
                <h3 className="spot-title">{placeObj.name || placeObj.title || 'Popular Place'}</h3>
                <p className="spot-description">
                  {placeObj.description || placeObj.details || `Discover useful places in ${headingCity}.`}
                </p>
                <div className="spot-footer">
                  <span className="spot-rating">★ {placeObj.rating || '4.8'}</span>
                  <span>{placeObj.location || headingCity}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Places;