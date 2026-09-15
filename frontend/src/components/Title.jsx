import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500 uppercase tracking-wider'>{text1} <span className='text-gray-700 font-semibold'>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1.5px] bg-gray-700'></p>
    </div>
  )
}

export default Title
