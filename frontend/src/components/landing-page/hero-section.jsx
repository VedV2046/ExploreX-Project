import React, { useMemo } from 'react';
import Select from 'react-select';
import '../../styles/hero-section.css';
import { CATEGORY_DATA } from '../../data/categories';

const selectStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: '48px',
        borderRadius: '14px',
        borderColor: state.isFocused ? '#8B5CF6' : '#D7DBE7',
        boxShadow: state.isFocused ? '0 0 0 1px #8B5CF6' : 'none',
        backgroundColor: '#313031',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#8B5CF6',
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#313031',
        zIndex: 20,
        overflow: 'visible',
        maxHeight: 'none',
    }),
    menuList: (base) => ({
        ...base,
        backgroundColor: '#313031',
        padding: 0,
        maxHeight: 'none',
        overflowY: 'visible',
    }),
    option: (base, state) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: state.isSelected ? '#8B5CF6' : state.isFocused ? '#4B3F57' : '#313031',
        color: '#F6EDFF',
        cursor: 'pointer',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#F6EDFF',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#F6EDFF',
    }),
    input: (base) => ({
        ...base,
        color: '#F6EDFF',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#F6EDFF',
        '&:hover': {
            color: '#8B5CF6',
        },
    }),
    clearIndicator: (base) => ({
        ...base,
        color: '#F6EDFF',
        '&:hover': {
            color: '#DC2626',
        },
    }),
};

const formatCategoryOptionLabel = (option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true">{option.icon}</span>
        <span>{option.label}</span>
    </div>
);

function Hero({
    city: cityProp = '',
    selectedCategory = '',
    selectedSubcategory = '',
    onCategoryChange,
    onSubcategoryChange,
}) {
    const cityFromQuery = new URLSearchParams(window.location.search).get('city') || '';
    const city = cityProp || cityFromQuery;

    const categoryOptions = useMemo(
        () => CATEGORY_DATA.map((category) => ({
            value: category.id,
            label: category.label,
            icon: category.icon,
        })),
        []
    );

    const selectedCategoryData = useMemo(
        () => CATEGORY_DATA.find((category) => category.id === selectedCategory),
        [selectedCategory]
    );

    const subcategoryOptions = useMemo(
        () => (selectedCategoryData?.items || []).map((item) => ({
            value: item.value,
            label: item.label,
        })),
        [selectedCategoryData]
    );

    const selectedCategoryOption = categoryOptions.find((option) => option.value === selectedCategory) || null;
    const selectedSubcategoryOption = subcategoryOptions.find((option) => option.value === selectedSubcategory) || null;

    const handleCategorySelect = (option) => {
        onCategoryChange?.(option?.value || '');
    };

    const handleSubcategorySelect = (option) => {
        onSubcategoryChange?.(option?.value || '');
    };

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
                    <Select
                        inputId="category"
                        instanceId="category-select"
                        classNamePrefix="hero-select"
                        value={selectedCategoryOption}
                        onChange={handleCategorySelect}
                        options={categoryOptions}
                        placeholder="Choose a category..."
                        isClearable
                        isSearchable
                        isDisabled={!categoryOptions.length}
                        styles={selectStyles}
                        formatOptionLabel={formatCategoryOptionLabel}
                    />
                </div>

                <div className="hero-field">
                    <Select
                        inputId="subcategory"
                        instanceId="subcategory-select"
                        classNamePrefix="hero-select"
                        value={selectedSubcategoryOption}
                        onChange={handleSubcategorySelect}
                        options={subcategoryOptions}
                        placeholder={selectedCategory ? 'Choose a subcategory...' : 'Select a category first'}
                        isClearable
                        isSearchable
                        isDisabled={!selectedCategory || !subcategoryOptions.length}
                        styles={selectStyles}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;