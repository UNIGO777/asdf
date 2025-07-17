import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from '../components/Navbar'
import AboutUs from '../Home page/AboutUs'
import OurGuruji from '../Home page/OurGuruji'
import SpritualGrowth from '../Home page/SpritualGrowth'
import Footer from '../components/Footer'
import TampleHistory from './TampleHistory'
import { Element } from 'react-scroll'
import { useLocation } from 'react-router-dom'

const index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the # symbol
      const element = location.hash.substring(1);
      // Find the element and scroll to it
      const targetElement = document.getElementById(element);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <div className='h-16'><Navbar /></div>

      <Element name="hero" id="hero">
        <HeroSection/>
      </Element>

      <Element name="about" id="about">
        <AboutUs/>
      </Element>

      <Element name="history" id="history">
        <TampleHistory/>
      </Element>

      <Element name="spiritual" id="spiritual">
        <SpritualGrowth/>
      </Element>

      <Element name="guruji" id="guruji">
        <OurGuruji/>
      </Element>

      <Footer/>
    </>
  )
}

export default index