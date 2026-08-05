import React, { useEffect, useState } from 'react';
import { getPlaces } from '../../services/api';
import '../../styles/travel-spots.css';
import { getCategoryLabel } from '../../utils/category';

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
          <h2>Popular {headingCategory} in <span>{headingCity}</span></h2>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Fetching places...</p>
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
            const placeType = placeObj.place_type || placeObj.category || null;
            const readableCategory = getCategoryLabel(placeType || category || headingCategory);

            const lat = placeObj.lat ?? placeObj.latitude ?? placeObj.latlng?.lat;
            const lon = placeObj.lon ?? placeObj.longitude ?? placeObj.latlng?.lon;
            const hasCoords = typeof lat === 'number' || typeof lon === 'number' || (lat && lon);

            // Step 7: create Google Maps URL using backend coordinates
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${placeObj.lat},${placeObj.lon}`;

            const copyCoords = async (e) => {
              e.stopPropagation();
              e.preventDefault && e.preventDefault();
              if (!hasCoords) return;
              const text = `${lat}, ${lon}`;
              try {
                await navigator.clipboard.writeText(text);
              } catch (err) {
                // fallback: create temporary input
                const input = document.createElement('input');
                input.value = text;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
              }
            };

            return (
              <div
                key={index}
                className="spot-card"
              >
                <div className="spot-card-top">
                  <div className="spot-badge">{readableCategory}</div>
                </div>

                <div className="spot-card-body">
                  <h3 className="spot-title">
                    {placeObj.original_name || placeObj.name || placeObj.title}
                  </h3>

                  {placeObj.original_name && placeObj.name && placeObj.original_name !== placeObj.name && (
                    <p className="spot-subtitle">
                      {placeObj.name}
                    </p>
                  )}

                  {placeObj.address && <div className="spot-address">{placeObj.address}</div>}
                </div>

                <div className="spot-card-bottom">
                  <div className="spot-actions">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open in Google Maps
                      </a>                  
                  </div>
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