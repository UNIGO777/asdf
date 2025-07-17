import React from 'react';
import { Book, Star, Download, Eye } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-red-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0  opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <Book className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Sacred <span className="text-orange-600">Literature</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive collection of spiritual and philosophical books that guide you on your journey of self-discovery and spiritual growth.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-orange-200">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Collection</h3>
              <p className="text-gray-600">Curated selection of authentic spiritual texts and modern interpretations</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-orange-200">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Access</h3>
              <p className="text-gray-600">Download or read online in multiple formats for your convenience</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-orange-200">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Languages</h3>
              <p className="text-gray-600">Available in Hindi, English, Sanskrit, and mixed language editions</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-orange-400 rounded-full opacity-30 animate-bounce" />
    </section>
  );
};

export default HeroSection;