import React from 'react'
import { motion } from 'framer-motion'
import image from '../assets/Tampleimage.jpeg'

// Sample temple development projects data
const developmentProjects = [
  {
    id: 1,
    title: 'Main Temple Renovation',
    date: 'January - June 2024',
    description: 'Complete renovation of the main prayer hall',
    amount: '₹25,00,000'
  },
  {
    id: 2,
    title: 'Community Kitchen Expansion',
    date: 'March - May 2024',
    description: 'Expanding our kitchen to serve more devotees',
    amount: '₹15,00,000'
  },
  {
    id: 3,
    title: 'Garden & Meditation Space',
    date: 'April - August 2024',
    description: 'Creating a peaceful garden for meditation',
    amount: '₹10,00,000'
  }
]

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="flex items-center   mb-4 p-3 bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-amber-100 p-3 rounded-full mr-4">
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{project.title}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
          <span>{project.date}</span>
          <span className="mt-1 sm:mt-0 font-semibold text-amber-700">{project.amount}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{project.description}</p>
      </div>
    </motion.div>
  )
}

const TampleDevelopment = () => {
  return (
    <section className="py-16 px-4  w-full overflow-hidden relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            className="overflow-hidden h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={image}
              alt="Temple Development" 
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
          
          {/* Right column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm uppercase tracking-wider text-amber-600 mb-2">CONTRIBUTE TO OUR GROWTH</h3>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 kalam-regular">Temple Development</h2>
              <p className="text-gray-600 mb-6">
                Help us expand and improve our sacred spaces. Your generous contributions will support the construction, renovation, and maintenance of our temple facilities, ensuring they remain beautiful, functional, and accessible for generations to come.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
                <p className="text-amber-700 font-medium">"By contributing to the development of a temple, you are creating a sacred space where countless souls can find peace, guidance, and spiritual nourishment for generations to come."</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Current Development Projects</h3>
              <div className="space-y-3">
                {developmentProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <motion.button 
                className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contribute Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TampleDevelopment