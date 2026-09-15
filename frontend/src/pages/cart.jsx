import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <img src={assets.cart_icon} alt="Empty Cart" className='w-8 opacity-40' />
          </div>
          <p className='text-xl font-medium text-gray-700 mb-2'>Your shopping cart is empty</p>
          <p className='text-sm text-gray-500 mb-6 max-w-sm'>Explore our latest collection and find items that fit your style.</p>
          <Link
            to='/collection'
            className='bg-black text-white text-sm px-8 py-3 rounded uppercase tracking-wider font-medium hover:bg-gray-800 transition-all'
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null

              return (
                <div
                  key={index}
                  className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                >
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20 rounded object-cover' src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium text-gray-800'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='font-semibold text-gray-900'>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm font-medium rounded text-gray-600'>
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val === 0 || e.target.value === '') {
                        updateQuantity(item._id, item.size, 0)
                      } else {
                        updateQuantity(item._id, item.size, val)
                      }
                    }}
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center rounded text-sm focus:outline-none focus:ring-1 focus:ring-black'
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />

                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='w-4 mr-4 sm:w-5 cursor-pointer hover:opacity-60 transition-opacity'
                    src={assets.bin_icon}
                    alt="Remove item"
                  />
                </div>
              )
            })}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button
                  onClick={() => navigate('/placeorder')}
                  className='bg-black text-white text-sm my-8 px-8 py-3 rounded uppercase tracking-wider font-medium hover:bg-gray-800 transition-all active:bg-gray-700'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
