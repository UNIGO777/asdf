import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Youtube,
  Play,
  ExternalLink,
  Users,
  Video,
  Eye,
  ThumbsUp,
  Bell,
  Calendar,
  Clock
} from 'lucide-react'

const YoutubeChannel = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bhajan-youtube-channel')
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch YouTube channel data:', result.message)
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching YouTube channel data:', error)
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    sectionInfo: {
      title: "Our Bhajan YouTube Channel",
      subtitle: "Subscribe for Divine Musical Journey",
      description: "Join our YouTube channel to experience live bhajan sessions, traditional performances, and spiritual discussions. Get notified about new uploads and special events."
    },
    channel: {
      name: "Narayan Gurukul Bhajans",
      description: "Official YouTube channel for sacred bhajans and spiritual music from Narayan Gurukul. Experience divine melodies and traditional devotional songs.",
      channelUrl: "https://youtube.com/@narayangurukulbhajans",
      channelId: "UCExample123",
      channelImage: "/src/assets/logo.png",
      bannerImage: "/src/assets/MandirInnerImage.jpeg",
      subscribers: 45600,
      totalViews: 2840000,
      totalVideos: 127,
      isActive: true
    },
    featuredVideos: [
      {
        id: 1,
        title: "Om Namah Shivaya - Live Bhajan Session",
        description: "Experience the divine energy of Om Namah Shivaya mantra in this live bhajan session recorded at our temple.",
        youtubeId: "dQw4w9WgXcQ",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "25:30",
        publishedDate: "2024-01-15",
        views: 125000,
        likes: 8900,
        category: "Live Sessions",
        featured: true,
        isActive: true
      },
      {
        id: 2,
        title: "Hanuman Chalisa - Traditional Melody",
        description: "The complete Hanuman Chalisa sung in traditional style with harmonium and tabla accompaniment.",
        youtubeId: "dQw4w9WgXcQ",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "15:45",
        publishedDate: "2024-01-20",
        views: 89000,
        likes: 6700,
        category: "Traditional",
        featured: true,
        isActive: true
      },
      {
        id: 3,
        title: "Evening Aarti Collection",
        description: "A beautiful collection of evening aartis performed during sunset at our temple premises.",
        youtubeId: "dQw4w9WgXcQ",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "18:20",
        publishedDate: "2024-01-25",
        views: 67000,
        likes: 4500,
        category: "Aarti",
        featured: false,
        isActive: true
      }
    ]
  })

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSubscribe = () => {
    window.open(data.channel.channelUrl, '_blank')
  }

  const handleWatchVideo = (youtubeUrl) => {
    window.open(youtubeUrl, '_blank')
  }

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="h-64 bg-gray-200 "></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 "></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const sectionInfo = data?.sectionInfo || {}
  const channel = data?.channel
  const featuredVideos = data?.featuredVideos?.filter(video => video.isActive) || []

  if (!channel || !channel.isActive) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 kalam-regular">
            {sectionInfo.title || "Our Bhajan YouTube Channel"}
          </h2>
          <p className="text-xl text-orange-600 mb-6">
            {sectionInfo.subtitle || "Subscribe for Divine Musical Journey"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {sectionInfo.description}
          </p>
        </motion.div>

        {/* Channel Info Card */}
        <motion.div
          className="bg-white  overflow-hidden  border border-red-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Channel Banner */}
          <div 
            className="h-48 md:h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${channel.bannerImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-orange-900/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Youtube size={64} className="mx-auto mb-4 text-orange-300" />
                <h3 className="text-2xl md:text-3xl font-bold kalam-regular">
                  {channel.name}
                </h3>
              </motion.div>
            </div>
          </div>

          {/* Channel Details */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Channel Avatar & Info */}
              <div className="flex items-start gap-6 flex-1">
                <img
                  src={channel.channelImage}
                  alt={channel.name}
                  className="w-20 h-20 rounded-full border-4 border-red-200"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 kalam-regular">
                    {channel.name}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {channel.description}
                  </p>
                  
                  {/* Channel Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatNumber(channel.subscribers)}
                      </div>
                      <div className="text-sm text-gray-500">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatNumber(channel.totalViews)}
                      </div>
                      <div className="text-sm text-gray-500">Total Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {channel.totalVideos}
                      </div>
                      <div className="text-sm text-gray-500">Videos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscribe Button */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleSubscribe}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  <Bell size={20} className="mr-2" />
                  Subscribe
                </button>
                <button
                  onClick={() => window.open(channel.channelUrl, '_blank')}
                  className="border-2 border-red-500 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Visit Channel
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center kalam-regular">
            Featured Videos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={index}
                className="bg-white  overflow-hidden  border border-red-100  transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={() => handleWatchVideo(video.youtubeUrl)}
                      className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={24} className="ml-1" />
                    </motion.button>
                  </div>

                  {/* Duration & Featured Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock size={14} className="mr-1" />
                        {video.duration}
                      </span>
                      {video.featured && (
                        <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* YouTube Logo */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">
                      YouTube
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {video.description}
                  </p>

                  {/* Video Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {formatNumber(video.views)} views
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp size={14} className="mr-1" />
                      {formatNumber(video.likes)} likes
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(video.publishedDate)}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                      {video.category}
                    </span>
                    <button
                      onClick={() => handleWatchVideo(video.youtubeUrl)}
                      className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center"
                    >
                      Watch Now
                      <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}

export default YoutubeChannel 