import React from 'react'
import AboutUs from '../Home page/AboutUs'
import HeroSection from '../About Page/HeroSection'
import OurEvents from './OurEvents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const index = () => {
  return (
    <>
    <div className='h-16'><Navbar /></div>
    <HeroSection/>
    <AboutUs/>
    <OurEvents/>
    <Footer/>
    </>
  )
}

export default index