import React from 'react'
import Hero from '../components/Hero'
import Latestcomponent from '../components/Latestcomponent'
import BestSeller from '../components/BestSeller'
import OUrpolicy from '../components/OUrpolicy'
import NewsletterBox from '../components/newslterbox'

const Home = () => {
  return (
    <div>
      <Hero />
      <Latestcomponent />
      <BestSeller />
      <OUrpolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
