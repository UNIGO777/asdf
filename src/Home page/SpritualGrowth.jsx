import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SpritualGrowth = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: 'PARICHAY',
    description: '',
    shortDescription: '',
    images: {
      leftColumn: {
        image1: '',
        image2: ''
      },
      rightColumn: {
        mainImage: '',
        topImage: '',
        bottomImage: ''
      }
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://narayan-website-backend.onrender.com/api/spiritual-growth');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching spiritual growth data:', error);
      // Keep the default/mock data if API fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 relative z-10 bg-[#ebe5de]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </section>
    );
  }
    
  return (
    <section className="py-16 px-4 relative z-10 bg-[#ebe5de]">
      <div className="max-w-7xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Text content */}
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 kalam-regular">{data.title}</h2>
            <div className="text-gray-700 text-lg leading-relaxed mb-6">
              {!showFullText ? (
                <p style={{ whiteSpace: 'pre-line' }}>
                  {data.shortDescription}
                  <button 
                    onClick={() => setShowFullText(true)}
                    className="text-orange-500 font-medium hover:text-orange-600 ml-2 underline"
                  >
                    Read More
                  </button>
                </p>
              ) : (
                <p style={{ whiteSpace: 'pre-line' }}>
                  {data.description}
                  <button 
                    onClick={() => setShowFullText(false)}
                    className="text-orange-500 font-medium hover:text-orange-600 ml-2 underline"
                  >
                    Show Less
                  </button>
                </p>
              )}
            </div>
            
            {/* Bottom images for left column */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="overflow-hidden ">
                <img 
                  src={data.images.leftColumn.image1} 
                  alt="Spiritual Growth Image 1" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden ">
                <img 
                  src={data.images.leftColumn.image2} 
                  alt="Spiritual Growth Image 2" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Image grid */}
          <motion.div 
            className="grid grid-cols-2 grid-rows-2 gap-4 h-full min-h-[500px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main large image - spans 2 rows */}
            <motion.div 
              className="row-span-2 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <img 
                src={data.images.rightColumn.mainImage} 
                alt="Main Spiritual Image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            
            {/* Top right image */}
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <img 
                src={data.images.rightColumn.topImage} 
                alt="Top Spiritual Image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </motion.div>
            
            {/* Bottom right image */}
            <motion.div 
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <img 
                src={data.images.rightColumn.bottomImage} 
                alt="Bottom Spiritual Image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SpritualGrowth