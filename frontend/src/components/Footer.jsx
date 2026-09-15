import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left Column */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-relaxed'>
            Forever is your destination for modern fashion, curated quality apparel, and seamless shopping experiences. Crafted with care for contemporary styles.
          </p>
        </div>

        {/* Center Column */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800 uppercase tracking-wider'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to='/' className='hover:text-black transition-colors'>Home</Link></li>
            <li><Link to='/about' className='hover:text-black transition-colors'>About us</Link></li>
            <li><Link to='/collection' className='hover:text-black transition-colors'>Delivery</Link></li>
            <li><Link to='/about' className='hover:text-black transition-colors'>Privacy policy</Link></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800 uppercase tracking-wider'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-black cursor-pointer'>+1-212-456-7890</li>
            <li className='hover:text-black cursor-pointer'>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div>
        <hr className='border-gray-200' />
        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright 2026 @ forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
