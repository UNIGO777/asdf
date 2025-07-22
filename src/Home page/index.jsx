import React from 'react'
import Hero from './Hero'
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
import HindiBarkha from './HindiBarkha'
import MaharajTapoStalPlaces from './MaharajTapoStalPlaces'
import VipVisits from './VipVisits'

const index = () => {
    return (
    <div className="min-h-screen bg-[#f2f0e9] relative">
      <div className='h-20'><Navbar /></div>
     
      <HindiBarkha />
      <Hero />
      <Featuring />
      <AboutUs />
      <SpritualGrowth />
      <OurGuruji />
      <MaharajTapoStalPlaces/>
      <VipVisits/>
      <RaktDaan />
      <RaktdanRegister />
      <SharmDaan />
      <SharmDaanRegister />
      <AnyaDaan />
      <AnyaDaanRegister />
      <Footer/>      
      {/* Background temple image moved to bottom layer */}
      
    </div>
  )
}

export default index