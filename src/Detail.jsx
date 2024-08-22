import React from 'react'

function Detail({ cars, detailId, setShowDetail }) {
  const car = cars.find((car) => car.Cid === detailId)

  if (!car) {
    return <h2>Car not found</h2>
  }

  return (
    <div className='detail-container'>
      <button className='back-button' onClick={() => setShowDetail(false)}>
        Back
      </button>
      <img src={car.Img300} alt={car.Model} />
      <h3>Name: {car.NameMMT}</h3>
      <h3>Model: {car.Model}</h3>
      <h3>Province: {car.Province}</h3>
      <p>Year: {car.Yr}</p>
      <p>Status: {car.Status}</p>
      <p>Price: {car.Prc}</p>
    </div>
  )
}

export default Detail
