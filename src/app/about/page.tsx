'use client'

import { MapPin, Users, Home, Crown, UserCircle, Shield, Building2, Award, Globe, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AboutPage() {
  const [imageErrors, setImageErrors] = useState({
    governor: false,
    chairman: false,
    councilor: false,
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  const mainCommunity = {
    name: 'Ikoha Community',
    location: 'Ikoha (Central)',
    description: 'The main community and administrative center of Ikoha',
  }

  const satelliteCommunities = [
    {
      name: 'Three Brothers Camp',
      type: 'Satellite Community / Camp',
    },
    {
      name: 'Adebayo Camp',
      type: 'Satellite Community / Camp',
    },
    {
      name: 'Other surrounding camps and settlements',
      type: 'To be documented',
      note: 'Additional settlements are being documented',
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
              About Ikoha Community
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Located in Ovia South-West, Edo State, South South Nigeria
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Globe className="w-5 h-5" />
              <span className="text-lg">West Africa</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Ikoha Community Administration Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10 shadow-xl border-t-4 border-primary">
            <div className="flex items-center mb-8">
              <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Ikoha Community Administration</h2>
                <p className="text-gray-600 mt-1">Official administrative information</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-2">📍</span>
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border-l-4 border-primary transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Community</p>
                  <p className="text-xl font-bold text-gray-900">Ikoha</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-5 border-l-4 border-secondary transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">District / LGA</p>
                  <p className="text-xl font-bold text-gray-900">Ovia South-West Local Government Area</p>
                </div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-5 border-l-4 border-accent transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Area / Ward</p>
                  <p className="text-xl font-bold text-gray-900">Iguobazuwa</p>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border-l-4 border-primary transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">State</p>
                  <p className="text-xl font-bold text-gray-900">Edo State</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-5 border-l-4 border-secondary transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Country</p>
                  <p className="text-xl font-bold text-gray-900">Nigeria</p>
                </div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-5 border-l-4 border-accent transform hover:scale-105 transition-transform">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Region</p>
                  <p className="text-xl font-bold text-gray-900">South-South Nigeria, West Africa</p>
                </div>
              </div>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mt-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Interactive Map Coming Soon</p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Government & Political Representation Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10 shadow-xl border-t-4 border-accent">
            <div className="flex items-center mb-8">
              <div className="bg-accent bg-opacity-10 p-3 rounded-lg mr-4">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-accent">Government & Political Representation</h2>
                <p className="text-gray-600 mt-1">State and local government leadership</p>
              </div>
            </div>
            
            {/* State Level */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-accent" />
                State Level
              </h3>
              <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-2xl p-8 border-2 border-accent/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center overflow-hidden border-4 border-white shadow-xl ring-4 ring-accent/20">
                      {!imageErrors.governor ? (
                        <Image
                          src="/images/logo/governor.jpg"
                          alt="His Excellency, Sen Monday Okpebholo"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                          unoptimized
                          onError={() => setImageErrors(prev => ({ ...prev, governor: true }))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-sm text-center px-3">
                          <UserCircle className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                      Executive Governor
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      His Excellency, Sen Monday Okpebholo
                    </h4>
                    <p className="text-lg text-gray-700 mb-4 font-medium">
                      Executive Governor, Edo State
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Responsible for government policies, development programs, and state-level administration that affect Ikoha Community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Government Level */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-primary" />
                Local Government Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chairman */}
                <motion.div
                  className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border-2 border-primary/20 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center overflow-hidden border-4 border-white shadow-lg ring-4 ring-primary/20">
                        {!imageErrors.chairman ? (
                          <Image
                            src="/images/government/chairman-nosa-edobor.jpg"
                            alt="Nosa Edobor - Chairman"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                            unoptimized
                            onError={() => setImageErrors(prev => ({ ...prev, chairman: true }))}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <UserCircle className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      Chairman
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Nosa Edobor
                    </h4>
                    <p className="text-gray-600 font-medium">
                      Ovia South-West LGA
                    </p>
                  </div>
                </motion.div>

                {/* Councilor */}
                <motion.div
                  className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border-2 border-secondary/20 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center overflow-hidden border-4 border-white shadow-lg ring-4 ring-secondary/20">
                        {!imageErrors.councilor ? (
                          <Image
                            src="/images/logo/Councilor.jpg"
                            alt="Hon. Happy Omorriye Oghogho - Councilor"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                            unoptimized
                            onError={() => setImageErrors(prev => ({ ...prev, councilor: true }))}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <UserCircle className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      Councilor
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Hon. Happy Omorriye Oghogho
                    </h4>
                    <p className="text-gray-600 font-medium">
                      Ugboui Ward 8, Ovia South-West LGA
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Traditional Authority & Local Leadership Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10 shadow-xl border-t-4 border-primary">
            <div className="flex items-center mb-8">
              <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Traditional Authority & Local Leadership</h2>
                <p className="text-gray-600 mt-1">Community governance and cultural leadership</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Authority */}
              <motion.div
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-l-4 border-primary"
                data-aos="fade-right"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-primary bg-opacity-20 p-3 rounded-xl mr-4">
                    <Crown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Traditional Authority</h3>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-md">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Oba of Benin
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span>Holds overarching traditional authority over Ikoha Community</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span>Ikoha acknowledges the Oba as the supreme custodian of tradition and customs in the area</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              {/* Local Leadership */}
              <motion.div
                className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-6 border-l-4 border-secondary"
                data-aos="fade-left"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-secondary bg-opacity-20 p-3 rounded-xl mr-4">
                    <Shield className="w-8 h-8 text-secondary-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">👴 Local Leadership</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <UserCircle className="w-5 h-5 mr-2 text-secondary" />
                      Odionwere – Senior Elder
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start">
                        <span className="text-secondary mr-2 mt-1">•</span>
                        <span>Heads the local council of elders</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2 mt-1">•</span>
                        <span>Custodian of community customs and traditions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-secondary" />
                      Council of Elders
                    </h4>
                    <p className="text-gray-700 text-sm">Advisory and decision-making body</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-secondary" />
                      Youth Leader
                    </h4>
                    <p className="text-gray-700 text-sm">Represents and organizes youth activities</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.section>

        {/* Communities & Settlements Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-primary bg-opacity-10 p-3 rounded-lg mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Communities / Settlements Under Ikoha
            </h2>
            <p className="text-gray-600 text-lg">Community structure and organization</p>
          </div>

          {/* Main Community */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-primary">Main Community</h3>
            </div>
            <Card className="p-8 border-2 border-primary shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-primary to-primary-dark p-4 rounded-xl mr-6 shadow-md">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2 text-gray-900">{mainCommunity.name}</h4>
                  <p className="text-lg text-gray-700 font-medium mb-3">{mainCommunity.location}</p>
                  <p className="text-gray-600 leading-relaxed">{mainCommunity.description}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Satellite Communities */}
          <div>
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-secondary mr-3" />
              <h3 className="text-2xl font-bold text-secondary">
                Satellite Communities / Camps
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {satelliteCommunities.map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`p-6 h-full transition-all duration-300 ${
                      community.note 
                        ? 'border-2 border-gray-300 opacity-75 hover:opacity-100' 
                        : 'border-2 border-secondary hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-xl mr-4 ${
                        community.note 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-br from-secondary to-secondary-dark'
                      }`}>
                        <Home className={`w-6 h-6 ${
                          community.note 
                            ? 'text-gray-500' 
                            : 'text-white'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2 text-gray-900">{community.name}</h4>
                        <p className={`text-sm mb-2 ${
                          community.note 
                            ? 'text-gray-500 italic' 
                            : 'text-gray-600'
                        }`}>
                          {community.type}
                        </p>
                        {community.note && (
                          <p className="text-xs text-gray-500 mt-2 italic">
                            {community.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Community Overview Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-10 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center mb-6">
              <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Community Overview</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Ikoha Community is a thriving settlement in Ovia South-West, Edo State, Nigeria. 
                The community consists of the main Ikoha (Central) area and several satellite 
                communities and camps that form the larger Ikoha community structure.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                The community is rich in natural resources including agricultural products, 
                mineral resources, and water resources, making it an important region for 
                economic development and investment.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                As the community continues to grow and develop, additional settlements and 
                camps are being documented to provide a complete picture of the Ikoha 
                community structure.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
            <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">1</div>
            <div className="text-gray-600 font-medium">Main Community</div>
          </Card>
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-secondary">
            <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary-dark" />
            </div>
            <div className="text-4xl font-bold text-secondary mb-2">2+</div>
            <div className="text-gray-600 font-medium">Satellite Communities</div>
          </Card>
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-accent">
            <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-gray-600 font-medium">Residents</div>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
