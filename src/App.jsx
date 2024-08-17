import { useState, useEffect } from 'react'
import data from './taladrod-cars.min.json'
import Detail from './Detail'
import './App.css' // Import your CSS file

function App() {
  const [cars, setCars] = useState(data.Cars)
  const [filteredCars, setFilteredCars] = useState(data.Cars)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [option, setOption] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [detailId, setDetailId] = useState('')

  useEffect(() => {
    const brands = cars.map((car) => car.NameMMT.split(' ')[0])
    const uniqueBrands = [...new Set(brands)]
    setOption(uniqueBrands)
  }, [cars])

  const handleDetail = (id) => {
    setDetailId(id)
    setShowDetail(true)
  }

  const handleFilter = (brand) => {
    setSelectedBrand(brand)
    if (brand === '') {
      setFilteredCars(cars)
    } else {
      const filtered = cars.filter((car) => car.NameMMT.includes(brand))
      setFilteredCars(filtered)
    }
  }

  return (
    <div className='container'>
      {!showDetail && (
        <div>
          <div className='brand-filter'>
            <label htmlFor='brand'>Filter by Brand:</label>
            <select
              id='brand'
              value={selectedBrand}
              onChange={(e) => {
                handleFilter(e.target.value)
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
