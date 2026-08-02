import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/hero-section.css';

// ...existing code...
const defaultCategories = [
    { id: 1, title: 'Restaurants', value: 'catering.restaurant', subcategories: ['Fast Food', 'Fine Dining', 'Local Cuisine'] },
    { id: 2, title: 'Hospitals', value: 'healthcare.hospital', subcategories: ['General Hospital', 'Clinic', 'Emergency Care'] },
    { id: 3, title: 'Cafes', value: 'catering.cafe', subcategories: ['Coffee Shop', 'Bakery', 'Dessert Cafe'] },
    { id: 4, title: 'Medicals', value: 'healthcare.pharmacy', subcategories: ['Pharmacy', 'Medical Store', 'Diagnostics'] },
    { id: 5, title: 'Bus Stops', value: 'public_transport.bus', subcategories: ['Local Bus Stop', 'Intercity Stop', 'Transit Hub'] },
    { id: 6, title: 'Parks', value: 'leisure.park', subcategories: ['Public Park', 'Playground', 'Nature Reserve'] },
    { id: 7, title: 'Cinemas', value: 'entertainment.cinema', subcategories: ['Zoo', 'Safari Park', 'Animal Park'] },
];

const categoryLabelMap = {
    'catering.restaurant': 'Restaurants',
    'healthcare.hospital': 'Hospitals',
    'catering.cafe': 'Cafes',
    'healthcare.pharmacy': 'Medicals',
    'public_transport.bus': 'Bus Stops',
    'leisure.park': 'Parks',
    'entertainment.cinema': 'Cinemas',
};

const normalizeCategory = (category) => {
    if (!category) {
        return category;
    }

    if (category.value) {
        return category;
    }

    const mappedValue = defaultCategories.find((item) => item.title === category.title)?.value;

    return {
        ...category,
        value: mappedValue || category.value || category.title,
        title: category.title || category.label || category.name,
    };
};

function Hero({ city: cityProp = '', selectedCategory = '', onCategoryChange }) {
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
                ? data.categories.map(normalizeCategory)
                : defaultCategories;

            setCategories(nextCategories);
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
        () => categories.find((item) => item.value === selectedCategory || item.title === selectedCategory),
        [categories, selectedCategory]
    );

    const subcategoryOptions = selectedCategoryData?.subcategories || [];
    useEffect(() => {
        if (!selectedCategory) {
            setSelectedSubcategory('');
        }
    }, [selectedCategory]);

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
                    onCategoryChange?.(e.target.value);
                    setSelectedSubcategory('');
                    }}
                    disabled={loading}
                    className="hero-select"
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                    <option key={category.id || category.value || category.title} value={category.value || category.title}>
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