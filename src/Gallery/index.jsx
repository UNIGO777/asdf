import React from 'react'
import HeroSection from './HeroSection'
import OurGallery from './OurGallery.jsx'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Gallery = () => {
  return (
    <div className="min-h-screen bg-[#f2f0e9] relative">
      <div className='h-20'><Navbar /></div>
      <HeroSection />
      <OurGallery />
      <Footer />
    </div>
  )
}

export default Gallery 