import React from 'react';
import Header from '../landing-page/header.jsx';

function Favourites({ onHome, onDiscover, onFavourites }) {
    return (
        <div>
            <Header onHome={onHome} onDiscover={onDiscover} onFavourites={onFavourites} />
            <div style={{padding: 24}}>
                <h2>Favourites</h2>
                <p>Your saved favourite places will appear here.</p>
            </div>
        </div>
    );
}

export default Favourites;
