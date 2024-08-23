import React, { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import data from '../data/taladrod-cars.min.json'

const Home = ({ option, filteredCars }) => {
  const [cars, setCars] = useState(data.Cars)
  // Prepare data for the Bar chart
  // const barData = {
  //   labels: option,
  //   datasets: [
  //     {
  //       label: 'Number of Cars by Brand',
  //       data: option.map(
  //         (brand) => cars.filter((car) => car.NameMMT.includes(brand)).length
  //       ),
  //       backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //     },
  //   ],
  // }

  // Prepare data for the Stacked Bar chart
  const barData = {
    labels: option,
    datasets: option
      .map((brand) => {
        const brandCars = cars.filter((car) => car.NameMMT.includes(brand))
        const models = [...new Set(brandCars.map((car) => car.Model))]

        return models.map((model, index) => ({
          label: `${brand} - ${model}`,
          data: option.map((currentBrand) =>
            currentBrand === brand
              ? brandCars.filter((car) => car.Model === model).length
              : 0
          ),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.6)`,
        }))
      })
      .flat(),
  }

  // Chart options to disable the legend
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  // Prepare data for the Pie chart
  const pieData = {
    labels: option,
    datasets: [
      {
        label: 'Car Distribution by Brand',
        data: option.map(
          (brand) => cars.filter((car) => car.NameMMT.includes(brand)).length
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
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center'>
          <div className='relative h-64 overflow-hidden rounded-lg sm:h-full lg:order-last lg:h-full'>
            {/* <img
              alt=''
              src='https://www.taladrod.com/w40/img/logo.svg'
              className='absolute inset-0 h-[60%] w-full object-cover'
            /> */}
            {/* Bar Chart */}
            <div className='chart-container'>
              <h2>Bar Chart: Number of Cars by Brand</h2>
              <Bar data={barData} options={chartOptions} />
            </div>

            {/* Pie Chart */}
            <div className='chart-container'>
              <Pie data={pieData} />
            </div>
          </div>

          <div className='lg:py-24'>
            <h2 className='text-3xl font-bold sm:text-4xl'>Talarod</h2>
            <h3 className='text-2xl font-bold sm:text-2xl mt-2'>
              Thailand's Number 1 Car Platform
            </h3>

            <p className='mt-4 text-gray-600'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
              hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam
              repellat.
            </p>

            <a
              href='#'
              className='mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400'
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
