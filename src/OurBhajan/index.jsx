import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from './HeroSection'
import BhajanCollection from './BhajanCollection'
import YoutubeChannel from './YoutubeChannel'

const OurBhajan = () => {
  return (
    <div className="min-h-screen bg-[#f2f0e9] relative">
      <div className='h-20'><Navbar /></div>
      <HeroSection />
      <BhajanCollection />
      <YoutubeChannel />
    
    </div>
  )
}

export default OurBhajan 