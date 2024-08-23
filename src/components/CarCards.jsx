import React from 'react'
import { useContext } from 'react'
import { CarContext } from '../App'

const CarCards = ({
  selectedBrand,
  setSelectedBrand,
  models,
  filteredCars,
  option,
  selectedModel,
  setDetailId,
  setShowDetail,
}) => {
  const { highlightedCars, setHighlightedCars } = useContext(CarContext)
  // function for toggling the show detail component
  const handleDetail = (id) => {
    setDetailId(id)
    setShowDetail(true)
  }

  return (
    <div>
      <hr className='mt-10 ' />
      <h1 className='text-4xl text-center font-bold my-5 text-orange-500'>
        Car Cards
      </h1>
      <div className='flex flex-wrap justify-between items-center mb-8 px-10'>
        {/* Brand Filter */}
        <div className='w-full md:w-1/2 lg:w-1/3'>
          <label
            htmlFor='brand'
            className='block text-gray-700 text-xl font-bold mb-2'
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
            className='block text-gray-700 text-xl font-bold mb-2'
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

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-5'>
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
              <p className='text-md text-gray-600 mb-2'>Status: {car.Status}</p>
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
                    if (highlightedCars.some((c) => c.Cid === car.Cid)) {
                      return alert('Car already added to favorites!')
                    } else {
                      setHighlightedCars([...highlightedCars, car])
                      localStorage.setItem(
                        'favorite',
                        JSON.stringify([...highlightedCars, car])
                      )
                      alert('Car added to favorites!')
                    }
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
    </div>
  )
}

export default CarCards
