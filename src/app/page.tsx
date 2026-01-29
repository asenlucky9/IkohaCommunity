'use client'

import Link from 'next/link'
import { MapPin, TrendingUp, Building2, Users, Leaf, Waves, ArrowRight, Calendar, Phone, Star, Quote, Sparkles, Heart, Trophy, Zap, Camera, PartyPopper, Megaphone, Newspaper, MessageSquare, Briefcase, FolderOpen, Mail, MessageCircle, Send } from 'lucide-react'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import type { NewsArticle } from '@/app/api/news/route'

export default function Home() {
  const [counters, setCounters] = useState({
    resources: 0,
    minerals: 0,
    residents: 0,
    events: 0,
  })

  const [latestNews, setLatestNews] = useState<NewsArticle[]>([])
  const [latestAnnouncements, setLatestAnnouncements] = useState<NewsArticle[]>([])
  const [updatesLoading, setUpdatesLoading] = useState(true)
  const [updatesError, setUpdatesError] = useState<string | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })

    // Animated counters
    const animateCounters = () => {
      const targets = { resources: 6, minerals: 1, residents: 500, events: 12 }
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setCounters({
          resources: Math.floor(targets.resources * progress),
          minerals: Math.floor(targets.minerals * progress),
          residents: Math.floor(targets.residents * progress),
          events: Math.floor(targets.events * progress),
        })
        if (step >= steps) clearInterval(timer)
      }, interval)
    }

    const timer = setTimeout(animateCounters, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setUpdatesLoading(true)
        setUpdatesError(null)

        const [newsRes, announcementsRes] = await Promise.all([
          fetch('/api/news?limit=3'),
          fetch('/api/news?category=announcements&limit=2'),
        ])

        if (!newsRes.ok) throw new Error('Failed to load latest news')
        if (!announcementsRes.ok) throw new Error('Failed to load announcements')

        const newsData = await newsRes.json()
        const announcementsData = await announcementsRes.json()

        setLatestNews(Array.isArray(newsData?.articles) ? newsData.articles : [])
        setLatestAnnouncements(Array.isArray(announcementsData?.articles) ? announcementsData.articles : [])
      } catch (err) {
        setUpdatesError(err instanceof Error ? err.message : 'Failed to load updates')
      } finally {
        setUpdatesLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  const stats = [
    { label: 'Agricultural Resources', value: `${counters.resources}+`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Mineral Resources', value: `${counters.minerals}+`, icon: Building2, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Water Resources', value: '1+', icon: Waves, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Residents', value: `${counters.residents}+`, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  ]

  const featuredResources = [
    {
      name: 'Cocoa Farms',
      description: 'Rich cocoa plantations for chocolate production',
      category: 'Agricultural',
      icon: Leaf,
      image: '/images/logo/communitypicwithpeople.png',
    },
    {
      name: 'Granite Stone',
      description: 'High-quality granite deposits for construction',
      category: 'Mineral',
      icon: Building2,
      image: '/images/logo/communitypicwithpeople1.png',
    },
    {
      name: 'Palm Oil',
      description: 'Palm trees for oil production and processing',
      category: 'Agricultural',
      icon: Leaf,
      image: '/images/logo/communitypicwithpeople.png',
    },
  ]

  const upcomingEvents = [
    {
      title: 'Ikoha Annual Festival 2025',
      date: 'January 1, 2025',
      type: 'Festival',
      image: '/images/logo/communitypicwithpeople.png',
    },
    {
      title: 'Community Development Meeting',
      date: 'January 15, 2025',
      type: 'Meeting',
      image: '/images/logo/communitypicwithpeople1.png',
    },
  ]

  const testimonials = [
    {
      quote: 'Ikoha Community is a place of unity, culture, and progress. Proud to call it home!',
      author: 'Community Member',
      role: 'Resident',
    },
    {
      quote: 'The annual festival brings us all together. It\'s a celebration of our rich heritage.',
      author: 'Festival Attendee',
      role: 'Visitor',
    },
    {
      quote: 'The community\'s commitment to development is inspiring. Great things are happening here!',
      author: 'Local Business Owner',
      role: 'Entrepreneur',
    },
  ]

  const funFacts = [
    { icon: Calendar, text: 'Annual Festival celebrated every January 1st', color: 'text-secondary' },
    { icon: Trophy, text: 'Rich in agricultural and mineral resources', color: 'text-primary' },
    { icon: Heart, text: 'Strong community spirit and unity', color: 'text-accent' },
    { icon: Sparkles, text: 'Growing population and development', color: 'text-secondary' },
  ]

  const quickLinks = [
    {
      title: 'News & Announcements',
      description: 'Latest community updates and official notices.',
      href: '/news',
      icon: Newspaper,
      accent: 'from-primary to-primary-dark',
    },
    {
      title: 'Events Calendar',
      description: 'View upcoming meetings, festivals, and programs.',
      href: '/news?category=events',
      icon: Calendar,
      accent: 'from-secondary to-secondary-dark',
    },
    {
      title: 'Projects',
      description: 'Track community development projects and progress.',
      href: '/projects',
      icon: FolderOpen,
      accent: 'from-accent to-accent/80',
    },
    {
      title: 'Forum',
      description: 'Discuss and connect with community members.',
      href: '/forum',
      icon: MessageSquare,
      accent: 'from-primary-dark to-primary',
    },
    {
      title: 'Businesses',
      description: 'Explore local businesses and opportunities.',
      href: '/businesses',
      icon: Briefcase,
      accent: 'from-secondary-dark to-secondary',
    },
    {
      title: 'Contact Community',
      description: 'Send feedback, suggestions, or community news.',
      href: '/contact',
      icon: Phone,
      accent: 'from-gray-800 to-gray-700',
    },
  ]

  const formatDateShort = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Community contact (same as banner; WhatsApp number from env)
  const communityEmail = 'asenlucky9@gmail.com'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = whatsappNumber.trim()
    ? `https://wa.me/${String(whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent('Hello, I would like to reach Ikoha Community Development.')}`
    : null

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with More Entertainment */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/logo/communitypicwithpeople.png)',
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          role="img"
          aria-label="Ikoha Community background"
        >
          {/* Animated Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
            animate={{
              background: [
                'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                'linear-gradient(to bottom, rgba(45,80,22,0.6), rgba(0,0,0,0.5), rgba(212,175,55,0.4))',
                'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Content Overlay - Enhanced */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div 
            className="text-white space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold">Welcome to Our Community</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-2xl leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Welcome to{' '}
                <span className="bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
                  Ikoha Community
                </span>
              </motion.h1>
              <motion.div 
                className="flex items-center justify-center gap-2 text-xl md:text-2xl font-medium mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <MapPin className="w-6 h-6" />
                <span>Ovia South-West, Edo State, Nigeria</span>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              A thriving community rich in natural and mineral resources, committed to 
              sustainable development and community engagement in the heart of Edo State.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link 
                href="/minerals" 
                className="group bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                Explore Resources
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/news?category=events" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white shadow-xl hover:shadow-2xl text-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll to explore - clickable, smooth scrolls to content */}
        <motion.a
          href="#explore"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg px-3 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
          aria-label="Scroll down to explore content"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.a>
      </section>

      {/* Quick Stats - Enhanced with Animations */}
      <section id="explore" className="py-16 bg-white -mt-1 relative z-20 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-t-4 border-primary group cursor-pointer">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <motion.div 
                      className={`text-4xl font-bold ${stat.color} mb-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Reach the community - quick contact strip */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-gray-700">Reach the community:</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium shadow-md hover:shadow-lg transition-all"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              )}
              <a
                href={`mailto:${communityEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-medium shadow-md hover:shadow-lg transition-all"
                aria-label="Email community"
              >
                <Mail className="w-5 h-5" />
                Email us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
                Contact form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Updates + Quick Links (Professional / Useful) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Megaphone className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Community Updates</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Official announcements, latest news, and quick access to important community pages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Announcements */}
            <Card className="p-6 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-gray-900">Announcements</h3>
                </div>
                <Link href="/news?category=announcements" className="text-sm font-semibold text-primary hover:text-primary-dark">
                  View all
                </Link>
              </div>

              {updatesLoading ? (
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : updatesError ? (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  {updatesError}
                </div>
              ) : latestAnnouncements.length === 0 ? (
                <p className="text-sm text-gray-600">No announcements yet.</p>
              ) : (
                <div className="space-y-3">
                  {latestAnnouncements.map((a) => (
                    <Link
                      key={a.id}
                      href={`/news/${a.slug}`}
                      className="block rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">{a.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{a.excerpt}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDateShort(a.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Latest news */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-gray-900">Latest News</h3>
                </div>
                <Link href="/news" className="text-sm font-semibold text-primary hover:text-primary-dark">
                  Read more
                </Link>
              </div>

              {updatesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-28 rounded-lg bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : updatesError ? (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  {updatesError}
                </div>
              ) : latestNews.length === 0 ? (
                <p className="text-sm text-gray-600">No news posts yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {latestNews.map((n) => (
                    <Link
                      key={n.id}
                      href={`/news/${n.slug}`}
                      className="block rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {n.category}
                        </span>
                        <span className="text-xs text-gray-500">{formatDateShort(n.publishedAt)}</span>
                      </div>
                      <h4 className="mt-3 font-bold text-gray-900">{n.title}</h4>
                      <p className="mt-2 text-sm text-gray-600">{n.excerpt}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.title} href={item.href} className="group">
                  <Card className="p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Have news or feedback? - community callout */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Have community news or feedback?</h3>
                    <p className="text-gray-600 mt-1">
                      Send us announcements, report an issue, or share a suggestion. We want to hear from you.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${communityEmail}?subject=Community news or feedback`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition-colors"
                  >
                    Contact form
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <PartyPopper className="w-8 h-8 text-secondary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for exciting community celebrations and gatherings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-secondary text-white rounded-full text-xs font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/90 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link
                      href="/news?category=events"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold group/link"
                    >
                      View Event Details
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/news?category=events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              View All Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Our Natural & Mineral Resources
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the rich resources that make Ikoha Community a valuable region
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className={`h-48 bg-gradient-to-br ${
                      resource.category === 'Agricultural' 
                        ? 'from-primary to-primary-dark' 
                        : 'from-secondary to-secondary-dark'
                    } flex items-center justify-center relative overflow-hidden`}>
                      <motion.div 
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      />
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Icon className="w-16 h-16 text-white relative z-10" />
                      </motion.div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {resource.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{resource.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                      <Link
                        href="/minerals"
                        className="inline-flex items-center text-primary hover:text-primary-dark font-semibold group/link"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/minerals"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View All Resources
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Quote className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                What People Say
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community members and visitors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 h-full flex flex-col hover:shadow-xl transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-gray-700 mb-6 flex-grow italic">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section - NEW */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-secondary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Did You Know?
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funFacts.map((fact, index) => {
              const Icon = fact.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer group">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 group-hover:bg-secondary/10 transition-colors"
                    >
                      <Icon className={`w-8 h-8 ${fact.color}`} />
                    </motion.div>
                    <p className="text-gray-700 font-medium">{fact.text}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Gallery - Enhanced */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Our Community Life
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the vibrant life and beautiful landscapes of Ikoha Community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { title: 'Community Gathering', desc: 'Ikoha Community Members', img: 'communitypicwithpeople.png' },
              { title: 'Community Life', desc: 'Ikoha Community Activities', img: 'communitypicwithpeople1.png' },
              { title: 'Community Spirit', desc: 'Ikoha Residents', img: 'communitypicwithpeople.png' },
              { title: 'Life in Ikoha', desc: 'Community Moments', img: 'communitypicwithpeople1.png' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden p-0 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg min-h-[320px] md:min-h-[400px]">
                    <motion.div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(/images/logo/${item.img})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <h4 className="text-white font-bold mb-1 text-xl">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 p-2 rounded-full">
                        <Camera className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ikoha Community Administration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Ikoha Community Administration
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Official administrative information and location details
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            data-aos="fade-up"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-3xl space-y-8">
              <Card className="p-5 shadow-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="text-primary mr-3 w-8 h-8 flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-primary">Location</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-primary pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">Community</p>
                    <p className="text-lg font-medium text-gray-900">Ikoha</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">District / LGA</p>
                    <p className="text-lg font-medium text-gray-900">Ovia South-West Local Government Area</p>
                  </div>
                  <div className="border-l-4 border-accent pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">Area / Ward</p>
                    <p className="text-lg font-medium text-gray-900">Iguobazuwa</p>
                  </div>
                  <div className="border-l-4 border-primary pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">State</p>
                    <p className="text-lg font-medium text-gray-900">Edo State</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">Country</p>
                    <p className="text-lg font-medium text-gray-900">Nigeria</p>
                  </div>
                  <div className="border-l-4 border-accent pl-3 py-2">
                    <p className="text-gray-500 text-sm mb-1 font-semibold uppercase">Region</p>
                    <p className="text-lg font-medium text-gray-900">South-South Nigeria, West Africa</p>
                  </div>
                </div>
              </Card>

              {/* Key contacts - useful for residents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-5 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Phone className="text-secondary mr-3 w-8 h-8 flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900">Key contacts</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    For official inquiries, community matters, or to share news, use the options below.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`mailto:${communityEmail}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p className="text-sm text-gray-600 truncate">{communityEmail}</p>
                      </div>
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-colors"
                    >
                      <Send className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Contact form</p>
                        <p className="text-sm text-gray-600">Send a message online</p>
                      </div>
                    </Link>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-colors sm:col-span-2"
                      >
                        <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">WhatsApp</p>
                          <p className="text-sm text-gray-600">Chat with the community</p>
                        </div>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div 
              data-aos="fade-right"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                About Ikoha Community
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Located in Ovia South-West, Edo State, Ikoha Community is a vibrant settlement 
                rich in natural resources and cultural heritage. Our community consists of the 
                main Ikoha (Central) area and several satellite communities.
              </p>
              <p className="text-xl text-gray-700 mb-6">
                We are committed to sustainable development, preserving our traditions, and 
                fostering economic growth through our abundant agricultural and mineral resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/about"
                  className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-primary hover:bg-primary-dark text-white transition-colors"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="mt-8 lg:mt-0"
              data-aos="fade-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="flex-shrink-0 mt-1 w-6 h-6 text-white/80" />
                    <div>
                      <p className="font-semibold mb-1">Location</p>
                      <p className="text-white/70">Ovia South-West, Edo State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="flex-shrink-0 mt-1 w-6 h-6 text-white/80" />
                    <div>
                      <p className="font-semibold mb-1">Population</p>
                      <p className="text-white/70">500+ Residents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="flex-shrink-0 mt-1 w-6 h-6 text-white/80" />
                    <div>
                      <p className="font-semibold mb-1">Annual Festival</p>
                      <p className="text-white/70">January 1st Celebration</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/logo/communitypicwithpeople.png)' }}
          role="img"
          aria-hidden="true"
        />
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-secondary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Invest in Ikoha's Future</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join us in building a sustainable and prosperous community through 
            partnerships and investments in our rich natural resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-secondary hover:bg-secondary-dark text-white shadow-lg transition-all hover:scale-105"
            >
              <Phone className="mr-2 w-5 h-5" />
              Contact Us
            </Link>
            <Link 
              href="/minerals" 
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 border-2 border-white/60 text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              <Zap className="mr-2 w-5 h-5" />
              View Opportunities
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
