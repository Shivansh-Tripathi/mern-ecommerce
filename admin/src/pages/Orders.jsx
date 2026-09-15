import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../assets/assets'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message || 'Failed to fetch orders')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error loading orders')
    }
  }

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message || 'Order status updated')
        await fetchAllOrders()
      } else {
        toast.error(response.data.message || 'Failed to update status')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error updating status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='flex flex-col gap-4 max-w-5xl pb-10'>
      <p className='font-bold text-xl text-gray-800 mb-2'>Order Management</p>

      {orders.length === 0 ? (
        <div className='text-center py-10 border rounded bg-white text-gray-500'>
          No customer orders found.
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 p-5 md:p-6 my-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:shadow transition-shadow'
          >
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-bold text-lg'>
              📦
            </div>

            <div>
              <div className='mb-3'>
                {order.items.map((item, idx) => (
                  <p className='py-0.5 font-medium text-gray-800' key={idx}>
                    {item.name} x {item.quantity} <span className='text-gray-500 font-normal'>({item.size})</span>
                    {idx !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>

              <p className='mt-3 font-semibold text-gray-900'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className='text-gray-600 space-y-0.5 mt-1'>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                <p className='font-medium text-gray-700'>📞 {order.address.phone}</p>
              </div>
            </div>

            <div>
              <p className='text-sm font-semibold text-gray-800 mb-1'>Items: {order.items.length}</p>
              <p className='text-gray-600'>Method: <span className='font-medium uppercase text-gray-800'>{order.paymentMethod}</span></p>
              <p className='text-gray-600'>Payment: <span className={`font-semibold ${order.payment ? 'text-green-600' : 'text-amber-600'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
              <p className='text-gray-600 mt-1'>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className='font-bold text-base text-gray-900'>
              ${order.amount}
            </div>

            <div>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className='p-2 font-semibold border rounded bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-black cursor-pointer w-full'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
