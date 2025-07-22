import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://firebasestorage.googleapis.com/v0/b/test-app-e7e32.appspot.com/o/products%2FWhatsApp%20Image%202025-07-12%20at%2013.00.20.jpeg?alt=media&token=c44d2df7-8da5-4787-a7fb-532f15b8f287')`
        }}
      />
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-transparent to-orange-900/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 kalam-regular">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
            Connect with our divine community. We welcome you to visit our sacred temple and experience the spiritual bliss.
          </p>
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 border-2 border-orange-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-16 h-16 border-2 border-orange-400/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  )
}

export default HeroSection 