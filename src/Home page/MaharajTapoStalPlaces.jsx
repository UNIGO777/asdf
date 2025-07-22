import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MaharajTapoStalPlaces = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5003/api/maharaj-tapostal-places')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching Maharaj Tapostal Places data:', error)
      setError(error.message)
      // Fallback to hardcoded data
      setData({
        sectionInfo: {
          title: "Maharaj Tapostal Places",
          subtitle: "Sacred places where Maharaj spent time in meditation and spiritual practices"
        },
        places: [
          {
            id: 1,
            title: "Narayan Sarovar",
            subtitle: "Sacred Place",
            description: "Narayan Sarovar is one of the most sacred places where Maharaj spent significant time in meditation and spiritual practices. The serene environment and divine atmosphere make it a perfect place for spiritual seekers.",
            image: "https://images.unsplash.com/photo-1743588239716-69ec9b088a68?q=80&w=3472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: "Gujarat, India"
          },
          {
            id: 2, 
            title: "Gadhada Temple",
            subtitle: "Historical Site",
            description: "The Gadhada Temple holds immense historical significance as it was one of Maharaj's favorite places for conducting spiritual discourses. The temple architecture and surroundings reflect the rich cultural heritage.",
            image: "https://images.unsplash.com/photo-1743588240036-6ce1b606f5ed?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: "Gadhada, Gujarat"
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="text-center mb-10">
              <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-2"></div>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-4">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && !data) {
    return (
      <section className="py-16 px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Content</h2>
          <p className="text-gray-600 mb-4">Unable to fetch the latest content. Please try again later.</p>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  const sectionTitle = data?.sectionInfo?.title || "Maharaj Tapostal Places"
  const places = data?.places || []

  return (
    <section className="py-16 px-4 relative z-10 bg-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 kalam-regular">{sectionTitle}</h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {places.map((place, index) => (
          <div key={place._id || place.id || index} className="flex-1">
            <div className="grid grid-cols-1 gap-8 items-center">
              {/* Image */}
              <motion.div
                className="overflow-hidden h-[400px] "
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">{place.subtitle}</h3>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 kalam-regular">{place.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {place.description}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{place.location}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MaharajTapoStalPlaces