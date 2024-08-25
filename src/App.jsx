import React, { useState, useEffect, createContext } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import HighlightedCar from './pages/HighlightedCar.jsx'

export const CarContext = createContext([])

function App() {
  const [highlightedCars, setHighlightedCars] = useState([])
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('favorite'))
    {
      savedCars && setHighlightedCars(savedCars)
    }
  }, [])
  return (
    <CarContext.Provider value={{ highlightedCars, setHighlightedCars }}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/highlighted' element={<HighlightedCar />} />
        </Routes>
      </Router>
    </CarContext.Provider>
  )
}

export default App
