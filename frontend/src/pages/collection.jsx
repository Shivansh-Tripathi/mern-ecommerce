import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value))
    } else {
      setCategory((prev) => [...prev, value])
    }
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value))
    } else {
      setSubCategory((prev) => [...prev, value])
    }
  }

  const filterProducts = useMemo(() => {
    let list = products ? [...products] : []

    if (showSearch && search) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      list = list.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      list = list.filter((item) => subCategory.includes(item.subCategory || item.subcategory))
    }

    if (sortType === 'low-high') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [products, search, showSearch, category, subCategory, sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options (Sidebar) */}
      <div className='min-w-60'>
        <p 
          onClick={() => setShowFilter(!showFilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2 select-none uppercase font-medium tracking-wide'
        >
          FILTERS
          <img 
            className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} 
            src={assets.dropdown_icon} 
            alt="Toggle Filters" 
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block rounded-sm`}>
          <p className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-800'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Men'} onChange={toggleCategory} />
              Men
            </label>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Women'} onChange={toggleCategory} />
              Women
            </label>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Kids'} onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block rounded-sm`}>
          <p className='mb-3 text-sm font-semibold uppercase tracking-wider text-gray-800'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
              Topwear
            </label>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
              Bottomwear
            </label>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
              Winterwear
            </label>
            <label className='flex gap-2 items-center cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" value={'Dress'} onChange={toggleSubCategory} />
              Dress
            </label>
          </div>
        </div>
      </div>

      {/* Right Side (Products Header & Grid) */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          {/* Product Sort Dropdown */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border-2 border-gray-300 text-sm px-2 py-2 rounded outline-none cursor-pointer bg-white'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {filterProducts.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem 
                key={item._id || index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image} 
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 text-gray-500 text-base'>
            No products found matching your selected filters.
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
