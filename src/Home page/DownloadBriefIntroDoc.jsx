import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  Eye,
  Calendar,
  User,
  FileDown,
  BookOpen,
  Star,
  ExternalLink,
  Users,
  Clock
} from 'lucide-react'

const DownloadBriefIntroDoc = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://narayan-website-backend.onrender.com/api/brief-intro-docs')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        console.error('Failed to fetch brief intro docs:', result.message)
        setData(getMockData())
      }
    } catch (error) {
      console.error('Error fetching brief intro docs:', error)
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => ({
    sectionInfo: {
      title: "Download Brief Introduction",
      subtitle: "Sacred Documents & Spiritual Guides",
      description: "Explore our comprehensive collection of spiritual documents, introductory guides, and sacred texts. Download these valuable resources to deepen your understanding of our teachings and practices."
    },
    documents: [
      {
        id: 1,
        title: "Temple Introduction Guide",
        description: "A comprehensive introduction to our temple, its history, traditions, and spiritual practices. Perfect for new devotees and visitors who want to understand our sacred traditions and daily rituals.",
        frontPageImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
        downloadUrl: "https://drive.google.com/file/d/1example123/view?usp=sharing",
        fileSize: "2.5 MB",
        pages: 24,
        language: "Hindi & English",
        category: "Introduction",
        author: "Temple Administration",
        publishedDate: "2024-01-15",
        downloads: 1250,
        featured: true,
        tags: ["Introduction", "History", "Practices", "Traditions", "Spiritual Guide"]
      }
    ]
  })

  const handleDownload = (document) => {
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank')
      // Track download analytics
      trackDownload(document.id)
    }
  }

  const trackDownload = async (documentId) => {
    try {
      await fetch(`https://narayan-website-backend.onrender.com/api/brief-intro-docs/download/${documentId}`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Error tracking download:', error)
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

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </section>
    )
  }

  const sectionInfo = data?.sectionInfo || {}
  const documents = data?.documents || []
  const activeDocuments = documents.filter(doc => doc.isActive !== false)

  // Single Document Hero Layout
  const SingleDocumentLayout = ({ document }) => (
    <motion.div
      className=" mx-auto "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white  overflow-hidden border border-orange-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Document Image */}
          <div className="relative h-96 lg:h-auto overflow-hidden">
            <img
              src={document.frontPageImage}
              alt={document.title}
              className="w-full h-[60vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20"></div>
            
            {/* Featured Badge */}
            {document.featured && (
              <div className="absolute top-6 left-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                  <Star size={16} className="mr-2" />
                  Featured Document
                </div>
              </div>
            )}

            {/* Quick Stats */}
            
          </div>

          {/* Document Details */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                {document.category}
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 kalam-regular leading-tight">
              {document.title}
            </h3>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {document.description}
            </p>

            {/* Document Meta */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-600">
                <User size={18} className="mr-3 text-orange-500" />
                <span className="font-medium">By {document.author}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-3 text-orange-500" />
                <span>Published {formatDate(document.publishedDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FileText size={18} className="mr-3 text-orange-500" />
                <span>{document.language}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {document.tags?.slice(0, 5).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleDownload(document)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center "
              >
                <FileDown size={24} className="mr-3" />
                Download PDF
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Multiple Documents Grid Layout
  const MultipleDocumentsLayout = ({ documents }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {documents.map((document, index) => (
        <motion.div
          key={document.id || index}
          className={`relative bg-white  overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            document.featured
              ? 'border-orange-300 ring-2 ring-orange-100'
              : 'border-gray-200 hover:border-orange-300'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Featured Badge */}
          {document.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                <Star size={12} className="mr-1" />
                Featured
              </div>
            </div>
          )}

          {/* Document Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={document.frontPageImage}
              alt={document.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                {document.category}
              </span>
            </div>

            {/* Quick Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="flex items-center">
                  <FileText size={12} className="mr-1" />
                  {document.pages} pages
                </span>
                <span className="flex items-center">
                  <Download size={12} className="mr-1" />
                  {document.downloads}
                </span>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 kalam-regular line-clamp-2">
              {document.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {document.description}
            </p>

            {/* Document Meta Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-xs text-gray-500">
                <User size={12} className="mr-2" />
                <span>{document.author}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-2" />
                <span>{formatDate(document.publishedDate)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>📄 {document.language}</span>
                <span>📦 {document.fileSize}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {document.tags?.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(document)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <FileDown size={20} className="mr-2" />
              Download PDF
            </button>

            {/* Preview Link */}
            
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section className="py-16 px-4  bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl  mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 kalam-regular">
            {sectionInfo.title || "Download Brief Introduction"}
          </h2>
          <p className="text-xl text-orange-600 mb-6">
            {sectionInfo.subtitle || "Sacred Documents & Spiritual Guides"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {activeDocuments.length === 1 
              ? "Download our comprehensive spiritual guide to deepen your understanding of our teachings and practices."
              : sectionInfo.description
            }
          </p>
        </motion.div>

        {/* Adaptive Layout */}
        {activeDocuments.length === 1 ? (
          <SingleDocumentLayout document={activeDocuments[0]} />
        ) : (
          <MultipleDocumentsLayout documents={activeDocuments} />
        )}

        {/* Call to Action */}
        
      </div>
    </section>
  )
}

export default DownloadBriefIntroDoc
