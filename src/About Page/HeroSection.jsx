import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "हमारे बारे में",
    subtitle: "श्री सिद्ध नारायण टेकड़ी",
    description: "श्री सद्गुरु नारायण स्वामी दरबार के बारे में जानें। हमारे मंदिर का इतिहास, हमारे गुरुजी और हमारे मिशन के बारे में विस्तार से पढ़ें।",
    videoUrl: null,
    videoType: "mp4",
    backgroundOverlay: 0.4
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('https://narayan-website-backend.onrender.com/api/hero-section');
      const data = await response.json();
      
      if (data.success) {
        setHeroData(data.data);
      } else {
        console.error('Failed to fetch hero section data');
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[55vh] relative z-10 overflow-hidden flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

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
          <source src={heroData.videoUrl} type={`video/${heroData.videoType}`} />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay with opacity */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: heroData.backgroundOverlay }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heroData.title}
        </motion.h1>
        
        <motion.p 
          className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.p 
          className="mt-3 max-w-md mx-auto text-sm text-gray-400 sm:text-base md:mt-5 md:text-lg md:max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {heroData.description}
        </motion.p>
      </div>
    </div>
  )
}

export default Hero