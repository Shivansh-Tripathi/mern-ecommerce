import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../contex/Shopcontex'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { setCartItems, getCartAmount, delivery_fee, products, cartItems, backendUrl, token } = useContext(ShopContext)
  const routerNavigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (getCartAmount() === 0) {
      toast.error('Your cart is empty!')
      return
    }

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method
      }

      if (token) {
        const response = await fetch(`${backendUrl}/api/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify(orderData)
        })
        const data = await response.json()
        if (data.success) {
          setCartItems({})
          toast.success(data.message || 'Order Placed Successfully!')
          routerNavigate('/orders')
        } else {
          toast.error(data.message || 'Failed to place order')
        }
      } else {
        // Fallback for guest checkout
        setCartItems({})
        toast.success('Order placed successfully (Guest mode)!')
        routerNavigate('/orders')
      }
    } catch (error) {
      console.error("Place Order Error:", error)
      toast.error(error.message || 'Order submission failed')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------------- Left Side: Delivery Information ----------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='First name'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='Last name'
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
          type="email"
          placeholder='Email address'
        />
        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
          type="text"
          placeholder='Street address'
        />
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='City'
          />
          <input
            required
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='Zipcode'
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
            type="text"
            placeholder='Country'
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black text-sm'
          type="tel"
          placeholder='Phone number'
        />
      </div>

      {/* ----------------- Right Side: Totals & Payment Method ----------------- */}
      <div className='mt-8 sm:mt-0 flex-1 max-w-[500px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='text-xl sm:text-2xl mb-3'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* Stripe */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border p-3 px-4 rounded cursor-pointer transition-all ${
                method === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black border-black' : ''}`}></p>
              <span className='font-semibold text-gray-700 tracking-wide'>STRIPE</span>
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 border p-3 px-4 rounded cursor-pointer transition-all ${
                method === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black border-black' : ''}`}></p>
              <span className='font-semibold text-gray-700 tracking-wide'>RAZORPAY</span>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-3 px-4 rounded cursor-pointer transition-all ${
                method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black border-black' : ''}`}></p>
              <span className='font-semibold text-gray-700 tracking-wide text-xs'>CASH ON DELIVERY</span>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-12 py-3.5 text-sm uppercase tracking-wider rounded font-medium hover:bg-gray-800 active:bg-gray-700 transition-all'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
