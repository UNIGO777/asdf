import React from 'react'
import { motion } from 'framer-motion'
import HeroVideo from '../assets/HeroVideo.mp4'

const Hero = () => {
  let video = HeroVideo
  return (
    <div className="h-[55vh] relative z-10 overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl kalam-regular"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Donations</span>
          <span className="block text-orange-400">श्री सिद्ध नारायण टेकड़ी</span>
        </motion.h1>
        
        <motion.p 
          className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          श्री सद्गुरु नारायण स्वामी दरबार
        </motion.p>
        
        
      </div>
    </div>
  )
}

export default Hero