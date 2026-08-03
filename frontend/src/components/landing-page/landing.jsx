import React from 'react';
import Header from './header.jsx';
import Search from './search.jsx';
import Hero from './hero-section.jsx';
import Orb from './orb.jsx';

function Landing({
  onSearch,
  onHome,
  onDiscover,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}) {
  const searchCity = '';

  return (
    <div className="landing-page-shell">
      <div className="landing-orb-shell">
        <Orb
          hoverIntensity={1.5}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor=""none
        />
      </div>
      <div className="landing-page-content">
        <Header onHome={onHome} onDiscover={onDiscover} />
        <Search onSearch={onSearch} currentCity={searchCity} />
        <Hero
          city={searchCity}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={onCategoryChange}
          onSubcategoryChange={onSubcategoryChange}
        />
      </div>
    </div>
  );
}

export default Landing;