import React from 'react'

function Detail({ cars, detailId, setShowDetail }) {
  const car = cars.find((car) => car.Cid === detailId)

  if (!car) {
    return <h2 className="text-xl font-semibold text-red-600 text-center">Car not found</h2>
  }

  return (
    <div className="detail-container max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <button
        className="text-blue-600 font-semibold mb-4 hover:text-blue-800 transition-colors"
        onClick={() => setShowDetail(false)}
      >
        &larr; Back
      </button>
      <img
        src={car.Img300}
        alt={car.Model}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Name: {car.NameMMT}</h3>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Model: {car.Model}</h3>
      <h3 className="text-lg font-medium text-gray-500 mb-4">Province: {car.Province}</h3>
      <p className="text-gray-700 mb-2">Year: {car.Yr}</p>
      <p className="text-gray-700 mb-2">Status: {car.Status}</p>
      <p className="text-xl font-semibold text-gray-900">Price: {car.Prc}</p>
    </div>
  )
}

export default Detail
