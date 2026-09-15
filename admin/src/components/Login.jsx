import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../assets/assets'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin/login`, { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success('Admin Login Successful!')
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'Server connection error')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-md w-full border border-gray-100'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Admin Panel</h1>
          <p className='text-gray-500 text-sm mt-1'>Sign in with your administrator credentials</p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          <div>
            <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black text-sm transition-all'
              type="email"
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black text-sm transition-all'
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-black text-white py-3 rounded-lg font-medium text-sm tracking-wider uppercase hover:bg-gray-800 active:bg-gray-900 transition-all shadow-md mt-2'
          >
            Login to Dashboard
          </button>
        </form>

        <div className='mt-6 pt-4 border-t text-center text-xs text-gray-400'>
          Forever E-Commerce Administration System
        </div>
      </div>
    </div>
  )
}

export default Login
