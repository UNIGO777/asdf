import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'

const navLinks = [
  {
    title: 'About',
    links: [
      { name: 'About', href: '/about#about' },
      { name: 'History', href: '/about#history' },
      { name: 'Spiritual Growth', href: '/about#spiritual' },
      { name: 'Our Guruji', href: '/about#guruji' }
    ]
  },
  {
    title: 'Donations',
    links: [
      { name: 'Rakta Daan', href: '/donations#rakt-daan' },
      { name: 'Shram Daan', href: '/donations#shram-daan' },
      { name: 'Anya Daan', href: '/donations#anya-daan' },
      // { name: 'Temple Development', href: '/donations#temple-development' }
    ]
  },
  {
    title: 'Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Donations', href: '/donations' },
      { name: 'Events', href: '/events' },
      { name: 'Books', href: '/books' },
      { name: 'Bhajan', href: '/bhajan' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact Us', href: '/contact' }
    ]
  }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleLinkClick = (category, link) => {
    setIsOpen(false)
    setActiveDropdown(null)
    
    // If the category has a base href and the link has a hash
    if (category.href && link.href.startsWith('#')) {
      window.location.href = category.href + link.href
    }
  }

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Bhajan', href: '/bhajan' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Donations', href: '/donations' },
  ]

  return (
    <nav className='w-full fixed top-0 z-30 bg-white '>
      <div className='mx-auto px-4 md:px-10'>
        <div className='h-20 flex items-center justify-between'>
          <Link to='/' className='flex items-center space-x-3'>
            <img src={logo} alt="Logo" className='h-16 w-auto hover:scale-105 transition-transform' />
            <div className='flex flex-col'>
              <h1 className='font-semibold uppercase kalam-regular text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'>ॐ नमो नारायणाय</h1>
              <p className='text-sm text-gray-600 italic'>A Sacred Journey to Enlightenment</p>
            </div>
          </Link>

          <button
            className='text-gray-700 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-orange-50'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className='fixed inset-0 bg-white z-50 overflow-y-auto pt-20 bg-[#f2f0e9]'
            >
              <div className='absolute top-4 right-4'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors'
                >
                  <HiX size={28} />
                </button>
              </div>

              <div className='container mx-auto px-4 py-8'>
                <div className='flex items-center justify-center mb-8'>
                  <img src={logo} alt="Logo" className='h-24 w-auto' />
                  <div className='ml-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>श्री सिद्ध नारायण टेकड़ी</h2>
                    <p className='text-gray-600 italic'>Spiritual Enlightenment & Peace</p>
                  </div>
                </div>

                {navLinks.map((category, idx) => (
                  <div key={idx} className='mb-6 bg-gray-50 rounded-xl overflow-hidden'>
                    {category.title === 'Pages' ? (
                      <div className='border-t border-gray-100'>
                        {category.links.map((link, linkIdx) => (
                          <Link
                            key={linkIdx}
                            to={link.href}
                            className='group block px-8 py-4 text-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all'
                            onClick={() => setIsOpen(false)}
                          >
                            <span className='relative pl-4 block'>
                              <span className='absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                              {link.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div
                          className='w-full flex items-center justify-between px-6 py-4 text-xl font-semibold text-gray-800 hover:text-orange-500 transition-colors bg-white'
                          onClick={() => toggleDropdown(idx)}
                        >
                          <span className='font-bold'>{category.title}</span>
                          <IoIosArrowDown 
                            className={`transition-transform duration-300 text-orange-500 ${
                              activeDropdown === idx ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                        <AnimatePresence>
                          {activeDropdown === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className='border-t border-gray-100'
                            >
                              {category.links.map((link, linkIdx) => (
                                <Link
                                  key={linkIdx}
                                  to={link.href}
                                  className='group block px-8 py-4 text-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all'
                                  onClick={() => handleLinkClick(category, link)}
                                >
                                  <span className='relative pl-4 block'>
                                    <span className='absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                                    {link.name}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar