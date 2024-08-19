import { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import data from './taladrod-cars.min.json'
import Detail from './Detail'
import Home from './Home'
import Nav from './Nav'
import './App.css' // Import your CSS file

function App() {
  const [cars, setCars] = useState(data.Cars)
  const [filteredCars, setFilteredCars] = useState(data.Cars)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [option, setOption] = useState([])
  const [models, setModels] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [detailId, setDetailId] = useState('')

  useEffect(() => {
    const brands = cars.map((car) => car.NameMMT.split(' ')[0])
    const uniqueBrands = [...new Set(brands)]
    setOption(uniqueBrands)

    // Update models whenever cars or selectedBrand changes
    const filteredByBrand = cars.filter((car) =>
      car.NameMMT.includes(selectedBrand)
    )
    const brandModels = [...new Set(filteredByBrand.map((car) => car.Model))]
    setModels(brandModels)
  }, [cars, selectedBrand])

  const handleDetail = (id) => {
    setDetailId(id)
    setShowDetail(true)
  }

  const handleFilter = () => {
    let filtered = cars

    if (selectedBrand) {
      filtered = filtered.filter((car) => car.NameMMT.includes(selectedBrand))
    }
    if (selectedModel) {
      filtered = filtered.filter((car) => car.Model === selectedModel)
    }

    setFilteredCars(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [selectedBrand, selectedModel, priceRange])

  return (
    <div className='container'>
      <Home option={option} filteredCars={filteredCars} />

      {!showDetail && (
        <div>
          <div className='filters'>
            {/* Brand Filter */}
            <div className='brand-filter'>
              <label htmlFor='brand'>Filter by Brand:</label>
              <select
                id='brand'
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value)
                }}
              >
                <option value=''>All</option>
                {option.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div className='model-filter'>
              <label htmlFor='model'>Filter by Model:</label>
              <select
                id='model'
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value)
                }}
                disabled={!selectedBrand} // Disable if no brand is selected
              >
                <option value=''>All</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='car-list'>
            {filteredCars.map((car) => (
              <div key={car.Cid} className='car-card'>
                <img src={car.Img300} alt={car.Model} />
                <h3>Name: {car.NameMMT}</h3>
                <h3>Model: {car.Model}</h3>
                <h3>Province: {car.Province}</h3>
                <p>Year: {car.Yr}</p>
                <p>Status: {car.Status}</p>
                <p>Price: {car.Prc}</p>
                <button onClick={() => handleDetail(car.Cid)}>Details</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetail && (
        <Detail cars={cars} detailId={detailId} setShowDetail={setShowDetail} />
      )}
    </div>
  )
}

export default App
