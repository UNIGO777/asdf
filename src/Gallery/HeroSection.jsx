import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCamera } from 'react-icons/fa'

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    title: 'हमारी तस्वीरों का संग्रह',
    subtitle: 'गतिविधियों और समारोहों की खूबसूरत यादें',
    description: 'इन तस्वीरों के माध्यम से हमारे आश्रम के विविध पहलुओं, समारोहों और भक्तों की गतिविधियों की झलक देखें।',
    backgroundImage: '/src/assets/MandirInnerImage.jpeg' // Using local image path instead of unsplash URL
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/gallery/hero');
        const data = await response.json();
        if (data && data.backgroundImage) {
          // Ensure the background image URL is valid before setting
          const img = new Image();
          img.src = data.backgroundImage;
          img.onload = () => {
            setHeroData(data);
            setLoading(false);
          };
          img.onerror = () => {
            console.error('Error loading background image, falling back to default');
            setLoading(false);
          };
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching gallery hero data:', error);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-gray-200">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${heroData.backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <FaCamera className="w-8 h-8 text-white" />
          </div>
        </div>
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4 kalam-regular"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroData.title}
        </motion.h1>
        <motion.h2 
          className="text-xl md:text-2xl text-orange-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroData.subtitle}
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-100 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {heroData.description}
        </motion.p>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#f2f0e9" 
            fillOpacity="1" 
            d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,208C672,203,768,149,864,133.3C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default HeroSection 