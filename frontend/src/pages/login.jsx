import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../contex/Shopcontex'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken, backendUrl, getUserCart } = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password }

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        if (getUserCart) getUserCart(data.token)
        toast.success(currentState === 'Sign Up' ? 'Account created successfully!' : 'Logged in successfully!')
        navigate('/')
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Server connection failed')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black text-sm'
          placeholder='Full Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black text-sm'
        placeholder='Email address'
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black text-sm'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-gray-500 hover:text-black'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className='cursor-pointer text-gray-800 font-medium hover:underline'
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className='cursor-pointer text-gray-800 font-medium hover:underline'
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type='submit'
        className='bg-black text-white font-light px-8 py-2.5 mt-4 rounded uppercase tracking-wider text-sm hover:bg-gray-800 active:bg-gray-700 transition-all'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
