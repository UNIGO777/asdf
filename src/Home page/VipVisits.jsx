import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const VipVisits = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://narayan-website-backend.onrender.com/api/vip-visits')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching VIP Visits data:', error)
      setError(error.message)
      // Fallback to hardcoded data
      setData({
        sectionInfo: {
          subtitle: "DIVINE VISITS",
          title: "Distinguished Visitors",
          description: "Honoring the sacred presence of revered saints and spiritual leaders who have blessed our temple"
        },
        visits: [
          {
            id: 1,
            name: 'Pujya Swami Maharaj',
            date: 'January 15, 2023',
            description: 'Blessed our temple with divine presence and performed special puja ceremonies',
            image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop'
          },
          {
            id: 2,
            name: 'Sant Shri Morari Bapu',
            date: 'March 12, 2023', 
            description: 'Graced the temple with spiritual discourse and blessed all devotees',
            image: 'https://images.unsplash.com/photo-1604605801370-3396f9bd9ba0?q=80&w=2070&auto=format&fit=crop'
          },
          {
            id: 3,
            name: 'Pujya Ramesh Bhai Oza',
            date: 'September 5, 2023',
            description: 'Conducted special prayers and shared divine knowledge with devotees',
            image: 'https://images.unsplash.com/photo-1620503374956-c942862f0372?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#ebe5de]">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="text-center mb-12">
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white overflow-hidden">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && !data) {
    return (
      <section className="py-16 px-4 bg-[#ebe5de]">
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

  const sectionInfo = data?.sectionInfo || {}
  const visits = data?.visits || []

  return (
    <section className="py-16 px-4 bg-[#ebe5de]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">
            {sectionInfo.subtitle || "DIVINE VISITS"}
          </h3>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 kalam-regular">
            {sectionInfo.title || "Distinguished Visitors"}
          </h2>
          {sectionInfo.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {sectionInfo.description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visits.map((visit, index) => (
            <motion.div
              key={visit._id || visit.id || index}
              className="bg-white  overflow-hidden "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={visit.image}
                  alt={visit.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{visit.name}</h3>
                <p className="text-sm text-orange-600 mb-3">{visit.date}</p>
                <p className="text-gray-600">{visit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VipVisits


