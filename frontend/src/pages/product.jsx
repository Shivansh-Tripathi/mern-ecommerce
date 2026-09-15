import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../contex/Shopcontex'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    if (products && products.length > 0) {
      const item = products.find((product) => product._id === productId)
      if (item) {
        setProductData(item)
        setImage(item.image[0])
        setSize('')
        window.scrollTo(0, 0)
      }
    }
  }, [productId, products])

  if (!productData) {
    return <div className='opacity-0'></div>
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Main Section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images Area */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnail Images */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded border-2 transition-all ${
                  image === item ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                }`}
                alt={`${productData.name} thumbnail ${index + 1}`}
              />
            ))}
          </div>

          {/* Large Main Display Image */}
          <div className='w-full sm:w-[80%]'>
            <img 
              className='w-full h-auto rounded-lg object-cover shadow-sm' 
              src={image} 
              alt={productData.name} 
            />
          </div>
        </div>

        {/* Product Information Details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 text-gray-800'>{productData.name}</h1>
          
          {/* Star Ratings */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Star" className='w-3.5' />
            <img src={assets.star_icon} alt="Star" className='w-3.5' />
            <img src={assets.star_icon} alt="Star" className='w-3.5' />
            <img src={assets.star_icon} alt="Star" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="Star" className='w-3.5' />
            <p className='pl-2 text-sm text-gray-500'>(122 reviews)</p>
          </div>

          {/* Price */}
          <p className='mt-5 text-3xl font-semibold text-gray-900'>
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className='mt-5 text-gray-600 md:w-4/5 leading-relaxed'>
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-sm font-semibold uppercase tracking-wider text-gray-700'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded bg-gray-100 font-medium transition-all ${
                    item === size ? 'border-black bg-black text-white' : 'hover:bg-gray-200 text-gray-800'
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3.5 text-sm font-medium active:bg-gray-700 hover:bg-gray-800 rounded transition-all tracking-wider uppercase'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5 border-gray-200' />

          {/* Guarantees / Features */}
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1.5'>
            <p className='flex items-center gap-2'>✓ 100% Original high-quality product.</p>
            <p className='flex items-center gap-2'>✓ Cash on delivery is available on this product.</p>
            <p className='flex items-center gap-2'>✓ Easy 7-day return and exchange policy.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Tabs Section */}
      <div className='mt-20'>
        <div className='flex'>
          <button className='border border-b-0 px-5 py-3 text-sm font-semibold text-gray-800 bg-white'>
            Description
          </button>
          <button className='border border-b-0 border-l-0 px-5 py-3 text-sm text-gray-500 bg-gray-50'>
            Reviews (122)
          </button>
        </div>
        <div className='flex flex-col gap-4 border p-6 text-sm text-gray-600 leading-relaxed bg-white rounded-b'>
          <p>
            Elevate your wardrobe with the {productData.name}. Designed with meticulous attention to detail, this piece seamlessly balances modern silhouette aesthetics with day-long comfort. Constructed from premium textiles engineered for breathability and longevity.
          </p>
          <p>
            Care instructions: Machine wash cold with similar colors. Do not bleach. Tumble dry low or hang dry in shade for optimal fiber longevity. Cool iron if needed.
          </p>
        </div>
      </div>

      {/* Related Products Component */}
      <RelatedProducts 
        category={productData.category} 
        subCategory={productData.subCategory} 
        currentProductId={productData._id} 
      />
    </div>
  )
}

export default Product
