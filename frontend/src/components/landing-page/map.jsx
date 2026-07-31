import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 18.5204, lng: 73.8567 }} // Pune
      zoom={12}
    >
      <Marker position={{ lat: 18.5204, lng: 73.8567 }} />
    </GoogleMap>
  );
}

export default MyMap;