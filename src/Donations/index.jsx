import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../About Page/HeroSection'
import Navbar from '../components/Navbar'
import AboutUs from '../Home page/AboutUs'
import OurGuruji from '../Home page/OurGuruji'
import SpritualGrowth from '../Home page/SpritualGrowth'
import Footer from '../components/Footer'
import RaktDaan from '../Home page/RaktDaan'
import RaktdanRegister from '../Home page/RaktdanRegister'
import SharmDaan from '../Home page/SharmDaan'
import SharmDaanRegister from '../Home page/SharmDaanRegister'
import AnyaDaan from '../Home page/AnyaDaan'
import AnyaDaanRegister from '../Home page/AnyaDaanRegister'
import TampleDevelopment from './TampleDevelopment'
import TempleContribute from './Contribute'

const Index = () => {
  const location = useLocation()

  useEffect(() => {
    // Handle hash navigation when component mounts
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <div className='bg-[#f2f0e9]'>
      <div className='h-16'><Navbar /></div>
      <section id="hero-section">
        <HeroSection />
      </section>
      {/* <section id="temple-development">
        <TampleDevelopment />
      </section>
      <section id="temple-contribute">
        <TempleContribute />
      </section> */}
      <section id="rakt-daan">
        <RaktDaan />
      </section>
      <section id="rakt-daan-register">
        <RaktdanRegister />
      </section>
      <section id="sharm-daan">
        <SharmDaan />
      </section>
      <section id="sharm-daan-register">
        <SharmDaanRegister />
      </section>
      <section id="anya-daan">
        <AnyaDaan />
      </section>
      <section id="anya-daan-register">
        <AnyaDaanRegister />
      </section>
      <Footer />
    </div>
  )
}

export default Index
