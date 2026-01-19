'use client'

import Link from 'next/link'
import { Leaf, Gem, TreePine, Droplets, Wheat, TreeDeciduous, Waves, MapPin, ArrowRight, TrendingUp, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MineralsPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  const agriculturalResources = [
    { 
      name: 'Cocoa Farms', 
      icon: Leaf, 
      description: 'Rich cocoa plantations for chocolate production',
      color: 'primary',
      benefits: ['High quality cocoa beans', 'Export potential', 'Sustainable farming']
    },
    { 
      name: 'Plantain Farms', 
      icon: Wheat, 
      description: 'Abundant plantain cultivation',
      color: 'primary',
      benefits: ['Food security', 'Local market supply', 'Year-round production']
    },
    { 
      name: 'Palm Trees', 
      icon: TreePine, 
      description: 'Palm oil production facilities',
      color: 'primary',
      benefits: ['Palm oil extraction', 'Multiple uses', 'Economic value']
    },
    { 
      name: 'Coconut Trees', 
      icon: Droplets, 
      description: 'Coconut farming and processing',
      color: 'primary',
      benefits: ['Coconut oil', 'Coconut water', 'Copra production']
    },
    { 
      name: 'Pineapple Farms', 
      icon: Leaf, 
      description: 'Tropical pineapple cultivation',
      color: 'primary',
      benefits: ['Fresh fruit', 'Juice production', 'Export quality']
    },
    { 
      name: 'Timber Trees', 
      icon: TreeDeciduous, 
      description: 'Hardwood & softwood timber resources',
      color: 'primary',
      benefits: ['Construction materials', 'Furniture making', 'Sustainable forestry']
    },
  ]

  const solidMinerals = [
    { 
      name: 'Granite Stone', 
      icon: Gem, 
      description: 'High-quality granite deposits for construction',
      color: 'secondary',
      benefits: ['Construction industry', 'High durability', 'Market demand']
    },
  ]

  const waterResources = [
    { 
      name: 'Natural River', 
      icon: Waves, 
      description: 'Supports fishing, irrigation, and local activities',
      color: 'accent',
      benefits: ['Fishing activities', 'Irrigation systems', 'Water supply']
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(/images/logo/communitypicwithpeople.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
              Ikoha Community Natural & Mineral Resources
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Discover the rich natural and mineral resources that make Ikoha Community 
              a valuable region in Ovia South-West, Edo State, Nigeria.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Ovia South-West, Edo State, Nigeria</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary hover:scale-105">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">6+</div>
              <div className="text-gray-600 font-medium">Agricultural Resources</div>
            </Card>
            <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-secondary hover:scale-105">
              <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-secondary-dark" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">1+</div>
              <div className="text-gray-600 font-medium">Solid Mineral Resources</div>
            </Card>
            <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-accent hover:scale-105">
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">1+</div>
              <div className="text-gray-600 font-medium">Water Resources</div>
            </Card>
          </div>
        </motion.section>

        {/* Agricultural Resources Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-primary bg-opacity-10 p-3 rounded-lg mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Agricultural Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rich agricultural products that contribute to food security and economic development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agriculturalResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-primary group">
                    <div className="h-48 bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <Icon className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Agricultural
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{resource.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                        <ul className="space-y-1">
                          {resource.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="text-primary mr-2 mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Solid Mineral Resources Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary bg-opacity-10 p-3 rounded-lg mb-4">
              <Gem className="w-8 h-8 text-secondary-dark" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
              Solid Mineral Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Valuable mineral deposits for construction and industrial use
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solidMinerals.map((mineral, index) => {
              const Icon = mineral.icon
              return (
                <motion.div
                  key={mineral.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary group">
                    <div className="h-48 bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <Icon className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Mineral
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{mineral.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{mineral.description}</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                        <ul className="space-y-1">
                          {mineral.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="text-secondary mr-2 mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Water Resources Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 p-3 rounded-lg mb-4">
              <Waves className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
              Water Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Natural water sources supporting community activities and livelihoods
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {waterResources.map((water, index) => {
              const Icon = water.icon
              return (
                <motion.div
                  key={water.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-accent group">
                    <div className="h-48 bg-gradient-to-br from-accent via-accent-light to-accent-dark flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <Icon className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Water
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{water.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{water.description}</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                        <ul className="space-y-1">
                          {water.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="text-accent mr-2 mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Investment Opportunities Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10 shadow-xl bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-t-4 border-primary">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary bg-opacity-10 p-3 rounded-lg mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Investment Opportunities
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore partnership and investment opportunities in Ikoha's natural resources
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-primary mb-2">6+</div>
                <div className="text-gray-600">Agricultural Products</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-secondary mb-2">1+</div>
                <div className="text-gray-600">Mineral Deposits</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-accent mb-2">1+</div>
                <div className="text-gray-600">Water Sources</div>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
              >
                Contact Us for Investment Opportunities
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-2xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Our Resources?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Contact us to learn more about investment opportunities, partnerships, and how you can contribute to Ikoha's development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white text-lg"
              >
                Learn More About Ikoha
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
