const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPlaces(city, category) {
    const placesUrl = `${BACKEND_URL}/api/places?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`;

    try {
        const response = await fetch(placesUrl);

        if (!response.ok) {
            throw new Error(`Server Error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        const fallbackUrl = `${BACKEND_URL}/api/travel?city=${encodeURIComponent(city)}`;
        const fallbackResponse = await fetch(fallbackUrl);

        if (!fallbackResponse.ok) {
            throw error;
        }

        return await fallbackResponse.json();
    }
}