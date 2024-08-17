import { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
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

  // Prepare data for the Bar chart
  const barData = {
    labels: option,
    datasets: [
      {
        label: 'Number of Cars by Brand',
        data: option.map(
          (brand) =>
            filteredCars.filter((car) => car.NameMMT.includes(brand)).length
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  // Prepare data for the Pie chart
  const pieData = {
    labels: option,
    datasets: [
      {
        label: 'Car Distribution by Brand',
        data: option.map(
          (brand) =>
            filteredCars.filter((car) => car.NameMMT.includes(brand)).length
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  }

  return (
    <div className='container'>
      <h1>Talad Rod</h1>
      <h2>Thailand's Number 1 Car Inverntory Website</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
        eligendi inventore odit illum, voluptatem harum aliquid nam corporis
        dolores, voluptatum iure magni sequi itaque aliquam quis numquam
        deserunt, officiis perspiciatis minima delectus iusto placeat sed.
        Beatae ut doloribus necessitatibus quisquam.
      </p>
      <h2>Car Inventory</h2>

      {!showDetail && (
        <div>
          <div className='charts'>
            {/* Bar Chart */}
            <div className='chart-container'>
              <h2>Bar Chart: Number of Cars by Brand</h2>
              <Bar style={{ width: '1200px' }} data={barData} />
            </div>

            {/* Pie Chart */}
            <div className='chart-container'>
              <h2>Pie Chart: Car Distribution by Brand</h2>
              <Pie style={{ width: '500px' }} data={pieData} />
            </div>
          </div>
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
