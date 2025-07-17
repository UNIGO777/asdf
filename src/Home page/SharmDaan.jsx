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

const SharmDaan = () => {
  const [data, setData] = useState({
    sectionInfo: {
      subtitle: '',
      title: '',
      description: '',
      quote: '',
      image: '',
      buttonText: ''
    },
    events: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://narayan-website-backend.onrender.com/api/sharm-daan');
        if (!response.ok) {
          throw new Error('Failed to fetch SharmDaan data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching SharmDaan data:', error);
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
            <div className="text-lg text-gray-600">Loading SharmDaan section...</div>
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
            <div className="text-lg text-red-600">Error loading SharmDaan section: {error}</div>
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
              alt="Charity Donation Drive" 
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
                {data.sectionInfo.subtitle || "GIVE GENEROUSLY"}
              </h3>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 kalam-regular">
                {data.sectionInfo.title || "Sharm Daan"}
              </h2>
              <p className="text-gray-600 mb-6">
                {data.sectionInfo.description || "Join our mission to help those in need through donations of clothing, supplies, and essentials. Our temple organizes regular charity drives in partnership with local organizations. Your contributions can make a significant difference in someone's life."}
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
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Upcoming Charity Events</h3>
              <div className="space-y-3">
                {data.events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
              <motion.button 
                className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.sectionInfo.buttonText || "Donate Now"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SharmDaan