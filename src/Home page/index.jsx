import React from 'react'
import Hero from './hero'
import Featuring from './Featuring'
import AboutUs from './AboutUs'
import SpritualGrowth from './SpritualGrowth'
import OurGuruji from './OurGuruji'
import RaktDaan from './RaktDaan'
import RaktdanRegister from './RaktdanRegister'
import SharmDaan from './SharmDaan'
import SharmDaanRegister from './SharmDaanRegister'
import AnyaDaan from './AnyaDaan'
import AnyaDaanRegister from './AnyaDaanRegister'
import Navbar from '../components/Navbar'
import TamplePng from '../assets/TamplePng.png'
import { FolderOpenIcon } from 'lucide-react'
import Footer from '../components/Footer'


const index = () => {
    return (
    <div className="min-h-screen bg-[#f2f0e9] relative">
      <div className='h-16'><Navbar /></div>
     
      <Hero />
      <Featuring />
      <AboutUs />
      <SpritualGrowth />
      <OurGuruji />
      <RaktDaan />
      <RaktdanRegister />
      <SharmDaan />
      <SharmDaanRegister />
      <AnyaDaan />
      <AnyaDaanRegister />
      <Footer/>      
      {/* Background temple image moved to bottom layer */}
      <div className='absolute z-[0] -top-36 h-[45vh] w-screen flex justify-center'>
        <img src={TamplePng} className='opacity-20' alt="Temple background" />
      </div>
    </div>
  )
}

export default index