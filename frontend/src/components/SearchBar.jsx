import React, { useContext } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  // so that at only whne wea re at collectin hen it should diplay 
  const location = useLocation()
  const visible = location.pathname.includes('collection')

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center py-4'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='flex-1 outline-none bg-inherit text-sm' 
          type="text" 
          placeholder="Search products..." 
        />
        <img className='w-4' src={assets.search_icon} alt="Search" />
      </div>
      <img 
        onClick={() => setShowSearch(false)} 
        className='inline w-3 cursor-pointer ml-2 hover:opacity-75' 
        src={assets.cross_icon} 
        alt="Close" 
      />
    </div>
  ) : null
}

export default SearchBar
