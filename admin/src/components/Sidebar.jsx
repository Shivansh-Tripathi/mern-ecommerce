import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-100 bg-white pt-6 flex flex-col gap-2 text-[15px]'>
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 border-r-4 transition-all ${
            isActive
              ? 'bg-pink-50 border-pink-500 font-semibold text-black'
              : 'border-transparent text-gray-600 hover:bg-gray-50'
          }`
        }
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <p className='hidden md:block'>Add Items</p>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 border-r-4 transition-all ${
            isActive
              ? 'bg-pink-50 border-pink-500 font-semibold text-black'
              : 'border-transparent text-gray-600 hover:bg-gray-50'
          }`
        }
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <p className='hidden md:block'>List Items</p>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 border-r-4 transition-all ${
            isActive
              ? 'bg-pink-50 border-pink-500 font-semibold text-black'
              : 'border-transparent text-gray-600 hover:bg-gray-50'
          }`
        }
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z" />
        </svg>
        <p className='hidden md:block'>Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
