import React, { useContext } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer block group'>
      <div className='overflow-hidden rounded-md bg-gray-100'>
        <img 
          className='hover:scale-105 transition ease-in-out duration-300 w-full aspect-[3/4] object-cover' 
          src={image[0]} 
          alt={name} 
        />
      </div>
      <p className='pt-3 pb-1 text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black'>{name}</p>
      <p className='text-sm font-bold text-gray-900'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
