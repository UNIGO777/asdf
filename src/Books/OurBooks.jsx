import React, { useState, useEffect } from 'react';
import { Star, Download, Eye, BookOpen, Calendar, DollarSign, Globe, User } from 'lucide-react';

const OurBooks = () => {
  const [booksData, setBooksData] = useState({
    sectionInfo: {
      subtitle: 'Sacred Literature',
      title: 'Our Books Collection',
      description: 'Explore our comprehensive collection of spiritual and philosophical books that guide you on your journey of self-discovery and spiritual growth.'
    },
    books: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async () => {
    try {
      const response = await fetch('https://narayan-website-backend.onrender.com/api/books');
      const result = await response.json();
      
      if (result.success) {
        setBooksData(result.data);
      } else {
        setError('Failed to fetch books data');
      }
    } catch (error) {
      console.error('Error fetching books data:', error);
      setError('Error fetching books data');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Spiritual', 'Philosophy', 'History', 'Biography', 'Religious', 'Meditation', 'Yoga', 'Other'];
  const languages = ['All', 'Hindi', 'English', 'Sanskrit', 'Mixed'];

  const filteredBooks = booksData.books.filter(book => {
    const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
    const languageMatch = selectedLanguage === 'All' || book.language === selectedLanguage;
    return categoryMatch && languageMatch && book.isAvailable;
  });

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Book Image */}
      <div className="relative">
        {book.image && (
          <img 
            src={book.image} 
            alt={book.title}
            className="w-full h-64 object-cover"
          />
        )}
        
        {/* Featured Badge */}
        {book.featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            book.category === 'Spiritual' ? 'bg-purple-100 text-purple-800' :
            book.category === 'Philosophy' ? 'bg-blue-100 text-blue-800' :
            book.category === 'History' ? 'bg-green-100 text-green-800' :
            book.category === 'Biography' ? 'bg-indigo-100 text-indigo-800' :
            book.category === 'Religious' ? 'bg-red-100 text-red-800' :
            book.category === 'Meditation' ? 'bg-teal-100 text-teal-800' :
            book.category === 'Yoga' ? 'bg-pink-100 text-pink-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {book.category}
          </span>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{book.title}</h3>
          <span className="text-lg font-bold text-orange-600">₹{book.price}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span>by {book.author}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>
        
        {/* Book Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <span>{book.language}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{book.publishedYear}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{book.pages} pages</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs">ISBN: {book.isbn}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          {book.downloadLink && book.downloadLink !== '#' && (
            <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          )}
          
          {book.readOnlineLink && book.readOnlineLink !== '#' && (
            <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
              <Eye className="w-4 h-4 mr-2" />
              Read Online
            </button>
          )}
          
          {(!book.downloadLink || book.downloadLink === '#') && (!book.readOnlineLink || book.readOnlineLink === '#') && (
            <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{error}</h3>
            </div>
            <button 
              onClick={fetchBooksData}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 text-sm font-medium mb-2">{booksData.sectionInfo.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{booksData.sectionInfo.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{booksData.sectionInfo.description}</p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.order} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Books Found</h3>
            <p className="text-gray-600">
              {selectedCategory !== 'All' || selectedLanguage !== 'All' 
                ? 'No books match your selected filters. Try adjusting your filters.'
                : 'Our book collection is being updated. Please check back soon.'}
            </p>
          </div>
        )}

        {/* Statistics */}
        {filteredBooks.length > 0 && (
          <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">{booksData.books.length}</div>
                <div className="text-sm text-gray-600">Total Books</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {booksData.books.filter(book => book.featured).length}
                </div>
                <div className="text-sm text-gray-600">Featured Books</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {[...new Set(booksData.books.map(book => book.category))].length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {[...new Set(booksData.books.map(book => book.language))].length}
                </div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurBooks; 