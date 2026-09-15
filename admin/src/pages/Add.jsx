import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../assets/assets'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subcategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message || 'Product Added Successfully')
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message || 'Failed to add product')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'Error adding product')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5 text-gray-700 max-w-3xl pb-10'>
      <div>
        <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Upload Images</p>
        <div className='flex gap-3 flex-wrap'>
          {[
            { img: image1, setImg: setImage1, id: 'image1' },
            { img: image2, setImg: setImage2, id: 'image2' },
            { img: image3, setImg: setImage3, id: 'image3' },
            { img: image4, setImg: setImage4, id: 'image4' }
          ].map((item, index) => (
            <label key={index} htmlFor={item.id} className='cursor-pointer'>
              <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all overflow-hidden'>
                {item.img ? (
                  <img
                    className='w-full h-full object-cover'
                    src={URL.createObjectURL(item.img)}
                    alt={`Preview ${index + 1}`}
                  />
                ) : (
                  <div className='text-center p-2'>
                    <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className='text-[10px] text-gray-400 mt-1 block font-medium'>Upload</span>
                  </div>
                )}
              </div>
              <input
                onChange={(e) => item.setImg(e.target.files[0])}
                type="file"
                id={item.id}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-lg px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm'
          type="text"
          placeholder='Type product name here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-lg px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-black text-sm min-h-[100px]'
          placeholder='Write detailed description'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-4 w-full max-w-lg'>
        <div className='flex-1'>
          <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black bg-white'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black bg-white'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Dress">Dress</option>
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Price ($)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black'
            type="number"
            placeholder='25'
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2 font-semibold text-sm uppercase tracking-wide text-gray-800'>Available Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((item) => (
            <div
              key={item}
              onClick={() => toggleSize(item)}
              className={`px-4 py-2 border rounded cursor-pointer text-sm font-medium transition-all ${
                sizes.includes(item)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2 mt-2'>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className='w-4 h-4 accent-black cursor-pointer'
        />
        <label htmlFor="bestseller" className='cursor-pointer text-sm font-medium text-gray-700'>
          Add to Bestsellers
        </label>
      </div>

      <button
        type='submit'
        className='mt-4 bg-black text-white font-medium text-sm uppercase tracking-wider px-10 py-3 rounded hover:bg-gray-800 active:bg-gray-900 transition-all shadow'
      >
        ADD PRODUCT
      </button>
    </form>
  )
}

export default Add
