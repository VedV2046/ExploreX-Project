import React from 'react';
import Header from './header.jsx';
import Search from './search.jsx';
import Hero from './hero-section.jsx';
import MyMap from './map.jsx';

function Landing({ onSearch, onHome, onDiscover }) {
  const searchCity = '';

  return (
    <div>
      <Header onHome={onHome} onDiscover={onDiscover} />
      <Search onSearch={onSearch} currentCity={searchCity} />
      <Hero city={searchCity} />
      {/* <MyMap /> */}
    </div>
  );
}

export default Landing;