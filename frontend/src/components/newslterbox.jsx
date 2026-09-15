import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className='text-center my-20'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Subscribe to our newsletter and stay updated with the latest trends and exclusive offers.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded overflow-hidden'>
        <input 
          className='w-full sm:flex-1 outline-none py-3' 
          type="email" 
          placeholder="Enter your email" 
          required 
        />
        <button 
          type="submit" 
          className='bg-black text-white text-xs px-10 py-4 uppercase hover:bg-gray-800 transition-colors'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
