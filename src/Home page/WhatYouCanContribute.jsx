import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Building,
  Shirt,
  HandHeart,
  Home,
  Users,
  Gift,
  Heart,
  Star
} from 'lucide-react'
import { useNavigate, useNavigation } from 'react-router-dom'

const WhatYouCanContribute = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contributions')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch contributions data:', result.message)
        // Fall back to mock data if API fails
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching contribution data:', error)
      // Fall back to mock data if API fails
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    sectionInfo: {
      title: "What You Can Contribute",
      subtitle: "Support Our Sacred Mission",
      description: "Your contributions help us serve the community and spread spiritual knowledge. Every contribution, big or small, makes a difference in our divine mission."
    },
    contributions: [
      {
        id: 1,
        title: "All General Hall",
        description: "Support the construction and maintenance of our community halls for gatherings, events, and spiritual programs.",
        icon: "Building",
        category: "Infrastructure",
        items: [
          "Main Assembly Hall",
          "Prayer Hall",
          "Community Meeting Space",
          "Event Venue"
        ],
        featured: true
      },
      {
        id: 2,
        title: "Regular Dress",
        description: "Contribute traditional clothing for temple ceremonies and daily spiritual practices.",
        icon: "Shirt",
        category: "Clothing",
        items: [
          {
            name: "Lungi",
            description: "Traditional lower garment for temple services"
          },
          {
            name: "Bandi",
            description: "Traditional vest for ceremonial occasions"
          },
          {
            name: "Topi",
            description: "Sacred headwear for prayers and rituals"
          },
          {
            name: "Pancha",
            description: "Traditional cloth for temple ceremonies"
          }
        ],
        featured: false
      },
      {
        id: 3,
        title: "Types of Seva",
        description: "Participate in various forms of selfless service to support our temple community and spiritual activities.",
        icon: "HandHeart",
        category: "Service",
        items: [
          "Kitchen Seva (Food preparation)",
          "Temple Cleaning Seva",
          "Garden Maintenance",
          "Event Organization",
          "Teaching & Education",
          "Medical Services"
        ],
        featured: false
      },
      {
        id: 4,
        title: "Living Arrangements",
        description: "Support accommodation facilities exclusively for darbar karyakartas (temple workers) who dedicate their lives to service.",
        icon: "Home",
        category: "Accommodation",
        items: [
          "Basic Room Facilities",
          "Shared Kitchen Access",
          "Study/Meditation Space",
          "Utilities & Maintenance"
        ],
        featured: false,
        restriction: "Only for Darbar Karyakartas"
      }
    ]
  })

  const Navigate = useNavigate()

  const getIcon = (iconName) => {
    const icons = {
      Building: Building,
      Shirt: Shirt,
      HandHeart: HandHeart,
      Home: Home
    }
    const IconComponent = icons[iconName] || Gift
    return <IconComponent size={32} />
  }

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const sectionInfo = data?.sectionInfo || {}
  const contributions = data?.contributions || []

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 kalam-regular">
            {sectionInfo.title || "What You Can Contribute"}
          </h2>
          <p className="text-xl text-orange-600 mb-6">
            {sectionInfo.subtitle || "Support Our Sacred Mission"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {sectionInfo.description}
          </p>
        </motion.div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.id || index}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 ${
                contribution.featured
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-orange-300 lg:col-span-2 md:col-span-2'
                  : 'bg-white text-gray-900 border-orange-200 hover:border-orange-300'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-full ${
                    contribution.featured 
                      ? 'bg-white/20 backdrop-blur-sm text-white' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {getIcon(contribution.icon)}
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    contribution.featured
                      ? 'bg-white/20 text-white'
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {contribution.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 kalam-regular">
                  {contribution.title}
                </h3>

                {/* Description */}
                <p className={`mb-6 ${
                  contribution.featured ? 'text-orange-50' : 'text-gray-600'
                }`}>
                  {contribution.description}
                </p>

                {/* Restriction Badge */}
                {contribution.restriction && (
                  <div className={`inline-flex items-center mb-4 px-3 py-1 rounded-full text-xs font-medium ${
                    contribution.featured
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Users size={12} className="mr-1" />
                    {contribution.restriction}
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                  {Array.isArray(contribution.items) ? (
                    typeof contribution.items[0] === 'string' ? (
                      contribution.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                            contribution.featured ? 'bg-white/60' : 'bg-orange-400'
                          }`}></div>
                          <span className={`text-sm ${
                            contribution.featured ? 'text-orange-50' : 'text-gray-600'
                          }`}>
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      contribution.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-3">
                          <div className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                              contribution.featured ? 'bg-white/60' : 'bg-orange-400'
                            }`}></div>
                            <div>
                              <span className={`font-medium ${
                                contribution.featured ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.name}
                              </span>
                              {item.description && (
                                <p className={`text-xs mt-1 ${
                                  contribution.featured ? 'text-orange-100' : 'text-gray-500'
                                }`}>
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  ) : null}
                </div>

                {/* Action Button */}
            
              </div>

              {/* Featured Badge */}
            
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 border border-orange-200">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <Heart className="text-orange-600" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 kalam-regular">
              Ready to Contribute?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your contribution, whether time, resources, or expertise, helps us create a stronger spiritual community. Contact us to learn how you can get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105" onClick={()=>Navigate('/contact')}>
                Contact Us
              </button>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatYouCanContribute 