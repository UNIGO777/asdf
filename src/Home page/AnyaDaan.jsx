import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ProgramCard = ({ program }) => {
  return (
    <motion.div 
      className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-orange-100 p-3 rounded-full mr-4">
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{program.title}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
          <span>{program.description}</span>
          <span className="mt-1 sm:mt-0 font-medium text-orange-600">{program.amount}</span>
        </div>
      </div>
    </motion.div>
  )
}

const AnyaDaan = () => {
  const [data, setData] = useState({
    sectionInfo: {
      subtitle: '',
      title: '',
      description: '',
      quote: '',
      image: '',
      buttonText: ''
    },
    programs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://narayan-website-backend.onrender.com/api/anya-daan');
        if (!response.ok) {
          throw new Error('Failed to fetch AnyaDaan data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching AnyaDaan data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading AnyaDaan section...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">Error loading AnyaDaan section: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            className="overflow-hidden h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={data.sectionInfo.image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop"} 
              alt="General Donations" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Right column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">
                {data.sectionInfo.subtitle || "SUPPORT OUR MISSION"}
              </h3>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 kalam-regular">
                {data.sectionInfo.title || "Anya Daan"}
              </h2>
              <p className="text-gray-600 mb-6">
                {data.sectionInfo.description || "Your generous donations help us maintain our temple, support community programs, and continue our spiritual and educational initiatives. Every contribution, regardless of size, makes a meaningful impact on our ability to serve the community."}
              </p>
              {data.sectionInfo.quote && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
                  <p className="text-orange-700 font-medium">"{data.sectionInfo.quote}"</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Donation Programs</h3>
              <div className="space-y-3">
                {data.programs.map((program, index) => (
                  <ProgramCard key={index} program={program} />
                ))}
              </div>
              <motion.button 
                className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.sectionInfo.buttonText || "Make a Donation"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnyaDaan