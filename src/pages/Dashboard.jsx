import React, { useState, useEffect, useContext } from 'react'
import data from '../data/taladrod-cars.json'
import Detail from '../components/Detail'
import Home from '../components/Home'
import Nav from '../components/Nav'
import CarTable from '../components/CarTable'
import { CarContext } from '../App'
import CarCards from '../components/CarCards'

// Compute car counts and values by brand and model
const computeCarData = (cars) => {
  const brandData = {}
  cars.forEach((car) => {
    const brand = car.NameMMT.split(' ')[0]
    const model = car.Model
    const price = parseFloat(car.Prc.replace(',', '').replace(',', '')) // Remove commas and convert to number

    if (!brandData[brand + ' ' + model]) {
      brandData[brand + ' ' + model] = { count: 0, totalValue: 0 }
    }
    brandData[brand + ' ' + model].count += 1
    brandData[brand + ' ' + model].totalValue += price
  })

  return brandData
}

function Dashboard() {
  const { highlightedCars, setHighlightedCars } = useContext(CarContext)
  const [cars, setCars] = useState(data.Cars)
  const [brandData, setBrandData] = useState(computeCarData(cars))
  const [filteredCars, setFilteredCars] = useState(data.Cars)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [option, setOption] = useState([])
  const [models, setModels] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [detailId, setDetailId] = useState('')

  // function for filtering cars by brand and model
  const handleFilter = (cars) => {
    let filtered = cars
    if (selectedBrand) {
      filtered = filtered.filter((car) => car.NameMMT.includes(selectedBrand))
    }
    if (selectedModel) {
      filtered = filtered.filter((car) => car.Model === selectedModel)
    }

    setFilteredCars(filtered)
  }

  // useEffect for getting total number of car brands and filter models by brand feature
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

  // useEffect for filtering cars by brand and model
  useEffect(() => {
    handleFilter(cars)
  }, [selectedBrand, selectedModel])

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Nav />
      <Home option={option} filteredCars={filteredCars} />
      <CarTable brandData={brandData} />

      {!showDetail && (
        <CarCards
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          models={models}
          filteredCars={filteredCars}
          option={option}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          setDetailId={setDetailId}
          setShowDetail={setShowDetail}
        />
      )}
      {showDetail && (
        <Detail cars={cars} detailId={detailId} setShowDetail={setShowDetail} />
      )}
    </div>
  )
}

export default Dashboard
