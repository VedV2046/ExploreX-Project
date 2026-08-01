import React, { useState } from 'react'
import Landing from './components/landing-page/landing'
import Discover from './components/new-page/discover'

function App() {
  const [page, setPage] = useState('landing')
  const [searchCity, setSearchCity] = useState('')

  const handleSearch = (city) => {
    setSearchCity(city)
    setPage('discover')
  }

  const goHome = () => setPage('landing')
  const goDiscover = () => setPage('discover')

  return (
    <div>
      {page === 'discover' ? (
        <Discover
          city={searchCity}
          onSearch={handleSearch}
          onHome={goHome}
          onDiscover={goDiscover}
        />
      ) : (
        <Landing onSearch={handleSearch} onHome={goHome} onDiscover={goDiscover} />
      )}
    </div>
  )
}

export default App;