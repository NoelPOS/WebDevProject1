import React, { useState, useEffect, useContext } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import data from './taladrod-cars.min.json'
import Detail from './Detail'
import Home from './Home'
import Nav from './Nav'
import { CarContext } from './App'

function Dashboard() {
  const { highlightedCars, setHighlightedCars } = useContext(CarContext)
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

  // Compute car counts and values by brand and model
  const computeCarData = (cars) => {
    const brandData = {}
    const modelData = {}

    cars.forEach((car) => {
      const brand = car.NameMMT.split(' ')[0]
      const model = car.Model
      const price = parseFloat(car.Prc.replace(',', '')) // Remove commas and convert to number

      if (!brandData[brand]) {
        brandData[brand] = { count: 0, totalValue: 0 }
      }
      brandData[brand].count += 1
      brandData[brand].totalValue += price

      if (!modelData[model]) {
        modelData[model] = { count: 0, totalValue: 0 }
      }
      modelData[model].count += 1
      modelData[model].totalValue += price
    })

    return { brandData, modelData }
  }

  const { brandData, modelData } = computeCarData(filteredCars)

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Nav />
      <Home option={option} filteredCars={filteredCars} />

      {!showDetail && (
        <div>
          <div className='flex flex-wrap justify-between items-center mb-8 px-10'>
            {/* Brand Filter */}
            <div className='w-full md:w-1/2 lg:w-1/3'>
              <label
                htmlFor='brand'
                className='block text-gray-700 text-sm font-semibold mb-2'
              >
                Filter by Brand:
              </label>
              <select
                id='brand'
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value)
                }}
                className='block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
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
            <div className='w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0'>
              <label
                htmlFor='model'
                className='block text-gray-700 text-sm font-semibold mb-2'
              >
                Filter by Model:
              </label>
              <select
                id='model'
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value)
                }}
                disabled={!selectedBrand}
                className={`block w-full bg-white border border-gray-300 rounded-lg shadow-sm ${
                  !selectedBrand
                    ? 'opacity-50 cursor-not-allowed'
                    : 'focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                }`}
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

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10'>
            {filteredCars.map((car) => (
              <div
                key={car.Cid}
                className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'
              >
                <img
                  src={car.Img300}
                  alt={car.Model}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    Name: {car.NameMMT}
                  </h3>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Model: {car.Model}
                  </h3>
                  <h3 className='text-md text-gray-700 mb-2'>
                    Province: {car.Province}
                  </h3>
                  <p className='text-md text-gray-600 mb-2'>Year: {car.Yr}</p>
                  <p className='text-md text-gray-600 mb-2'>
                    Status: {car.Status}
                  </p>
                  <p className='text-md font-bold text-green-600 mb-4'>
                    Price: {car.Prc} Baht
                  </p>
                  <div className='flex items-center justify-between'>
                    <button
                      onClick={() => handleDetail(car.Cid)}
                      className='bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300'
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        setHighlightedCars([...highlightedCars, car])
                        localStorage.setItem(
                          'favorite',
                          JSON.stringify([...highlightedCars, car])
                        )
                      }}
                      className='bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition duration-300'
                    >
                      Favorite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Car Statistics Table */}
          <div className='px-10 mt-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Car Statistics
            </h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                <thead>
                  <tr className='text-left bg-gray-200'>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Brand
                    </th>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Number of Cars
                    </th>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Total Value (Baht)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Brands */}
                  {Object.entries(brandData).map(([brand, data]) => (
                    <tr key={brand}>
                      <td className='py-3 px-4 border-b'>{brand}</td>
                      <td className='py-3 px-4 border-b'>{data.count}</td>
                      <td className='py-3 px-4 border-b'>
                        {data.totalValue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                <thead>
                  <tr className='text-left bg-gray-200'>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Model
                    </th>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Number of Cars
                    </th>
                    <th className='py-3 px-4 border-b font-semibold text-gray-600'>
                      Total Value (Baht)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Models */}
                  {Object.entries(modelData).map(([model, data]) => (
                    <tr key={model}>
                      <td className='py-3 px-4 border-b'>{model}</td>
                      <td className='py-3 px-4 border-b'>{data.count}</td>
                      <td className='py-3 px-4 border-b'>
                        {data.totalValue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showDetail && (
        <Detail cars={cars} detailId={detailId} setShowDetail={setShowDetail} />
      )}
    </div>
  )
}

export default Dashboard
