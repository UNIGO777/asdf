import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Music,
  Download,
  Play,
  Pause,
  Clock,
  Calendar,
  Heart,
  Share2,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react'

const BhajanCollection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bhajans')
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch bhajan data:', result.message)
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching bhajan data:', error)
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    sectionInfo: {
      title: "Our Sacred Bhajan Collection",
      subtitle: "Divine Melodies for Every Soul",
      description: "Explore our carefully curated collection of devotional bhajans, each carrying the essence of spiritual awakening and divine connection."
    },
    bhajans: [
      {
        id: 1,
        name: "Om Namah Shivaya",
        description: "A powerful mantra bhajan dedicated to Lord Shiva, bringing peace and spiritual awakening to the listener's heart.",
        image: "/src/assets/godimage.png",
        duration: "8:45",
        category: "Mantras",
        timing: "Morning",
        downloadLink: "https://drive.google.com/file/d/sample1",
        uploadedDate: "2024-01-15",
        isActive: true,
        featured: true,
        likes: 245,
        downloads: 1890
      },
      {
        id: 2,
        name: "Hanuman Chalisa",
        description: "The complete 40-verse prayer to Lord Hanuman, sung with traditional melody and devotion.",
        image: "/src/assets/HanumanImage.png",
        duration: "12:30",
        category: "Traditional",
        timing: "Evening",
        downloadLink: "https://drive.google.com/file/d/sample2",
        uploadedDate: "2024-01-20",
        isActive: true,
        featured: false,
        likes: 189,
        downloads: 1456
      },
      {
        id: 3,
        name: "Aarti Kunj Bihari Ki",
        description: "Traditional evening aarti dedicated to Lord Krishna, perfect for daily worship and meditation.",
        image: "/src/assets/godimage.png",
        duration: "6:20",
        category: "Aarti",
        timing: "Evening",
        downloadLink: "https://drive.google.com/file/d/sample3",
        uploadedDate: "2024-01-25",
        isActive: true,
        featured: true,
        likes: 156,
        downloads: 987
      },
      {
        id: 4,
        name: "Gayatri Mantra",
        description: "The most sacred Vedic mantra for enlightenment and spiritual purification, chanted with perfect pronunciation.",
        image: "/src/assets/godimage.png",
        duration: "15:00",
        category: "Mantras",
        timing: "Morning",
        downloadLink: "https://drive.google.com/file/d/sample4",
        uploadedDate: "2024-02-01",
        isActive: true,
        featured: false,
        likes: 298,
        downloads: 2134
      }
    ],
    categories: ["All", "Mantras", "Traditional", "Aarti", "Devotional", "Festival"]
  })

  const handleDownload = (downloadLink, bhajanName) => {
    window.open(downloadLink, '_blank')
    // Track download analytics here if needed
  }

  const handlePlay = (bhajanId) => {
    if (currentlyPlaying === bhajanId) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(bhajanId)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredBhajans = data?.bhajans?.filter(bhajan => {
    const matchesSearch = bhajan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bhajan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || bhajan.category === selectedCategory
    return matchesSearch && matchesCategory && bhajan.isActive
  }) || []

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 "></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const sectionInfo = data?.sectionInfo || {}

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
            {sectionInfo.title || "Our Sacred Bhajan Collection"}
          </h2>
          <p className="text-xl text-orange-600 mb-6">
            {sectionInfo.subtitle || "Divine Melodies for Every Soul"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {sectionInfo.description}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white  p-6  border border-orange-100">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bhajans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {data?.categories?.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              {filteredBhajans.length} bhajan{filteredBhajans.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.div>

        {/* Bhajan Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredBhajans.map((bhajan, index) => (
            <motion.div
              key={index}
              className="bg-white  overflow-hidden  border border-orange-100  transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={bhajan.image}
                  alt={bhajan.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Featured Badge */}
                {bhajan.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handlePlay(bhajan.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110"
                  >
                    {currentlyPlaying === bhajan.id ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                </div>

                {/* Category & Duration */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      {bhajan.category}
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1" />
                      {bhajan.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 kalam-regular">
                  {bhajan.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {bhajan.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(bhajan.uploadedDate)}
                  </span>
                  <span className="flex items-center">
                    <Music size={14} className="mr-1" />
                    {bhajan.timing}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <Heart size={14} className="mr-1 text-red-500" />
                    {bhajan.likes} likes
                  </span>
                  <span className="flex items-center">
                    <Download size={14} className="mr-1 text-green-500" />
                    {bhajan.downloads} downloads
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(bhajan.downloadLink, bhajan.name)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                  <button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredBhajans.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Music size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bhajans found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Call to Action */}
        
      </div>
    </section>
  )
}

export default BhajanCollection 