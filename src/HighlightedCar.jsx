import React, { useState, useEffect, useContext } from 'react'
import Nav from './Nav'
import { CarContext } from './App'

const HighlightedCars = () => {
  const { highlightedCars, setHighlightedCars } = useContext(CarContext)

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('favorite')) || []
    setHighlightedCars(savedCars)
  }, [setHighlightedCars])

  const removeCarFromHighlight = (car) => {
    const updatedCars = highlightedCars.filter((c) => c.Cid !== car.Cid)
    setHighlightedCars(updatedCars)
    localStorage.setItem('favorite', JSON.stringify(updatedCars))
  }

  return (
    <div className='min-h-screen bg-gray-100 '>
      <Nav />
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
        Highlighted Cars
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12'>
        {highlightedCars.map((car) => (
          <div
            key={car.Cid}
            className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'
          >
            <img
              src={car.Img300}
              alt={car.Model}
              className='w-full h-48 object-cover'
            />
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Name: {car.NameMMT}
              </h3>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Model: {car.Model}
              </h3>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Province: {car.Province}
              </h3>
              <p className='text-gray-600 mb-2'>Year: {car.Yr}</p>
              <p className='text-gray-600 mb-2'>Status: {car.Status}</p>
              <p className='text-gray-800 font-bold mb-4'>
                Price: {car.Prc} Baht
              </p>
              <button
                className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300'
                onClick={() => removeCarFromHighlight(car)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HighlightedCars
