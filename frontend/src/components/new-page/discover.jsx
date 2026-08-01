import React from 'react';
import Header from '../landing-page/header.jsx';
import Search from '../landing-page/search.jsx';
import TravelSpots from '../landing-page/travelSpots.jsx';

function Discover({ city, onSearch, onHome, onDiscover }) {
    return (
        <div>
            <Header onHome={onHome} onDiscover={onDiscover} />
            <TravelSpots city={city} />
        </div>
    );
}

export default Discover;