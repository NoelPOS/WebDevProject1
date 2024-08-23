import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='bg-blue-600 p-4 shadow-md sticky top-0 z-50'>
      <div className='flex items-center justify-between px-5'>
        <Link to='/' className=''>
          <img
            src='https://www.taladrod.com/w40/img/logo.svg'
            className='w-[50%]'
          />
        </Link>

        <ul className='flex items-center space-x-10 justify-center'>
          <li>
            <Link
              to='/WebDevProject1/'
              className='text-white text-lg font-semibold hover:text-blue-200 transition duration-300'
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/WebDevProject1/highlighted'
              className='text-white text-lg font-semibold hover:text-blue-200 transition duration-300'
            >
              Highlighted
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
