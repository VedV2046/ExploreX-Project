export const CATEGORY_DATA = [
    {
        id: 'tourism',
        label: 'Tourism',
        icon: '🗺️',
        items: [
            { label: 'Tourist Attractions', value: 'tourism.attraction' },
            { label: 'Museums', value: 'entertainment.museum' },
            { label: 'Zoos', value: 'entertainment.zoo' },
        ],
    },
    {
        id: 'food',
        label: 'Food & Dining',
        icon: '🍴',
        items: [
            { label: 'Restaurants', value: 'catering.restaurant' },
            { label: 'Cafes', value: 'catering.cafe' },
            { label: 'Fast Food', value: 'catering.fast_food' },
        ],
    },
    {
        id: 'healthcare',
        label: 'Healthcare',
        icon: '🩺',
        items: [
            { label: 'Hospitals', value: 'healthcare.hospital' },
            { label: 'Clinic', value: 'healthcare.clinic_or_praxis' },
            {label: 'Dentist', value: 'healthcare.dentist' },
            {label: 'Pharmacies', value: 'healthcare.pharmacy' },
        ],
    },
    {
        id: 'transport',
        label: 'Transport',
        icon: '🚍',
        items: [
            { label: 'Bus Stops', value: 'public_transport.bus' },
            { label: 'Metro/Subway', value: 'railway.subway' },
            {label: 'Rental Car', value: 'rental.car' },
            {label: 'Rental Bike', value: 'rental.bike' },
            {label: 'Rental Boat', value: 'rental.boat' },
        ],
    },
    {
        id: 'nature',
        label: 'Nature & Outdoors',
        icon: '🌲',
        items: [
            { label: 'Parks', value: 'leisure.park' },
            { label: 'Beaches', value: 'beach' },
            { label: 'Mountains', value: 'natural.mountain' }
        ],
    },
    {
        id: 'Commercial',
        label: 'Commercial',
        icon: '🏪',
        items: [
            { label: 'SuperMarket', value: 'commercial.supermarket' },
            { label: 'Library', value: 'education.library' },
            { label: 'Stationery', value: 'commercial.stationery' },
        ],
    },
    {
        id: 'Accommodation',
        label: 'Accommodation',
        icon: '🏨',
        items: [
            { label: 'Hotel', value: 'accommodation.hotel' },
            { label: 'Beach Resort', value: 'beach.beach_resort' },
            { label: 'Hostel', value: 'accommodation.hostel' },
        ],
    },
    {
        id: 'Entertainment',
        label: 'Entertainment',
        icon: '🎭',
        items: [
            { label: 'Culture', value: 'entertainment.culture' },
            { label: 'Cinema', value: 'entertainment.cinema' },
            { label: 'Water Park', value: 'entertainment.water_park' },
            { label: 'Theme Park', value: 'entertainment.theme_park' },
            { label: 'Aquarium', value: 'entertainment.aquarium' },
            { label: 'Planetarium', value: 'entertainment.planetarium' },
            { label: 'Bowling', value: 'entertainment.bowling_alley' },
        ],
    },
    {
        id: 'Services',
        label: 'Services',
        icon: '🛎️',
        items: [
            { label: 'Police', value: 'services.police' },
            { label: 'Fire Station', value: 'services.fire_station' },
            { label: 'Taxi', value: 'services.taxi' },
            { label: 'Finance', value: 'services.financial' },
            { label: 'Travel Agency', value: 'services.travel_agency' },
        ],
    },
];

export const CATEGORY_LOOKUP = CATEGORY_DATA.reduce((lookup, category) => {
    lookup[category.id] = category;
    return lookup;
}, {});
