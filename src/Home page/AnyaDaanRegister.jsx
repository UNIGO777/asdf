import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AnyaDaanRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    donationType: '',
    amount: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Reset form after showing success message
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          donationType: '',
          amount: ''
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-16 px-4 relative  w-full overflow-hidden z-10 bg-white bg-[#ebe5de]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Image */}
          <motion.div
            className="md:w-1/2  overflow-hidden "
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2340&auto=format&fit=crop" 
              alt="Food Donation" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Right column - Form */}
          <motion.div 
            className="md:w-1/2 bg-[#ebe5de] p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-sm uppercase tracking-wider text-orange-600 mb-2">CONTRIBUTE TO SOCIETY</h3>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 kalam-regular">Anna Daan Registration</h2>
              <p className="text-sm text-gray-600">
                Register to contribute food or monetary donations. Your generosity can help feed those in need.
              </p>
            </div>
            
            {submitSuccess ? (
              <motion.div 
                className="bg-green-50 border-l-4 border-green-500 p-4 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-green-700">Thank you for your generous contribution! We will contact you soon with more details.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 kalam-regular">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 kalam-regular border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 kalam-regular">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 kalam-regular border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 kalam-regular">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 kalam-regular rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your contact number"
                  />
                </div>
                
                <div>
                  <label htmlFor="donationType" className="block kalam-regular text-sm font-medium text-gray-700 mb-1">Donation Type</label>
                  <select
                    id="donationType"
                    name="donationType"
                    value={formData.donationType}
                    onChange={handleChange}
                    required
                    className="w-full kalam-regular px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="" disabled>Select donation type</option>
                    <option value="food">Food Donation</option>
                    <option value="money">Monetary Donation</option>
                    <option value="grains">Grains & Pulses</option>
                    <option value="vegetables">Fresh Vegetables</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 kalam-regular">Quantity/Amount</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 kalam-regular rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Specify quantity or amount"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium transition-colors ${isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'hover:bg-orange-700'}`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Register to Donate'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AnyaDaanRegister
