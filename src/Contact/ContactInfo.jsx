import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  Heart,
  Star
} from 'lucide-react'

const ContactInfo = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // In future, this will fetch from API
      // const response = await fetch('https://narayan-website-backend.onrender.com/api/contact')
      // const result = await response.json()
      
      // For now, using hardcoded data
      const result = {
        contactInfo: {
          title: "Get in Touch",
          subtitle: "We're here to serve you",
          description: "Feel free to reach out to us for any spiritual guidance, temple visits, or community events. Our doors are always open for devotees."
        },
        contactDetails: {
          phone: "+91 82082 27505",
          email: "info@narayangurukul.org",
          address: "श्री सदगुरू नारायण स्वामी दरबार, श्री सिद्ध नारायण टेकड़ी अंबाला रामटेक जि.नागपुर महाराष्ट्र 441106"
        },
        darshanTimings: {
          title: "Darshan Timings",
          timings: [
            {
              day: "Monday - Friday",
              morning: "5:00 AM - 12:00 PM",
              evening: "4:00 PM - 9:00 PM"
            },
            {
              day: "Saturday - Sunday",
              morning: "5:00 AM - 12:00 PM",
              evening: "4:00 PM - 10:00 PM"
            }
          ],
          specialEvents: [
            {
              name: "Aarti Timings",
              times: ["6:00 AM", "12:00 PM", "7:00 PM"]
            },
            {
              name: "Bhajan Sandhya",
              times: ["Every Saturday 6:00 PM"]
            }
          ]
        },
        location: {
          title: "Visit Our Temple",
          coordinates: {
            lat: 22.3039,
            lng: 70.8022
          },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29441.99484279671!2d70.78224615!3d22.3038945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca248c77c099%3A0xdf5ac10af64ac8ee!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1703075845123!5m2!1sen!2sin"
        }
      }
      
      setData(result)
    } catch (error) {
      console.error('Error fetching contact data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const contactInfo = data?.contactInfo || {}
  const contactDetails = data?.contactDetails || {}
  const darshanTimings = data?.darshanTimings || {}
  const location = data?.location || {}

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 kalam-regular">
            {contactInfo.title || "Get in Touch"}
          </h2>
          <p className="text-xl text-orange-600 mb-4">
            {contactInfo.subtitle || "We're here to serve you"}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {contactInfo.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Details & Darshan Timings */}
          <div className="space-y-8">
            {/* Contact Details */}
            <motion.div
              className="bg-white rounded-2xl p-8  border border-orange-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="mr-3 text-orange-500" size={28} />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">{contactDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">{contactDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <MapPin className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">{contactDetails.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Darshan Timings */}
            <motion.div
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8  text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="mr-3" size={28} />
                {darshanTimings.title || "Darshan Timings"}
              </h3>
              
              <div className="space-y-6">
                {darshanTimings.timings?.map((timing, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Calendar className="mr-2" size={16} />
                      {timing.day}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Morning:</span> {timing.morning}</p>
                      <p><span className="font-medium">Evening:</span> {timing.evening}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Star className="mr-2" size={16} />
                    Special Events
                  </h4>
                  {darshanTimings.specialEvents?.map((event, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium text-sm">{event.name}</p>
                      <p className="text-xs text-orange-100">{event.times.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-8  border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="mr-3 text-orange-500" size={28} />
                {location.title || "Visit Our Temple"}
              </h3>
              
              <div className="relative">
                <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src={location.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Narayan Gurukul Temple Location"
                  ></iframe>
                </div>
                
                {/* Map Overlay Info */}
                
              </div>

              {/* Direction Button */}
              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps?q=${location.coordinates?.lat},${location.coordinates?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105  flex items-center justify-center"
                >
                  <MapPin className="mr-2" size={20} />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Additional Info Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Users className="mr-2 text-blue-600" size={20} />
                Visitor Guidelines
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Please maintain silence and respect within the temple premises</li>
                <li>• Dress modestly and remove footwear before entering</li>
                <li>• Photography may be restricted in certain areas</li>
                <li>• Follow the guidance of temple staff and volunteers</li>
                <li>• Mobile phones should be on silent mode</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8  border border-orange-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send us a Message
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Message subject"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your message to us..."
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.01] "
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactInfo 