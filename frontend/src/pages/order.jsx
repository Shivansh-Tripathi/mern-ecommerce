import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contex/Shopcontex'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

const Order = () => {
  const { products, currency, backendUrl, token } = useContext(ShopContext)
  const [orderList, setOrderList] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        if (products && products.length > 0) {
          const mockOrders = [
            {
              product: products[0],
              size: 'M',
              quantity: 1,
              status: 'Ready to ship',
              date: '12 Sep 2026',
              paymentMethod: 'COD'
            },
            {
              product: products[1] || products[0],
              size: 'L',
              quantity: 2,
              status: 'Order Placed',
              date: '14 Sep 2026',
              paymentMethod: 'Stripe'
            }
          ]
          setOrderList(mockOrders)
        }
        return
      }

      const response = await fetch(`${backendUrl}/api/order/userorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      })

      const data = await response.json()
      if (data.success && data.orders) {
        let allOrdersItem = []
        data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = new Date(order.date).toDateString()
            item['product'] = item
            allOrdersItem.push(item)
          })
        })
        setOrderList(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error("Load orders error:", error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token, products])

  return (
    <div className='border-t pt-16 min-h-[70vh]'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='mt-6'>
        {orderList.length === 0 ? (
          <p className='text-gray-500 py-10'>No orders found.</p>
        ) : (
          orderList.map((item, index) => (
            <div
              key={index}
              className='py-5 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 rounded object-cover' src={item.product.image[0]} alt={item.product.name} />
                <div>
                  <p className='sm:text-base font-medium text-gray-800'>{item.product.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='font-semibold text-gray-900'>{currency}{item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className='px-2 py-0.5 border bg-slate-50 text-xs rounded'>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    Date: <span className='text-gray-600 font-medium'>{item.date}</span> | Payment: <span className='text-gray-600 font-medium'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-amber-500'}`}></p>
                  <p className='text-sm md:text-base text-gray-700 font-medium'>{item.status}</p>
                </div>
                <button
                  onClick={() => alert(`Tracking package for: ${item.product.name}. Status: ${item.status}`)}
                  className='border border-gray-300 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 active:bg-gray-100 transition-all'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Order
