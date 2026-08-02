export const CATEGORY_DATA = [
    {
        id: 'tourism',
        label: 'Tourism',
        icon: '🎡',
        items: [
            { label: 'Tourist Attractions', value: 'tourism.attraction' },
            { label: 'Museums', value: 'entertainment.museum' },
            { label: 'Zoos', value: 'entertainment.zoo' },
        ],
    },
    {
        id: 'food',
        label: 'Food & Dining',
        icon: '🍽',
        items: [
            { label: 'Restaurants', value: 'catering.restaurant' },
            { label: 'Cafes', value: 'catering.cafe' },
            { label: 'Fast Food', value: 'catering.fast_food' },
        ],
    },
    {
        id: 'healthcare',
        label: 'Healthcare',
        icon: '🏥',
        items: [
            { label: 'Hospitals', value: 'healthcare.hospital' },
            { label: 'Pharmacies', value: 'healthcare.pharmacy' },
        ],
    },
    {
        id: 'transport',
        label: 'Transport',
        icon: '🚌',
        items: [
            { label: 'Bus Stops', value: 'public_transport.bus' },
            { label: 'Parking', value: 'service.vehicle.parking' },
        ],
    },
    {
        id: 'nature',
        label: 'Nature & Outdoors',
        icon: '🌳',
        items: [
            { label: 'Parks', value: 'leisure.park' },
        ],
    },
];

export const CATEGORY_LOOKUP = CATEGORY_DATA.reduce((lookup, category) => {
    lookup[category.id] = category;
    return lookup;
}, {});
