import React, { useState } from 'react';
import Header from './header.jsx';
import Search from './search.jsx';
import Hero from './hero-section.jsx';
import TravelSpots from './travel-spots.jsx';

function Landing() {
  const [searchCity, setSearchCity] = useState('Mumbai');

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} currentCity={searchCity} />
      <Hero />
      <TravelSpots city={searchCity} />
    </div>
  );
}

export default Landing;