'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  Info,
  Crown,
  MessageSquare,
  Gem,
  Construction,
  Store,
  Newspaper,
  Camera,
  Mail,
  ChevronDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Primary navigation - always visible
  const primaryNav = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'News', href: '/news', icon: Newspaper },
  ]

  // Community section
  const communityNav = [
    { name: 'Forum', href: '/forum', icon: MessageSquare },
    { name: 'Gallery', href: '/gallery', icon: Camera },
    { name: 'Heroes', href: '/heroes', icon: Crown },
  ]

  // Resources section
  const resourcesNav = [
    { name: 'Minerals', href: '/minerals', icon: Gem },
    { name: 'Projects', href: '/projects', icon: Construction },
    { name: 'Businesses', href: '/businesses', icon: Store },
  ]

  // All navigation items for mobile
  const allNavigation = [...primaryNav, ...communityNav, ...resourcesNav, { name: 'Contact', href: '/contact', icon: Mail }]

  const NavLink = ({ item, active, onClick }: { item: typeof primaryNav[0], active: boolean, onClick?: () => void }) => {
    const Icon = item.icon
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={[
          'group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-out whitespace-nowrap',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
        ].join(' ')}
      >
        <Icon className="h-4 w-4 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>{item.name}</span>
      </Link>
    )
  }

  const DropdownMenu = ({ label, items, icon: Icon }: { label: string, items: typeof communityNav, icon: any }) => {
    const isOpen = openDropdown === label
    const hasActiveItem = items.some(item => pathname === item.href)

    return (
      <div className="relative" onMouseLeave={() => setOpenDropdown(null)}>
        <button
          onMouseEnter={() => setOpenDropdown(label)}
          className={[
            'group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-out whitespace-nowrap',
            hasActiveItem || isOpen
              ? 'bg-primary/10 text-primary'
              : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
          ].join(' ')}
        >
          <Icon className="h-4 w-4 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span>{label}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              onMouseEnter={() => setOpenDropdown(label)}
            >
              {items.map((item) => {
                const ItemIcon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={[
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                      active
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                    ].join(' ')}
                  >
                    <ItemIcon className="h-4 w-4 opacity-70" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.header 
      className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      initial={{ y: -16, opacity: 0.95 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-4 sm:gap-5">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center shadow-md ring-1 ring-gray-200/70 overflow-hidden">
                <img
                  src="/images/logo/logoikoha.png"
                  alt="Ikoha Community Logo"
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight tracking-tight">
                  <span className="tracking-tighter">Ikoha</span>{' '}
                  <span className="font-semibold">Community</span>{' '}
                  <span className="font-bold">Development</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 font-semibold tracking-wide">
                  Ovia South-West · Edo State · Nigeria
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 font-medium tracking-wide">
                  Agriculture · Minerals · Projects · Community Updates
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Primary Navigation */}
            {primaryNav.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                active={pathname === item.href}
              />
            ))}

            {/* Community Dropdown */}
            <DropdownMenu label="Community" items={communityNav} icon={MessageSquare} />

            {/* Resources Dropdown */}
            <DropdownMenu label="Resources" items={resourcesNav} icon={Gem} />

            {/* Contact Button */}
            <Link
              href="/contact"
              className={[
                'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-out whitespace-nowrap ml-2',
                pathname === '/contact'
                  ? 'bg-primary text-white'
                  : 'bg-primary text-white hover:bg-primary-dark',
              ].join(' ')}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200 ease-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.96 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-100 bg-gray-50/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="py-4 space-y-1">
                {/* Primary Section */}
                <div className="px-3 mb-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Main
                  </div>
                  <div className="space-y-1">
                    {primaryNav.map((item) => (
                      <NavLink
                        key={item.name}
                        item={item}
                        active={pathname === item.href}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Community Section */}
                <div className="px-3 mb-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Community
                  </div>
                  <div className="space-y-1">
                    {communityNav.map((item) => (
                      <NavLink
                        key={item.name}
                        item={item}
                        active={pathname === item.href}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Resources Section */}
                <div className="px-3 mb-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Resources
                  </div>
                  <div className="space-y-1">
                    {resourcesNav.map((item) => (
                      <NavLink
                        key={item.name}
                        item={item}
                        active={pathname === item.href}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="px-3 pt-2 border-t border-gray-200">
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out',
                      pathname === '/contact'
                        ? 'bg-primary text-white'
                        : 'bg-primary text-white hover:bg-primary-dark',
                    ].join(' ')}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
