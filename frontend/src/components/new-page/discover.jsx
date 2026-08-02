import React from 'react';
import Header from '../landing-page/header.jsx';
import Places from '../landing-page/Places.jsx';

function Discover({ city, category, onHome, onDiscover }) {
    return (
        <div>
            <Header onHome={onHome} onDiscover={onDiscover} />
            <Places city={city} category={category} />
        </div>
    );
}

export default Discover;