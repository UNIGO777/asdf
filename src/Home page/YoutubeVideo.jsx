import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Calendar,
  Clock,
  Share2,
  ThumbsUp,
  ExternalLink
} from 'lucide-react'

const YoutubeVideo = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/youtube-video')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch YouTube video data:', result.message)
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching YouTube video data:', error)
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    sectionInfo: {
      title: "Featuorange Video",
      subtitle: "Spiritual Teachings & Temple Life",
      description: "Watch our latest spiritual discourse and get insights into temple traditions, daily practices, and the path of devotion."
    },
    video: {
      id: 1,
      title: "Temple Introduction & Spiritual Guidance",
      description: "A comprehensive overview of our temple, its spiritual significance, daily rituals, and the path of devotion. Join us on this spiritual journey and discover the peace and wisdom that comes from connecting with the divine.",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube ID
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "15:30",
      publishedDate: "2024-01-15",
      views: 12500,
      likes: 850,
      category: "Spiritual Teachings",
      tags: ["Temple", "Spirituality", "Guidance", "Devotion", "Peace"],
      featuorange: true,
      isActive: true
    }
  })

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const getThumbnailUrl = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // In a real implementation, you might want to use YouTube API or iframe
  }

  const handleWatchOnYouTube = (url) => {
    window.open(url, '_blank')
  }

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="aspect-video bg-gray-200 rounded-2xl"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </section>
    )
  }

  const sectionInfo = data?.sectionInfo || {}
  const video = data?.video

  if (!video || !video.isActive) {
    return null
  }

  const youtubeId = video.youtubeId || extractYouTubeId(video.youtubeUrl)
  const thumbnailUrl = video.thumbnailUrl || getThumbnailUrl(youtubeId)

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 kalam-regular">
            {sectionInfo.title || "Featuorange Video"}
          </h2>
          <p className="text-xl text-orange-600 mb-6">
            {sectionInfo.subtitle || "Spiritual Teachings & Temple Life"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {sectionInfo.description}
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white overflow-hidden  border border-orange-100">
            {/* Video Player */}
            <div className="relative aspect-video bg-gray-900">
              {!isPlaying ? (
                // Thumbnail with Play Button
                <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayVideo}>
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-6 shadow-2xl transform transition-all duration-300 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={48} className="ml-2" />
                    </motion.div>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {video.duration}
                          </span>
                          <span className="flex items-center">
                            <Eye size={16} className="mr-1" />
                            {formatViews(video.views)} views
                          </span>
                        </div>
                        {video.featuorange && (
                          <span className="bg-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                            Featuorange
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* YouTube Logo */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold">
                      YouTube
                    </div>
                  </div>
                </div>
              ) : (
                // YouTube Iframe
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              )}
            </div>

            {/* Video Details */}
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left Content */}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 kalam-regular leading-tight">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Video Meta */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-orange-500" />
                      <span>{formatDate(video.publishedDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye size={18} className="mr-2 text-orange-500" />
                      <span>{formatViews(video.views)} views</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp size={18} className="mr-2 text-orange-500" />
                      <span>{video.likes} likes</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {video.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col space-y-4 lg:w-64">
                  <button
                    onClick={() => handleWatchOnYouTube(video.youtubeUrl)}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Watch on YouTube
                  </button>

                  <button className="border-2 border-orange-500 text-orange-600 py-3 px-6 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center">
                    <Share2 size={20} className="mr-2" />
                    Share Video
                  </button>

                  {/* Category Badge */}
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">{video.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        
      </div>
    </section>
  )
}

export default YoutubeVideo
