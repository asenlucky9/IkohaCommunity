'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, TrendingUp, Building2, Users, Leaf, Waves, ArrowRight, Calendar, Phone, Mail } from 'lucide-react'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  const stats = [
    { label: 'Agricultural Resources', value: '6+', icon: TrendingUp, color: 'text-primary' },
    { label: 'Mineral Resources', value: '1+', icon: Building2, color: 'text-secondary' },
    { label: 'Water Resources', value: '1+', icon: Waves, color: 'text-accent' },
    { label: 'Residents', value: '500+', icon: Users, color: 'text-primary' },
  ]

  const featuredResources = [
    {
      name: 'Cocoa Farms',
      description: 'Rich cocoa plantations for chocolate production',
      category: 'Agricultural',
      icon: Leaf,
    },
    {
      name: 'Granite Stone',
      description: 'High-quality granite deposits for construction',
      category: 'Mineral',
      icon: Building2,
    },
    {
      name: 'Palm Oil',
      description: 'Palm trees for oil production and processing',
      category: 'Agricultural',
      icon: Leaf,
    },
  ]

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
      {/* Hero Section - Professional Full Background with Animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
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
          {/* Gradient Overlay for Professional Look */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </motion.div>
        
        {/* Content Overlay - Animated */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div 
            className="text-white space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-2xl leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Welcome to Ikoha Community
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
                Explore Resources
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white shadow-xl hover:shadow-2xl text-lg"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Animated */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats - Professional Cards with AOS */}
      <section className="py-16 bg-white -mt-1 relative z-20">
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
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-t-4 border-primary hover:scale-105">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 ${stat.color} mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Resources - Professional Grid with Animations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Natural & Mineral Resources
            </h2>
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
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className={`h-48 bg-gradient-to-br ${
                      resource.category === 'Agricultural' 
                        ? 'from-primary to-primary-dark' 
                        : 'from-secondary to-secondary-dark'
                    } flex items-center justify-center relative overflow-hidden`}>
                      <motion.div 
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      ></motion.div>
                      <Icon className="w-16 h-16 text-white relative z-10" />
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

      {/* Community Gallery - Displaying Both Images */}
      <section className="py-20 bg-gray-100">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-4 fw-bold mb-4 text-gray-900">
              Our Community
            </h2>
            <p className="lead text-gray-600 max-w-2xl mx-auto">
              Experience the vibrant life and beautiful landscapes of Ikoha Community
            </p>
          </motion.div>
          
          <div className="row g-4">
            <motion.div 
              className="col-md-6"
              data-aos="fade-right"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative overflow-hidden rounded-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{ minHeight: '500px' }}>
                <div 
                  className="w-100 h-100 position-absolute top-0 start-0"
                  style={{
                    backgroundImage: 'url(/images/logo/communitypicwithpeople.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    minHeight: '500px'
                  }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 z-10">
                  <h4 className="text-white fw-bold mb-1">Community Gathering</h4>
                  <p className="text-white-50 mb-0 small">Ikoha Community Members</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-6"
              data-aos="fade-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative overflow-hidden rounded-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{ minHeight: '500px' }}>
                <div 
                  className="w-100 h-100 position-absolute top-0 start-0"
                  style={{
                    backgroundImage: 'url(/images/logo/communitypicwithpeople1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    minHeight: '500px'
                  }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 z-10">
                  <h4 className="text-white fw-bold mb-1">Community Life</h4>
                  <p className="text-white-50 mb-0 small">Ikoha Community Activities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ikoha Community Administration Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-4 fw-bold mb-4 text-gray-900">
              Ikoha Community Administration
            </h2>
            <p className="lead text-gray-600 max-w-2xl mx-auto">
              Official administrative information and location details
            </p>
          </motion.div>
          
          <motion.div 
            className="row justify-content-center"
            data-aos="fade-up"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="col-lg-8">
              <Card className="p-5 shadow-lg">
                <div className="d-flex align-items-center mb-4">
                  <MapPin className="text-primary me-3" style={{ width: '32px', height: '32px' }} />
                  <h3 className="h3 fw-bold text-primary mb-0">Location</h3>
                </div>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="border-start border-primary border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">Community</p>
                      <p className="h5 mb-0 text-gray-900">Ikoha</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border-start border-secondary border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">District / LGA</p>
                      <p className="h5 mb-0 text-gray-900">Ovia South-West Local Government Area</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border-start border-accent border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">Area / Ward</p>
                      <p className="h5 mb-0 text-gray-900">Iguobazuwa</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border-start border-primary border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">State</p>
                      <p className="h5 mb-0 text-gray-900">Edo State</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border-start border-secondary border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">Country</p>
                      <p className="h5 mb-0 text-gray-900">Nigeria</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border-start border-accent border-3 ps-3 py-2">
                      <p className="text-muted small mb-1 fw-semibold text-uppercase">Region</p>
                      <p className="h5 mb-0 text-gray-900">South-South Nigeria, West Africa</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Overview - Professional Section with Bootstrap */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              data-aos="fade-right"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="display-4 fw-bold mb-4 text-gray-900">
                About Ikoha Community
              </h2>
              <p className="lead text-gray-700 mb-4">
                Located in Ovia South-West, Edo State, Ikoha Community is a vibrant settlement 
                rich in natural resources and cultural heritage. Our community consists of the 
                main Ikoha (Central) area and several satellite communities.
              </p>
              <p className="lead text-gray-700 mb-5">
                We are committed to sustainable development, preserving our traditions, and 
                fostering economic growth through our abundant agricultural and mineral resources.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link 
                  href="/about"
                  className="btn btn-primary btn-lg"
                >
                  Learn More About Us
                  <ArrowRight className="ms-2" style={{ width: '20px', height: '20px', display: 'inline' }} />
                </Link>
                <Link 
                  href="/contact"
                  className="btn btn-outline-primary btn-lg"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="col-lg-6 mt-5 mt-lg-0"
              data-aos="fade-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-4 p-5 text-white shadow-lg">
                <h3 className="h2 fw-bold mb-4">Quick Facts</h3>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <MapPin className="flex-shrink-0 mt-1" style={{ width: '24px', height: '24px' }} />
                    <div>
                      <p className="fw-semibold mb-1">Location</p>
                      <p className="text-white-50 mb-0">Ovia South-West, Edo State, Nigeria</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Users className="flex-shrink-0 mt-1" style={{ width: '24px', height: '24px' }} />
                    <div>
                      <p className="fw-semibold mb-1">Population</p>
                      <p className="text-white-50 mb-0">500+ Residents</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Calendar className="flex-shrink-0 mt-1" style={{ width: '24px', height: '24px' }} />
                    <div>
                      <p className="fw-semibold mb-1">Annual Festival</p>
                      <p className="text-white-50 mb-0">January 1st Celebration</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Professional Design with Animations */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary text-white position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/logo/communitypicwithpeople.png)',
            }}
            role="img"
            aria-hidden="true"
          ></div>
        </div>
        <motion.div 
          className="position-relative z-10 container text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-3 fw-bold mb-4">Invest in Ikoha's Future</h2>
          <p className="lead mb-5 text-white-75">
            Join us in building a sustainable and prosperous community through 
            partnerships and investments in our rich natural resources.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link 
              href="/contact" 
              className="btn btn-warning btn-lg px-5 py-3 shadow-lg"
            >
              <Phone className="me-2" style={{ width: '20px', height: '20px', display: 'inline' }} />
              Contact Us
            </Link>
            <Link 
              href="/minerals" 
              className="btn btn-outline-light btn-lg px-5 py-3"
            >
              View Opportunities
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
