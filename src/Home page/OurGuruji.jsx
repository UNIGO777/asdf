import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, Play, Pause } from 'lucide-react'
import { createPortal } from 'react-dom'

const ImageModal = ({ guru, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  // Get all images (primary + additional images)
  const allImages = guru?.images?.length > 0 
    ? guru.images 
    : guru ? [{ url: guru.image, alt: guru.name, caption: guru.name }] : []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval
    if (isAutoPlaying && allImages.length > 1) {
      interval = setInterval(() => {
        nextImage()
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentImageIndex, allImages.length])

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setIsAutoPlaying(false)
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !guru) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case ' ':
          e.preventDefault()
          setIsAutoPlaying(!isAutoPlaying)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, guru, isAutoPlaying])

  // Early return if modal is closed
  if (!isOpen) return null

  // Render modal using portal to ensure it's at the root level and above everything
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
        style={{ 
          zIndex: 99999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.4
          }}
          className="relative max-w-6xl max-h-[95vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          onClick={(e) => e.stopPropagation()}
          style={{ zIndex: 100000 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold kalam-regular tracking-wide mb-2">{guru?.name || 'Guru'}</h2>
                <p className="text-orange-50 text-sm opacity-90">{guru?.description || ''}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Auto-play toggle */}
                
                
                {/* Image counter */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" style={{ height: '70vh' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut"
                }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                <img
                  src={allImages[currentImageIndex]?.url}
                  alt={allImages[currentImageIndex]?.alt || guru?.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  style={{ 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: '4px solid white'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-gray-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-gray-200"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          {allImages[currentImageIndex]?.caption && (
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white text-center border-t border-gray-100">
              <p className="text-gray-700 font-medium text-lg">{allImages[currentImageIndex].caption}</p>
            </div>
          )}

          {/* Thumbnail Navigation */}
          {allImages.length > 1 && (
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-4 justify-center overflow-x-auto pb-2 scrollbar-hide">
                
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body // Render the modal at the root level
  )
}

const GuruCard = ({ guru, index, onImageClick }) => {
  const hasMultipleImages = guru.images && guru.images.length > 1

  return (
    <motion.div 
      className={`${guru.bgColor} flex flex-col items-center text-center overflow-hidden cursor-pointer relative group`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      onClick={() => onImageClick(guru)}
    >
      <div className="mb-4 w-full h-[50vh] overflow-hidden relative">
        <motion.img 
          src={guru.image} 
          alt={guru.name} 
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Multiple images indicator */}
        {hasMultipleImages && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg"
          >
            <Camera size={14} />
            <span>{guru.images.length}</span>
          </motion.div>
        )}
        
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div 
            className="text-white text-center"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Camera size={20} />
            </div>
            <p className="text-sm mt-2 font-medium">View Gallery</p>
          </motion.div>
        </motion.div>
        
        {/* Click indicator */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400 transition-all duration-300 rounded-lg"></div>
      </div>
      
      <motion.div 
        className='p-4 flex-1 flex flex-col justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-3 text-orange-600 transition-colors duration-300">
          {guru.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {guru.description}
        </p>
        
        {/* View gallery button */}
        {hasMultipleImages && (
          <motion.button
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onImageClick(guru)
            }}
          >
            View Gallery ({guru.images.length} photos)
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

const OurGuruji = () => {
  const [loading, setLoading] = useState(true);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    sectionInfo: {
      subtitle: 'OUR SPIRITUAL GUIDES',
      title: 'Our Respected Gurujis',
      description: 'Learn from our esteemed spiritual teachers who embody the ancient wisdom traditions. Our gurujis provide guidance, inspiration, and authentic teachings to help you on your spiritual journey.'
    },
    gurus: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://narayan-website-backend.onrender.com/api/our-guruji');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching our guruji data:', error);
      // Keep the default/mock data if API fails
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (guru) => {
    setSelectedGuru(guru);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGuru(null);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 relative z-10 bg-[#ebe5de]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 relative z-10 bg-[#ebe5de]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">
            {data.sectionInfo.subtitle}
          </h3>
          <h2 className="text-4xl font-bold mb-4 text-orange-600 kalam-regular">
            {data.sectionInfo.title}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            {data.sectionInfo.description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.gurus.map((guru, index) => (
            <GuruCard 
              key={guru._id || guru.id || index} 
              guru={guru} 
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        {/* Image Modal */}
        <ImageModal 
          guru={selectedGuru} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    </section>
  )
}

export default OurGuruji