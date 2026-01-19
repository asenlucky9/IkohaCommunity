'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Mineral Resources', href: '/minerals' },
    { name: 'Projects', href: '/projects' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'News', href: '/news' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header 
      className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <img
                  src="/images/logo/logoikoha.png"
                  alt="Ikoha Community Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-primary">
                  Ikoha Community
                </div>
                <div className="text-xs text-gray-600">
                  Agricultural & Mineral Resources
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors position-relative"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <Link
                href="/contact"
                className="btn btn-primary ms-4"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation - Animated */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary font-medium py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <Link
                    href="/contact"
                    className="btn btn-primary mt-2 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
