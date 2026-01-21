'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  Info,
  Gem,
  Construction,
  Store,
  Newspaper,
  CalendarDays,
  Mail,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Minerals', href: '/minerals', icon: Gem },
    { name: 'Projects', href: '/projects', icon: Construction },
    { name: 'Businesses', href: '/businesses', icon: Store },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Events', href: '/events', icon: CalendarDays },
    { name: 'Contact', href: '/contact', icon: Mail },
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
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo - large, professional brand block */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-5">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0 rounded-2xl bg-gradient-to-br from-gray-50 to-white flex items-center justify-center shadow-md ring-1 ring-gray-200/80 overflow-hidden">
                <img
                  src="/images/logo/logoikoha.png"
                  alt="Ikoha Community Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="hidden sm:block min-w-0 border-l border-gray-200 pl-5">
                <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-primary leading-tight tracking-tight">
                  Ikoha Community
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium uppercase tracking-widest">
                  Agricultural & Mineral Resources
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - compact so all fit on one line */}
          <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-2 lg:gap-y-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="shrink-0"
              >
                {(() => {
                  const Icon = item.icon
                  const active = pathname === item.href
                  return (
                <Link
                  href={item.href}
                  className={[
                    'group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-80 group-hover:opacity-100" />
                  <span>{item.name}</span>
                </Link>
                  )
                })()}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="shrink-0"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark whitespace-nowrap"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile / tablet menu button (when desktop nav is hidden) */}
          <motion.button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile / tablet Navigation - Animated (hidden on lg when desktop nav shows) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t"
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
                    {(() => {
                      const Icon = item.icon
                      const active = pathname === item.href
                      return (
                    <Link
                      href={item.href}
                      className={[
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                      ].join(' ')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 opacity-80" />
                      <span>{item.name}</span>
                    </Link>
                      )
                    })()}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <Link
                    href="/contact"
                    className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
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
