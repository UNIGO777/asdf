import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "नारायण गुरुकुल",
    subtitle: "श्री नारायण गुरुकुल में आपका स्वागत है",
    description: "हमारे पवित्र मंदिर में आध्यात्मिक यात्रा में हमारे साथ जुड़ें। यह स्थान आपकी आंतरिक शांति और आध्यात्मिक विकास के लिए समर्पित है।",
    videoUrl: null,
    videoType: "mp4",
    backgroundOverlay: 0.4,
    buttonText: "अधिक जानें",
    buttonLink: "#about"
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
          className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heroData.title}
        </motion.h1>
        
        <motion.p 
          className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.p 
          className="mt-3 max-w-md mx-auto text-sm text-gray-400 sm:text-base md:mt-5 md:text-lg md:max-w-3xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {heroData.description}
        </motion.p>
        
        <motion.div 
          className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {heroData.buttonText && (
            <div className="rounded-md shadow">
              <a href={heroData.buttonLink} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 kalam-regular">
                {heroData.buttonText}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Hero