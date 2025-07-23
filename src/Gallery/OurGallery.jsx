import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaImage, FaTimes } from 'react-icons/fa';

const OurGallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery/images');
        const data = await response.json();
        
        // Set images
        if (data && data.images) {
          setImages(data.images);
          setFilteredImages(data.images);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.images.map(img => img.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Set mock data if API fails
        setMockData();
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Mock data for fallback
  const setMockData = () => {
    const mockImages = [
      {
        id: '1',
        title: 'मंदिर उत्सव',
        description: 'वार्षिक मंदिर उत्सव के दौरान भक्तों का समारोह',
        imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2069&auto=format&fit=crop',
        category: 'उत्सव',
        date: '2023-04-15'
      },
      {
        id: '2',
        title: 'प्रसाद वितरण',
        description: 'भक्तों के बीच प्रसाद वितरण समारोह',
        imageUrl: 'https://images.unsplash.com/photo-1564923630403-2284b87c0041?q=80&w=2073&auto=format&fit=crop',
        category: 'प्रसाद',
        date: '2023-05-20'
      },
      {
        id: '3',
        title: 'आरती समारोह',
        description: 'सांध्य आरती के दौरान भक्तगण',
        imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop',
        category: 'आरती',
        date: '2023-06-10'
      },
      {
        id: '4',
        title: 'मंदिर परिसर',
        description: 'सुंदर मंदिर परिसर का दृश्य',
        imageUrl: 'https://images.unsplash.com/photo-1568871807338-d2500b3a15c3?q=80&w=2070&auto=format&fit=crop',
        category: 'मंदिर',
        date: '2023-07-05'
      },
      {
        id: '5',
        title: 'गुरुजी का प्रवचन',
        description: 'भक्तों को संबोधित करते गुरुजी',
        imageUrl: 'https://images.unsplash.com/photo-1567850173237-1065be1b2ce2?q=80&w=2072&auto=format&fit=crop',
        category: 'प्रवचन',
        date: '2023-08-12'
      },
      {
        id: '6',
        title: 'भजन संध्या',
        description: 'भक्तिपूर्ण भजन कार्यक्रम',
        imageUrl: 'https://images.unsplash.com/photo-1597336358795-5188d19a0e7a?q=80&w=2070&auto=format&fit=crop',
        category: 'भजन',
        date: '2023-09-18'
      }
    ];

    setImages(mockImages);
    setFilteredImages(mockImages);
    
    const uniqueCategories = [...new Set(mockImages.map(img => img.category))];
    setCategories(uniqueCategories);
  };

  // Filter images by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredImages(
        searchTerm 
          ? images.filter(img => img.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           img.description.toLowerCase().includes(searchTerm.toLowerCase()))
          : images
      );
    } else {
      setFilteredImages(
        images.filter(img => img.category === category && 
                      (searchTerm 
                        ? img.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          img.description.toLowerCase().includes(searchTerm.toLowerCase())
                        : true))
      );
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (selectedCategory === 'all') {
      setFilteredImages(
        term 
          ? images.filter(img => img.title.toLowerCase().includes(term.toLowerCase()) || 
                           img.description.toLowerCase().includes(term.toLowerCase()))
          : images
      );
    } else {
      setFilteredImages(
        images.filter(img => img.category === selectedCategory && 
                      (term 
                        ? img.title.toLowerCase().includes(term.toLowerCase()) || 
                          img.description.toLowerCase().includes(term.toLowerCase())
                        : true))
      );
    }
  };

  // Open image modal
  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close image modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#f2f0e9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading gallery images...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative z-10 -mt-32 px-4 bg-[#f2f0e9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            तस्वीरों का संग्रह
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            विविध समारोहों, उत्सवों और पूजा अनुष्ठानों की यादगार तस्वीरें
          </motion.p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
              onClick={() => filterByCategory('all')}
            >
              All
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <FaImage className="mx-auto w-16 h-16 text-gray-400" />
            <p className="mt-4 text-xl text-gray-500">No images found</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="overflow-hidden  bg-white cursor-pointer transform transition-all "
                onClick={() => openModal(image)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {image.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{image.title}</h3>
                  <p className="text-gray-600 mt-2">{image.description}</p>
                  <div className="mt-4 flex items-center text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    <span className="text-sm">{image.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 mt-20 z-[99999] flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute -top-12 right-0 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                onClick={closeModal}
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="bg-white rounded-lg overflow-hidden">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title} 
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedImage.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>{selectedImage.date}</span>
                    </div>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                      {selectedImage.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;