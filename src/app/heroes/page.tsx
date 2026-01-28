'use client'

import { useState } from 'react'
import { Crown, Award, Shield, Users, Calendar, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Hero type definition
interface Hero {
  id: string
  name: string
  title: string
  imageUrl?: string
  reignStart?: string
  reignEnd?: string
  currentReign?: boolean
  achievements: string[]
  description: string
  category: 'traditional' | 'political' | 'community' | 'historical'
  location?: string
}

// Sample heroes data (replace with database fetch later)
const heroes: Hero[] = [
  {
    id: '1',
    name: 'Oba of Benin',
    title: 'Supreme Traditional Authority',
    imageUrl: '/images/logo/obaofbenin.jpg',
    currentReign: true,
    achievements: [
      'Supreme custodian of tradition and customs',
      'Overarching traditional authority over Ikoha Community',
      'Preserves cultural heritage and customs',
      'Guides traditional governance',
    ],
    description: 'The Oba of Benin holds the highest traditional authority over Ikoha Community, serving as the supreme custodian of tradition, customs, and cultural heritage.',
    category: 'traditional',
    location: 'Benin Kingdom',
  },
  {
    id: '2',
    name: 'His Excellency Godwin Obaseki',
    title: 'Executive Governor',
    imageUrl: '/images/logo/governor.jpg',
    reignStart: '2016',
    currentReign: true,
    achievements: [
      'State-level governance and development',
      'Infrastructure development initiatives',
      'Educational advancement programs',
      'Healthcare system improvements',
    ],
    description: 'Executive Governor of Edo State, providing state-level leadership and development initiatives that benefit Ikoha Community and the entire state.',
    category: 'political',
    location: 'Edo State',
  },
  {
    id: '3',
    name: 'Nosa Edobor',
    title: 'Chairman, Ovia South-West LGA',
    imageUrl: '/images/logo/chirman.jpeg',
    currentReign: true,
    achievements: [
      'Local government administration',
      'Community development projects',
      'Grassroots governance',
      'Public service delivery',
    ],
    description: 'Chairman of Ovia South-West Local Government Area, overseeing local administration and development initiatives for Ikoha Community.',
    category: 'political',
    location: 'Ovia South-West LGA',
  },
  {
    id: '4',
    name: 'Hon. Happy Omorriye Oghogho',
    title: 'Councilor',
    imageUrl: '/images/logo/Councilor.jpg',
    currentReign: true,
    achievements: [
      'Ward-level representation',
      'Community advocacy',
      'Local development projects',
      'Constituency service',
    ],
    description: 'Councilor representing Ugboui Ward 8, Ovia South-West LGA, serving as the direct link between Ikoha Community and local government.',
    category: 'political',
    location: 'Ugboui Ward 8, Ovia South-West LGA',
  },
  {
    id: '5',
    name: 'Odionwere',
    title: 'Senior Elder & Community Leader',
    currentReign: true,
    achievements: [
      'Heads the council of elders',
      'Custodian of community customs and traditions',
      'Mediates community disputes',
      'Preserves oral history and traditions',
    ],
    description: 'The Odionwere (Senior Elder) is the traditional head of the local council of elders, serving as the custodian of community customs, traditions, and cultural practices.',
    category: 'traditional',
    location: 'Ikoha Community',
  },
  {
    id: '6',
    name: 'Council of Elders',
    title: 'Traditional Advisory Body',
    achievements: [
      'Advisory and decision-making body',
      'Preserves community traditions',
      'Guides community development',
      'Maintains cultural continuity',
    ],
    description: 'The Council of Elders serves as the traditional advisory and decision-making body, providing wisdom and guidance for community governance and development.',
    category: 'community',
    location: 'Ikoha Community',
  },
]

const categories = [
  { id: 'all', label: 'All Heroes', icon: Star },
  { id: 'traditional', label: 'Traditional', icon: Crown },
  { id: 'political', label: 'Political', icon: Shield },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'historical', label: 'Historical', icon: Award },
]

export default function HeroesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedHero, setExpandedHero] = useState<string | null>(null)

  const filteredHeroes = selectedCategory === 'all'
    ? heroes
    : heroes.filter(hero => hero.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      traditional: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      political: 'bg-primary/10 text-primary border-primary/20',
      community: 'bg-accent/10 text-accent border-accent/20',
      historical: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[category] || colors.community
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof Crown> = {
      traditional: Crown,
      political: Shield,
      community: Users,
      historical: Award,
    }
    return icons[category] || Users
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Ikoha Community Heroes"
        description="Celebrating the great leaders, heroes, and champions who have shaped and continue to guide Ikoha Community through their leadership, wisdom, and dedication."
        icon={<Crown className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Heroes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHeroes.map((hero) => {
            const CategoryIcon = getCategoryIcon(hero.category)
            const isExpanded = expandedHero === hero.id

            return (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-6 sm:p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(hero.category)}`}>
                      <CategoryIcon className="w-3 h-3" />
                      {hero.category.charAt(0).toUpperCase() + hero.category.slice(1)}
                    </span>
                  </div>

                  {/* Hero Image */}
                  {hero.imageUrl && (
                    <div className="mb-6 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8">
                      <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                        <Image
                          src={hero.imageUrl}
                          alt={hero.name}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                        {hero.currentReign && (
                          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Current
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hero Name & Title */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {hero.name}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-primary mb-2">
                      {hero.title}
                    </p>
                    {hero.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{hero.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Reign Period */}
                  {(hero.reignStart || hero.reignEnd) && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {hero.reignStart}
                        {hero.reignEnd ? ` - ${hero.reignEnd}` : hero.currentReign ? ' - Present' : ''}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow line-clamp-3">
                    {hero.description}
                  </p>

                  {/* Achievements */}
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      onClick={() => setExpandedHero(isExpanded ? null : hero.id)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Achievements ({hero.achievements.length})
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {hero.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <Star className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredHeroes.length === 0 && (
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No heroes found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Honoring Our Heroes</h2>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            These leaders have dedicated their lives to serving Ikoha Community. Their legacy continues to inspire and guide us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Learn More About Ikoha
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
