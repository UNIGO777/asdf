import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EventCard = ({ event }) => {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{event.title}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
          <span>{event.date} • {event.time}</span>
          <span className="mt-1 sm:mt-0">{event.location}</span>
        </div>
      </div>
    </motion.div>
  )
}

const RaktDaan = () => {
  const [raktDaanData, setRaktDaanData] = useState({
    title: '',
    subtitle: '',
    description: '',
    quote: '',
    image: '',
    upcomingEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRaktDaanData();
  }, []);

  const fetchRaktDaanData = async () => {
    try {
      const response = await fetch('https://narayan-website-backend.onrender.com/api/rakt-daan');
      const data = await response.json();
      
      if (data.success) {
        setRaktDaanData(data.data);
      } else {
        console.error('Failed to fetch Rakt Daan data');
      }
    } catch (error) {
      console.error('Error fetching Rakt Daan data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
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
            className=" overflow-hidden h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={raktDaanData.image} 
              alt="Blood Donation Drive" 
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
              <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">{raktDaanData.subtitle}</h3>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 kalam-regular">{raktDaanData.title}</h2>
              <p className="text-gray-600 mb-6">
                {raktDaanData.description}
              </p>
              {raktDaanData.quote && (
                <div className="bg-orange-50 border-l-4 border-red-500 p-4 mb-8">
                  <p className="text-orange-700 font-medium">"{raktDaanData.quote}"</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Blood Donation Events</h3>
              <div className="space-y-3">
                {raktDaanData.upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <motion.button 
                className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register as Donor
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RaktDaan