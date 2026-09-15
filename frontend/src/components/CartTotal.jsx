import React, { useContext } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between py-2 border-b border-gray-100'>
          <p className='text-gray-600'>Subtotal</p>
          <p className='font-medium text-gray-800'>{currency}{subtotal}.00</p>
        </div>
        <div className='flex justify-between py-2 border-b border-gray-100'>
          <p className='text-gray-600'>Shipping Fee</p>
          <p className='font-medium text-gray-800'>{currency}{subtotal === 0 ? 0 : delivery_fee}.00</p>
        </div>
        <div className='flex justify-between py-2 font-semibold text-base text-gray-900'>
          <p>Total</p>
          <p>{currency}{total}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
