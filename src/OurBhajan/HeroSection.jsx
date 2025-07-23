import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Heart, Play, Download, Clock, Users, Star, Volume2 } from 'lucide-react'

// Icon mapping object
const iconMap = {
  Music,
  Heart,
  Play,
  Download,
  Clock,
  Users,
  Star,
  Volume2
}

const HeroSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://narayan-website-backend.onrender.com/api/bhajan-hero')
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch bhajan hero data:', result.message)
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching bhajan hero data:', error)
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    title: "Our Sacred Bhajans",
    subtitle: "Divine Melodies for Spiritual Awakening",
    description: "Immerse yourself in the divine atmosphere through our collection of sacred bhajans. Each melody carries the essence of devotion and connects your soul to the divine consciousness.",
    backgroundImage: "/src/assets/MandirInnerImage.jpeg",
    stats: {
      totalBhajans: 45,
      totalListeners: 12500,
      averageRating: 4.8
    },
    features: [
      {
        icon: Music,
        title: "Traditional Bhajans",
        description: "Authentic devotional songs"
      },
      {
        icon: Heart,
        title: "Soul Connection",
        description: "Connect with divine consciousness"
      },
      {
        icon: Play,
        title: "High Quality Audio",
        description: "Crystal clear recordings"
      },
      {
        icon: Download,
        title: "Free Downloads",
        description: "Download for offline listening"
      }
    ]
  })

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden">
        <div className="animate-pulse">
          <div className="absolute inset-0 bg-gray-300"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="h-16 bg-gray-200 rounded w-96 mx-auto"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen py-12 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-orange-800/70 to-red-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 kalam-regular">
              {data.title}
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-orange-200">
              {data.subtitle}
            </p>
            <div className="w-32 h-1 bg-orange-400 mx-auto rounded-full mb-8"></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-orange-100">
              {data.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-300 mb-2">
                {data.stats.totalBhajans}+
              </div>
              <div className="text-white text-lg">Sacred Bhajans</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-300 mb-2">
                {data.stats.totalListeners.toLocaleString()}+
              </div>
              <div className="text-white text-lg">Devoted Listeners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-300 mb-2">
                {data.stats.averageRating}/5
              </div>
              <div className="text-white text-lg">Average Rating</div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {data.features.map((feature, index) => {
              const IconComponent = iconMap[feature.iconName] || Music
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="text-orange-300 mx-auto mb-3" size={32} />
                  <h3 className="text-white font-semibold mb-2 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-orange-200 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          
        </div>
      </div>

      {/* Decorative Elements */}
      
    </section>
  )
}

export default HeroSection 