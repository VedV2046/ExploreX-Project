import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/hero-section.css';

// ...existing code...
const defaultCategories = [
    { id: 1, title: 'Restaurants', subcategories: ['Fast Food', 'Fine Dining', 'Local Cuisine'] },
    { id: 2, title: 'Hospitals', subcategories: ['General Hospital', 'Clinic', 'Emergency Care'] },
    { id: 3, title: 'Cafes', subcategories: ['Coffee Shop', 'Bakery', 'Dessert Cafe'] },
    { id: 4, title: 'Medicals', subcategories: ['Pharmacy', 'Medical Store', 'Diagnostics'] },
    { id: 5, title: 'Bus Stops', subcategories: ['Local Bus Stop', 'Intercity Stop', 'Transit Hub'] },
    { id: 6, title: 'Parks', subcategories: ['Public Park', 'Playground', 'Nature Reserve'] },
];

function Hero({ city: cityProp = '' }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [categories, setCategories] = useState(defaultCategories);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    const cityFromQuery = new URLSearchParams(window.location.search).get('city') || '';
    const city = cityProp || cityFromQuery;

    useEffect(() => {
        const fetchCategories = async () => {
        if (!city.trim()) {
            setCategories(defaultCategories);
            setSelectedCategory('');
            setSelectedSubcategory('');
            setError('');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(
            `${API_BASE_URL}/api/categories?city=${encodeURIComponent(city.trim())}`
            );

            if (!response.ok) {
            throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            const nextCategories =
            Array.isArray(data?.categories) && data.categories.length
                ? data.categories
                : defaultCategories;

            setCategories(nextCategories);
            setSelectedCategory('');
            setSelectedSubcategory('');
        } catch {
            setCategories(defaultCategories);
            setError('Unable to connect to backend. Showing default categories.');
        } finally {
            setLoading(false);
        }
        };

        const timer = setTimeout(fetchCategories, 250);
        return () => clearTimeout(timer);
    }, [city, API_BASE_URL]);

    const selectedCategoryData = useMemo(
        () => categories.find((item) => item.title === selectedCategory),
        [categories, selectedCategory]
    );

    const subcategoryOptions = selectedCategoryData?.subcategories || [];

    return (
        <div className="hero-section">
            <div className="hero-headerRow">
                <div>
                <h2 className="hero-heading">Categories</h2>
                <p className="hero-subheading">
                    {city ? `City: ${city}` : 'Select a city to load categories'}
                </p>
                </div>
            </div>

            <div className="hero-formGrid">
                <div className="hero-field">
                <label htmlFor="category" className="hero-label">
                    Category
                </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                    }}
                    disabled={loading}
                    className="hero-select"
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                    <option key={category.id || category.title} value={category.title}>
                        {category.title}
                    </option>
                    ))}
                </select>
                </div>

                <div className="hero-field">
                <label htmlFor="subcategory" className="hero-label">
                    Subcategory
                </label>
                <select
                    id="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    disabled={!selectedCategory || loading}
                    className="hero-select"
                >
                    <option value="">Select subcategory</option>
                    {subcategoryOptions.map((sub) => (
                    <option key={sub} value={sub}>
                        {sub}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            {error ? <p className="hero-errorText">{error}</p> : null}

        </div>
    );
}

export default Hero;
// ...existing code...