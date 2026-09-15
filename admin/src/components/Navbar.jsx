import React from 'react'

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between py-3 px-[4%] border-b border-gray-200 bg-white shadow-sm sticky top-0 z-30'>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 bg-black text-white font-bold text-xl rounded-lg flex items-center justify-center shadow'>
          F
        </div>
        <div>
          <h2 className='font-bold text-lg text-gray-900 leading-tight'>FOREVER</h2>
          <p className='text-[10px] uppercase tracking-widest text-gray-400 font-semibold'>Admin Control Panel</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className='bg-gray-800 text-white text-xs px-5 py-2 sm:px-7 sm:py-2.5 rounded-full font-medium tracking-wide uppercase hover:bg-black transition-all shadow-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
