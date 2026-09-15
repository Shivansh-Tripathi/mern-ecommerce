import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../contex/Shopcontex'

const Naver = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, token, logout } = useContext(ShopContext)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Main Logo */}
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="logo" />
      </Link>
      
      {/* Navigation Links (Desktop) */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to="/collection" className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink> 
        <NavLink to="/about" className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink> 
        <NavLink to="/contact" className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right Side Icons & Profile Dropdown */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <Link to='/collection'>
          <img 
            onClick={() => setShowSearch(true)} 
            src={assets.search_icon} 
            className='w-5 cursor-pointer' 
            alt="search" 
          />
        </Link>
        
        {/* Profile Dropdown Group */}
        <div className='relative group'>
          <Link to={token ? '/orders' : '/login'}>
            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile" />
          </Link>
          
          {/* Dropdown Menu */}
          {token ? (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md text-sm'>
                <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          ) : (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md text-sm'>
                <Link to='/login' className='cursor-pointer hover:text-black'>Login / Register</Link>
              </div>
            </div>
          )}
        </div>

        {/* Cart Link */}
        <Link to='/cart' className='relative'>
           <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="cart" />
           <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
             {getCartCount()}
           </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setVisible(true)} 
          src={assets.menu_icon} 
          className='w-5 cursor-pointer sm:hidden' 
          alt="menu" 
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Naver
