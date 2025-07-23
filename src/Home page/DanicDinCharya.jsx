import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSunrise, FiSun, FiSunset, FiMoon, FiCalendar } from 'react-icons/fi';

const DanicDinCharya = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    title: 'दैनिक दिनचर्या',
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
    },
    routineSchedule: [
      {
        timePeriod: 'प्रातः काल (सुबह)',
        activities: []
      },
      {
        timePeriod: 'मध्याह्न (दोपहर)',
        activities: []
      },
      {
        timePeriod: 'संध्या काल (शाम)',
        activities: []
      },
      {
        timePeriod: 'रात्रि (रात)',
        activities: []
      },
      {
        timePeriod: 'साप्ताहिक अभ्यास',
        activities: []
      }
    ]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/danic-din-charya');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching danic din charya data:', error);
      // Keep the default/mock data if API fails
    } finally {
      setLoading(false);
    }
  };

  // Icon mapping for different time periods
  const getTimeIcon = (timePeriod) => {
    if (timePeriod.includes('प्रातः') || timePeriod.includes('सुबह'))
      return <FiSunrise className="w-6 h-6 text-amber-500" />;
    else if (timePeriod.includes('मध्याह्न') || timePeriod.includes('दोपहर'))
      return <FiSun className="w-6 h-6 text-yellow-500" />;
    else if (timePeriod.includes('संध्या') || timePeriod.includes('शाम'))
      return <FiSunset className="w-6 h-6 text-orange-500" />;
    else if (timePeriod.includes('रात्रि') || timePeriod.includes('रात'))
      return <FiMoon className="w-6 h-6 text-indigo-500" />;
    else
      return <FiCalendar className="w-6 h-6 text-green-500" />;
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
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={data.images.leftColumn.image1} 
                  alt="Daily Routine Image 1" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={data.images.leftColumn.image2} 
                  alt="Daily Routine Image 2" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>

            {/* Daily Routine Schedule Tabs */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 pb-1">
                {data.routineSchedule.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center space-x-2 px-4 py-2 whitespace-nowrap rounded-full transition-colors ${
                      activeTab === index 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {getTimeIcon(item.timePeriod)}
                    <span>{item.timePeriod}</span>
                  </button>
                ))}
              </div>

              {/* Activities List */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                  {getTimeIcon(data.routineSchedule[activeTab]?.timePeriod || '')}
                  <span className="ml-2">{data.routineSchedule[activeTab]?.timePeriod}</span>
                </h3>
                <ul className="space-y-2">
                  {data.routineSchedule[activeTab]?.activities.map((activity, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{activity}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Image grid */}
          <motion.div 
            className=" grid-cols-2 hidden md:grid grid-rows-2 gap-4 h-full min-h-[500px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main large image - spans 2 rows */}
            <motion.div 
              className="row-span-2 overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <img 
                src={data.images.rightColumn.mainImage} 
                alt="Main Daily Routine Image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            
            {/* Top right image */}
            <motion.div 
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <img 
                src={data.images.rightColumn.topImage} 
                alt="Top Daily Routine Image" 
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
                alt="Bottom Daily Routine Image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DanicDinCharya; 