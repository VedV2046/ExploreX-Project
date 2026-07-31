import React, { useState } from 'react';
import '../../styles/search.css';

function Search({ onSearch, currentCity }) {
  const [inputVal, setInputVal] = useState(currentCity || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() && onSearch) {
      onSearch(inputVal.trim());
    }
  };

  return (
    <div className="search">
        <h1>Where to, <span style={{color:"#8B5CF6"}}>Explorer?</span></h1>
        <form className="search-box" onSubmit={handleSubmit}>
          <input 
            className="search-input" 
            type="search" 
            placeholder="Search destination (e.g. Mumbai, Delhi, Goa)..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
    </div>
  );
}

export default Search;