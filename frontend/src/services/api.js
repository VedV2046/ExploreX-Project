const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getTravelSpots(city) {
    console.log("Backend URL:", BACKEND_URL);
    const response = await fetch(
        `${BACKEND_URL}/api/travel?city=${encodeURIComponent(city)}`
    );

    console.log("Response:", response);
    
    if (!response.ok) {
        throw new Error(`Server Error ${response.status}`);
    }

    return await response.json();
}