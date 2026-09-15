import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../assets/assets'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message || 'Failed to fetch products')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error fetching products')
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message || 'Product Removed')
        await fetchList()
      } else {
        toast.error(response.data.message || 'Failed to remove product')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error removing product')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='flex flex-col gap-4 max-w-5xl pb-10'>
      <p className='font-bold text-xl text-gray-800 mb-2'>All Products List</p>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-bold text-gray-700 rounded-t-md'>
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className='text-center'>Action</span>
      </div>

      {/* Product Items */}
      {list.length === 0 ? (
        <div className='text-center py-10 border rounded bg-white text-gray-500'>
          No products found in the catalog.
        </div>
      ) : (
        list.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_1.5fr_1fr] items-center gap-2 py-3 px-4 border text-sm text-gray-700 bg-white hover:bg-gray-50 transition-all rounded-md'
          >
            <img
              className='w-12 h-12 object-cover rounded border'
              src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : item.image}
              alt={item.name}
            />
            <p className='font-medium text-gray-900 truncate'>{item.name}</p>
            <p className='hidden md:block text-gray-600'>{item.category}</p>
            <p className='font-semibold text-gray-900'>${item.price}</p>
            <div className='text-right md:text-center'>
              <button
                onClick={() => removeProduct(item._id)}
                className='text-red-500 hover:text-red-700 p-1 font-bold rounded transition-colors text-xs border border-red-200 hover:bg-red-50 px-2'
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default List
