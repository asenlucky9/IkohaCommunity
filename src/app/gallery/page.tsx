'use client'

import { useState } from 'react'
import { Image as ImageIcon, Camera, Calendar, MapPin, Filter, Grid, List, Download, Share2, X } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface GalleryPhoto {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: 'events' | 'community' | 'projects' | 'nature' | 'people' | 'other'
  eventId?: string
  eventName?: string
  photographer?: string
  dateTaken: string
  location?: string
}

// Sample gallery photos (replace with API fetch)
const samplePhotos: GalleryPhoto[] = [
  {
    id: '1',
    title: 'Ikoha Annual Festival 2024',
    description: 'Community members celebrating during the annual festival',
    imageUrl: '/images/logo/communitypicwithpeople.png',
    category: 'events',
    eventId: '1',
    eventName: 'Ikoha Annual Festival 2024',
    photographer: 'Community Photographer',
    dateTaken: '2024-01-01',
    location: 'Ikoha Community',
  },
  {
    id: '2',
    title: 'Community Gathering',
    description: 'Community members gathered for a meeting',
    imageUrl: '/images/logo/communitypicwithpeople1.png',
    category: 'community',
    photographer: 'Community Photographer',
    dateTaken: '2024-11-15',
    location: 'Ikoha Community',
  },
  {
    id: '3',
    title: 'Road Construction Project',
    description: 'Progress on the new road construction project',
    imageUrl: '/images/logo/communitypicwithpeople.png',
    category: 'projects',
    photographer: 'Project Team',
    dateTaken: '2024-12-10',
    location: 'Ikoha Community',
  },
  {
    id: '4',
    title: 'Agricultural Workshop',
    description: 'Participants learning modern farming techniques',
    imageUrl: '/images/logo/communitypicwithpeople1.png',
    category: 'events',
    eventId: '3',
    eventName: 'Agricultural Workshop',
    photographer: 'Workshop Organizer',
    dateTaken: '2024-11-20',
    location: 'Agricultural Center',
  },
  {
    id: '5',
    title: 'Community Leaders',
    description: 'Community leaders at a meeting',
    imageUrl: '/images/logo/communitypicwithpeople.png',
    category: 'people',
    photographer: 'Community Photographer',
    dateTaken: '2024-12-05',
    location: 'Community Hall',
  },
  {
    id: '6',
    title: 'Natural Landscape',
    description: 'Beautiful natural landscape of Ikoha',
    imageUrl: '/images/logo/communitypicwithpeople1.png',
    category: 'nature',
    photographer: 'Community Photographer',
    dateTaken: '2024-10-15',
    location: 'Ikoha Community',
  },
]

const categories = [
  { id: 'all', label: 'All Photos', icon: Grid },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'community', label: 'Community', icon: ImageIcon },
  { id: 'projects', label: 'Projects', icon: Camera },
  { id: 'nature', label: 'Nature', icon: ImageIcon },
  { id: 'people', label: 'People', icon: ImageIcon },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)
  const [showLightbox, setShowLightbox] = useState(false)

  const filteredPhotos = selectedCategory === 'all'
    ? samplePhotos
    : samplePhotos.filter(photo => photo.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      events: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      community: 'bg-primary/10 text-primary border-primary/20',
      projects: 'bg-accent/10 text-accent border-accent/20',
      nature: 'bg-green-100 text-green-700 border-green-200',
      people: 'bg-purple-100 text-purple-700 border-purple-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[category] || colors.other
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo)
    setShowLightbox(true)
  }

  const handleDownload = (photo: GalleryPhoto) => {
    // Simulate download
    const link = document.createElement('a')
    link.href = photo.imageUrl
    link.download = `${photo.title}.jpg`
    link.click()
  }

  const handleShare = async (photo: GalleryPhoto) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description || '',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Photo Gallery"
        description="Explore photos from community events, projects, and daily life in Ikoha Community."
        icon={<Camera className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Category Filter & View Toggle */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                aria-label="Switch to grid view"
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                aria-label="Switch to masonry view"
                title="Masonry view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'}>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' ? '' : 'break-inside-avoid mb-4'}
              >
                <Card className="p-0 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div
                    className="relative aspect-square overflow-hidden bg-gray-200"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(photo)
                          }}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-gray-900" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(photo)
                          }}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-5 h-5 text-gray-900" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getCategoryColor(photo.category)}`}>
                        {photo.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(photo.dateTaken)}</span>
                      {photo.photographer && (
                        <span>By {photo.photographer}</span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </Card>
        )}

        {/* Photo Upload CTA */}
        <div className="mt-12 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Share Your Photos</h2>
          <p className="text-lg mb-6 text-white/90">
            Have photos from community events or activities? Share them with the community!
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            <Camera className="w-5 h-5" />
            Upload Photos
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl w-full"
            >
              <div className="relative">
                <button
                  onClick={() => setShowLightbox(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  aria-label="Close photo lightbox"
                  title="Close"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="relative w-full h-[70vh] bg-black">
                    <Image
                      src={selectedPhoto.imageUrl}
                      alt={selectedPhoto.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h3>
                        {selectedPhoto.description && (
                          <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(selectedPhoto)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleShare(selectedPhoto)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      {selectedPhoto.dateTaken && (
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Date</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(selectedPhoto.dateTaken)}
                          </div>
                        </div>
                      )}
                      {selectedPhoto.location && (
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Location</div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {selectedPhoto.location}
                          </div>
                        </div>
                      )}
                      {selectedPhoto.photographer && (
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Photographer</div>
                          <div>{selectedPhoto.photographer}</div>
                        </div>
                      )}
                      {selectedPhoto.eventName && (
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Event</div>
                          <div>{selectedPhoto.eventName}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
