import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/newslterbox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      {/* Page Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Main Contact Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img
          className='w-full md:max-w-[480px] rounded-lg shadow-sm object-cover'
          src={assets.p_img8 || assets.hero_img}
          alt="Contact Forever Studio"
        />

        <div className='flex flex-col justify-center items-start gap-6 text-gray-600 text-sm'>
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>
          <p className='leading-relaxed text-gray-500'>
            54709 Willms Station, Suite 350 <br />
            Washington, USA
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>

          <p className='font-semibold text-xl text-gray-700 mt-4'>Careers at Forever</p>
          <p className='text-gray-500 leading-relaxed max-w-md'>
            Learn more about our dynamic teams, creative opportunities, and current job openings across design and engineering.
          </p>

          <button
            onClick={() => alert('Applications currently open! Send your resume to careers@forever.com')}
            className='border border-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-all duration-500 rounded'
          >
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  )
}

export default Contact
