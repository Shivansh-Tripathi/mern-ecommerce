import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/newslterbox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      {/* Top Header */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Main About Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>
        <img
          className='w-full md:max-w-[450px] rounded-lg shadow-sm object-cover'
          src={assets.hero_img || assets.p_img1}
          alt="About Forever"
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed text-sm'>
          <p>
            Forever was born out of a passion for modern aesthetics and a desire to revolutionize the online shopping experience. Our journey began with a simple idea: to provide a contemporary platform where customers can easily discover, explore, and purchase top-tier fashion garments tailored for today's lifestyle.
          </p>
          <p>
            Since our inception, we have worked tirelessly to curate a diverse selection of high-quality clothing that caters to every taste and occasion. From casual daywear to tailored evening attire, our collection is meticulously designed and sourced from world-class artisan manufacturers.
          </p>
          <b className='text-gray-800 text-base'>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We are dedicated to delivering a frictionless shopping experience from browsing and ordering to lightning-fast delivery and hassle-free returns.
          </p>
        </div>
      </div>

      {/* Why Choose Us Header */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Why Choose Us Cards */}
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 rounded-lg hover:shadow-md transition-all duration-300 bg-white'>
          <b className='text-gray-800 text-base'>Quality Assurance:</b>
          <p className='text-gray-600 leading-relaxed'>
            We meticulously select and vet each product to guarantee it meets our rigorous standards for fabric softness, durability, and stitch precision.
          </p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 rounded-lg hover:shadow-md transition-all duration-300 bg-white'>
          <b className='text-gray-800 text-base'>Convenience:</b>
          <p className='text-gray-600 leading-relaxed'>
            With our streamlined interface and intuitive navigation, finding and securing your signature look has never been simpler or more seamless.
          </p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 rounded-lg hover:shadow-md transition-all duration-300 bg-white'>
          <b className='text-gray-800 text-base'>Exceptional Customer Service:</b>
          <p className='text-gray-600 leading-relaxed'>
            Our team of passionate fashion advisors and support specialists are always on standby to ensure your complete satisfaction at every step.
          </p>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  )
}

export default About
