import React, { useEffect, useState } from 'react'
import Landing from './components/landing-page/landing'
import Discover from './components/new-page/discover'
import { CATEGORY_DATA } from './data/categories'
import Footer from './components/landing-page/footer'

function App() {
  const [page, setPage] = useState('landing')
  const [searchCity, setSearchCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')

  useEffect(() => {
    window.history.replaceState({ page: 'landing' }, '', window.location.href)

    const handlePopState = (event) => {
      const nextPage = event.state?.page || 'landing'
      setPage(nextPage)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleSearch = (city) => {
    setSearchCity(city)
    setPage('discover')
    window.history.pushState({ page: 'discover' }, '', window.location.href)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const nextCategory = CATEGORY_DATA.find((item) => item.id === category)
    setSelectedSubcategory(nextCategory?.items?.[0]?.value || '')
  }

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory)
  }

  const goHome = () => {
    setPage('landing')
    window.history.replaceState({ page: 'landing' }, '', window.location.href)
  }

  const goDiscover = () => {
    setPage('discover')
    window.history.pushState({ page: 'discover' }, '', window.location.href)
  }

  return (
    <div>
      {page === 'discover' ? (
        <Discover
          city={searchCity}
          category={selectedSubcategory}
          onHome={goHome}
          onDiscover={goDiscover}
        />
      ) : (
        <Landing
          onSearch={handleSearch}
          onHome={goHome}
          onDiscover={goDiscover}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
        />
      )}
      <Footer />
    </div>
  )
}

export default App;