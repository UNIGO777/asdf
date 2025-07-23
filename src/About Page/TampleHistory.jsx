import React, { useState, useEffect } from 'react'
import { BookOpen, Heart, Users, Star, MapPin } from 'lucide-react'

const TempleHistory = () => {
  const [data, setData] = useState({
    heroSection: {
      title: '',
      subtitle: ''
    },
    introduction: {
      subtitle: '',
      title: '',
      description1: '',
      description2: '',
      sacredSymbol: {
        title: '',
        description: ''
      }
    },
    timeline: {
      subtitle: '',
      title: '',
      items: []
    },
    spiritualSignificance: [],
    parichay: {
      subtitle: '',
      title: '',
      description1: '',
      description2: '',
      quote: {
        sanskrit: '',
        translation: ''
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://narayan-website-backend.onrender.com/api/temple-history');
        if (!response.ok) {
          throw new Error('Failed to fetch Temple History data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching Temple History data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'Heart': return <Heart className="w-12 h-12 mb-4 text-white" />;
      case 'BookOpen': return <BookOpen className="w-12 h-12 mb-4 text-white" />;
      case 'Star': return <Star className="w-12 h-12 mb-4 text-white" />;
      default: return <Heart className="w-12 h-12 mb-4 text-white" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f0e9]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading Temple History...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f2f0e9]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading Temple History: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f0e9]">
      {/* Hero Section */}
      <div className="relative text-white py-20">
        <div className="absolute inset-0 text-black opacity-40"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-black">
            {data.heroSection.title || "Temple History"}
          </h1>
          <p className="text-xl opacity-90 text-black">
            {data.heroSection.subtitle || "Discover the Sacred Journey of Shree Siddh Narayan Tekdi"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Introduction Section */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <span className="text-[#fb923c] text-sm font-semibold uppercase tracking-wide">
              {data.introduction.subtitle || "Sacred Heritage"}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {data.introduction.title || "A Divine Legacy"}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {data.introduction.description1 || "Shree Siddh Narayan Tekdi stands as a beacon of spiritual enlightenment, nestled in the sacred hills of Ramtek. This divine abode has been sanctified by the eternal presence of revered saints and spiritual masters who have blessed this land for centuries."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {data.introduction.description2 || "The temple represents not just a place of worship, but a living testament to the profound spiritual heritage that continues to guide devotees on their path to inner peace and self-realization."}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-lg">
              <div className="text-center">
                ॐ
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {data.introduction.sacredSymbol.title || "Sacred Symbol"}
                </h3>
                <p className="text-gray-600">
                  {data.introduction.sacredSymbol.description || "The eternal Om resonates through every prayer and meditation at our temple"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-[#fb923c] text-sm font-semibold uppercase tracking-wide">
              {data.timeline.subtitle || "Our Journey"}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {data.timeline.title || "Sacred Timeline"}
            </h2>
          </div>

          <div className="space-y-8">
            {data.timeline.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#fb923c] rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div className="bg-white p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spiritual Significance Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {data.spiritualSignificance.map((item, index) => (
            <div key={index} className={`bg-gradient-to-br bg-orange-500 text-white p-8 rounded-lg`}>
              {renderIcon(item.icon)}
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="opacity-90">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Parichay Section */}
        <div className="bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <span className="text-[#fb923c] text-sm font-semibold uppercase tracking-wide">
              {data.parichay.subtitle || "परिचय"}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {data.parichay.title || "Sacred Introduction"}
            </h2>
          </div>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-6">
              {data.parichay.description1 || "This is the Jyotiswaroop Darbar (Abode) of Shree Sadguru Narayan Swami. Shri Sidh Narayan Tekdi, nestled in the divine land of Ramtek, is not just a hill—it is a sacred living presence, a beacon of spiritual light, awakened and sanctified by the eternal Sanjeevan Samadhi of Shree Sadguru Narayan Swami."}
            </p>
            
            <p className="mb-6">
              {data.parichay.description2 || "The hill became beautiful by the existence of Sanjeevan Samadhi of Shree Sadguru Narayan Swami. This hill became sacred by the Tapasya of Shree Dattaguru. The glorified Flag of Dharma always flies at this Narayan Tekdi. The glory of this sacred place is immense. All wishes come true if someone prays wholeheartedly to Shree Sadgurunath."}
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mt-8">
              <p className="text-center text-lg font-semibold text-gray-800 mb-4">
                "{data.parichay.quote.sanskrit || "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"}"
              </p>
              <p className="text-center text-gray-600 italic">
                {data.parichay.quote.translation || "May all beings be happy, may all beings be free from illness"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempleHistory