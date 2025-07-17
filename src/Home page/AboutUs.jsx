import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
// Keep fallback images for when backend images are not available
import godImage from '../assets/godimage.png'
import MandirInnerImage from '../assets/MandirInnerImage.jpeg'
import HanumanImage from '../assets/HanumanImage.png'

const ServiceItem = ({ service, index }) => {
  return (
    <motion.div
      className="flex items-start mb-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="text-2xl mr-4">{service.icon}</div>
      <div>
        <h4 className="text-lg font-semibold kalam-regular text-orange-800">{service.title}</h4>
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  )
}

const AboutUs = () => {
  const location = useLocation();
  const showLearnMore = location.pathname !== '/about';
  
  // State for about us data
  const [aboutData, setAboutData] = useState({
    title: "Invest in Your Well-Being and Spiritual Growth",
    subtitle: "Learn About Us", 
    description: "Loading...",
    services: [],
    images: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch about us data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://narayan-website-backend.onrender.com/api/about-us');
        const result = await response.json();
        
        if (result.success) {
          setAboutData(result.data);
        }
      } catch (error) {
        console.error('Error fetching about us data:', error);
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Function to get image URL with fallback
  const getImageUrl = (index, fallbackImage) => {
    if (aboutData.images && aboutData.images[index] && aboutData.images[index].url) {
      return aboutData.images[index].url;
    }
    return fallbackImage;
  };

  // Function to get image alt text with fallback
  const getImageAlt = (index, fallbackAlt) => {
    if (aboutData.images && aboutData.images[index] && aboutData.images[index].alt) {
      return aboutData.images[index].alt;
    }
    return fallbackAlt;
  };

  return (
    <section className="py-8 md:py-16 px-4 relative z-10 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left column - Image */}
          <motion.div 
            className="w-full lg:w-1/2 overflow-hidden flex flex-col md:flex-row gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full md:w-1/2">
              <img 
                className='w-full h-[550px] md:h-[500px] object-cover' 
                src={getImageUrl(0, godImage)} 
                alt={getImageAlt(0, "God")} 
              />
            </div>
            <div className='flex flex-col gap-4 w-full md:w-1/2'>
                <img 
                  className='h-[250px] w-full object-cover' 
                  src={getImageUrl(1, MandirInnerImage)} 
                  alt={getImageAlt(1, "Mandir Interior")} 
                />
                <div className="w-full h-[235px] overflow-hidden" style={{ borderRadius: "52% 48% 100% 0% / 100% 100% 0% 0% " }}>
                    <img 
                      className="w-full h-full object-cover" 
                      src={getImageUrl(2, HanumanImage)} 
                      alt={getImageAlt(2, "Hanuman")} 
                    />
                </div>
            </div>
          </motion.div>
          
          {/* Middle column - Text content */}
          <motion.div 
            className="w-full lg:w-1/2 text-left flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">{aboutData.subtitle}</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 kalam-regular">{aboutData.title}</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
                {loading ? 'Loading...' : aboutData.description}
            </p>
            {showLearnMore && (
              <Link to="/about">
              <motion.button
                className="bg-orange-500 text-white font-medium py-2 px-6 rounded-md w-fit"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#ea580c",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                Learn More
              </motion.button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs