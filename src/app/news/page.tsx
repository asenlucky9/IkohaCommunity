'use client'

import { useState, useEffect } from 'react'
import { Newspaper, Calendar, Tag, ArrowRight, Clock, User, Search, ChevronLeft, ChevronRight, Plus, Bell, CheckCircle, X, MapPin, Users } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { NewsArticle } from '@/app/api/news/route'
import { motion, AnimatePresence } from 'framer-motion'

interface Event {
  id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  location: string
  type: 'meeting' | 'festival' | 'workshop' | 'celebration' | 'other'
  organizer: string
  capacity?: number
  registeredCount?: number
  isRegistered?: boolean
  imageUrl?: string
}

const categories = [
  { id: 'all', label: 'All News', icon: Newspaper },
  { id: 'announcements', label: 'Announcements', icon: Tag },
  { id: 'development', label: 'Development', icon: Calendar },
  { id: 'minerals', label: 'Minerals', icon: Tag },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'general', label: 'General', icon: Newspaper },
]

// Sample events data (replace with API fetch)
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Ikoha Annual Festival 2025',
    description: 'Ikoha Community celebrates its annual cultural festival every January, with the main celebration held on the 1st of January each year. The festival brings together indigenes, residents, and visitors to celebrate unity, culture, tradition, and community development.',
    startDate: '2025-01-01T09:00:00Z',
    endDate: '2025-01-01T18:00:00Z',
    location: 'Ikoha Community, Ovia South-West, Edo State',
    type: 'festival',
    organizer: 'Festival Committee',
    capacity: 500,
    registeredCount: 234,
    imageUrl: '/images/logo/communitypicwithpeople.png',
  },
  {
    id: '2',
    title: 'Community Development Meeting',
    description: 'Monthly community development meeting to discuss ongoing projects and new initiatives.',
    startDate: '2025-01-15T10:00:00Z',
    endDate: '2025-01-15T12:00:00Z',
    location: 'Community Hall, Ikoha',
    type: 'meeting',
    organizer: 'Community Council',
    capacity: 100,
    registeredCount: 45,
  },
  {
    id: '3',
    title: 'Agricultural Workshop',
    description: 'Workshop on modern farming techniques and sustainable agriculture practices.',
    startDate: '2025-02-05T09:00:00Z',
    endDate: '2025-02-05T16:00:00Z',
    location: 'Agricultural Center, Ikoha',
    type: 'workshop',
    organizer: 'Agriculture Department',
    capacity: 50,
    registeredCount: 32,
  },
  {
    id: '4',
    title: 'Youth Empowerment Program',
    description: 'Program focused on empowering young people through skills training and mentorship.',
    startDate: '2025-02-20T10:00:00Z',
    endDate: '2025-02-20T15:00:00Z',
    location: 'Youth Center, Ikoha',
    type: 'workshop',
    organizer: 'Youth Development Committee',
    capacity: 75,
    registeredCount: 28,
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })
  
  // Events state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [reminderDays, setReminderDays] = useState(1)

  useEffect(() => {
    // If Events category is selected, don't fetch news
    if (selectedCategory === 'events') {
      setLoading(false)
      return
    }

    const fetchNews = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          category: selectedCategory === 'all' ? '' : selectedCategory,
          search: searchQuery,
          page: page.toString(),
          limit: '6',
        })

        const response = await fetch(`/api/news?${params}`)
        if (!response.ok) throw new Error('Failed to fetch news')

        const data = await response.json()
        setArticles(data.articles || [])
        setPagination(data.pagination || {
          total: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        })
      } catch (error) {
        console.error('Error fetching news:', error)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [selectedCategory, searchQuery, page])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date not available'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(dateString)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      announcements: 'bg-accent/10 text-accent border-accent/20',
      development: 'bg-primary/10 text-primary border-primary/20',
      minerals: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      events: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      general: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[category] || colors.general
  }

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      festival: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      meeting: 'bg-primary/10 text-primary border-primary/20',
      workshop: 'bg-accent/10 text-accent border-accent/20',
      celebration: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      other: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[type] || colors.other
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split('T')[0]
      return eventDate === dateStr
    })
  }

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setShowRegistrationModal(true)
  }

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      alert(`Registration successful! You've been registered for ${selectedEvent?.title}`)
      setShowRegistrationModal(false)
      setRegistrationData({ name: '', email: '', phone: '' })
    }, 500)
  }

  const handleSetReminder = (event: Event) => {
    setSelectedEvent(event)
    setShowReminderModal(true)
  }

  const handleSubmitReminder = async (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      alert(`Reminder set! You'll receive a reminder ${reminderDays} day(s) before ${selectedEvent?.title}`)
      setShowReminderModal(false)
      setReminderDays(1)
    }, 500)
  }

  const upcomingEvents = sampleEvents
    .filter(event => new Date(event.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="News & Events"
        description="Stay informed about the latest news, announcements, events, and developments in Ikoha Community."
        icon={<Newspaper className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Search Bar */}
        {selectedCategory !== 'events' && (
          <div className="mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news articles..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </form>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setPage(1)
                  }}
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

        {/* Events View */}
        {selectedCategory === 'events' && (
          <>
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Events</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  aria-label="Switch to calendar view"
                  title="Calendar view"
                >
                  Calendar View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  aria-label="Switch to list view"
                  title="List view"
                >
                  List View
                </button>
              </div>
            </div>

            {/* Calendar View */}
            {viewMode === 'calendar' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
                        date.setDate(date.getDate() - date.getDay() + i)
                        const isCurrentMonth = date.getMonth() === selectedDate.getMonth()
                        const isToday = date.toDateString() === new Date().toDateString()
                        const isSelected = date.toDateString() === selectedDate.toDateString()
                        const hasEvents = getEventsForDate(date).length > 0

                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date)}
                            title={`Select ${date.toLocaleDateString()}`}
                            aria-label={`Select date ${date.toLocaleDateString()}`}
                            className={`
                              aspect-square p-2 rounded-lg text-sm transition-all
                              ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                              ${isToday ? 'bg-primary text-white font-bold' : ''}
                              ${isSelected && !isToday ? 'bg-primary/20 text-primary font-semibold' : ''}
                              ${hasEvents && isCurrentMonth && !isToday ? 'bg-secondary/10' : ''}
                              hover:bg-gray-100
                            `}
                          >
                            <div className="flex flex-col items-center">
                              <span>{date.getDate()}</span>
                              {hasEvents && isCurrentMonth && (
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1" />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </Card>
                </div>

                {/* Selected Date Events */}
                <div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {formatDate(selectedDate.toISOString())}
                    </h3>
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-3">
                        {selectedDateEvents.map(event => (
                          <div
                            key={event.id}
                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getEventTypeColor(event.type)}`}>
                                {event.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(event.startDate)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No events scheduled for this date.</p>
                    )}
                  </Card>
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="p-6 hover:shadow-lg transition-all">
                    {event.imageUrl && (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold border mb-2 ${getEventTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(event.startDate)} {event.endDate && `- ${formatTime(event.endDate)}`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.registeredCount || 0} / {event.capacity} registered</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRegister(event)}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm"
                        aria-label={event.isRegistered ? 'Already registered' : `Register for ${event.title}`}
                        title={event.isRegistered ? 'Already registered' : `Register for ${event.title}`}
                      >
                        {event.isRegistered ? (
                          <>
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Registered
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 inline mr-1" />
                            Register
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleSetReminder(event)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                        title="Set reminder for this event"
                        aria-label="Set reminder for this event"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Featured Annual Festival */}
            <section className="mb-10">
              <Card className="p-6 sm:p-8 border-2 border-secondary bg-gradient-to-br from-secondary-light to-white">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-secondary-dark mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Ikoha Annual Festival</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Festival Details</h3>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <strong>Date:</strong> January 1st every year
                      </div>
                      <div>
                        <strong>Location:</strong> Ikoha Community, Ovia South-West, Edo State
                      </div>
                      <div>
                        <strong>Description:</strong> Annual cultural celebration bringing together indigenes, residents, and visitors.
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Traditional dance performances</li>
                      <li>• Cultural exhibitions</li>
                      <li>• Local food vendors</li>
                      <li>• Community games and competitions</li>
                      <li>• Musical performances</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </>
        )}

        {/* News Articles View */}
        {selectedCategory !== 'events' && (
          <>
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin-slow" />
                <p className="mt-3 text-gray-600">Loading news...</p>
              </div>
            )}

            {/* News Articles Grid */}
            {!loading && articles.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                  {articles.map((article) => (
                    <Card key={article.id} className="p-5 sm:p-6 flex flex-col hover:scale-[1.02] transition-transform duration-300">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(article.category)}`}>
                          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Article Excerpt */}
                      <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDate(article.publishedAt)}</span>
                            </div>
                          </div>
                          {article.viewsCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{article.viewsCount}</span>
                            </div>
                          )}
                        </div>

                        {/* Read More Link */}
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group mt-2"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={!pagination.hasPrevPage}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${pagination.hasPrevPage
                          ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        }
                      `}
                      aria-label="Previous page"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Page {page} of {pagination.totalPages}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {pagination.total} articles
                      </span>
                    </div>

                    <button
                      onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                      disabled={!pagination.hasNextPage}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${pagination.hasNextPage
                          ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        }
                      `}
                      aria-label="Next page"
                      title="Next page"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No news found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your search or category filter.'
                    : 'Check back soon for the latest updates.'}
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                      setPage(1)
                    }}
                    className="text-primary hover:text-primary-dark font-semibold"
                    aria-label="Clear search and category filters"
                    title="Clear filters"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 bg-primary text-white rounded-lg p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Get the latest updates and announcements from Ikoha Community delivered to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            {selectedCategory !== 'events' && (
              <button
                onClick={() => setSelectedCategory('events')}
                className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors"
                aria-label="View events"
                title="View events"
              >
                View Events
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistrationModal && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Register for Event</h3>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close registration modal"
                  title="Close registration"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedEvent.title}</p>
              <form onSubmit={handleSubmitRegistration}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="reg-name" className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      aria-label="Full name for event registration"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-email" className="block text-sm font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      aria-label="Email address for event registration"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      aria-label="Phone number for event registration (optional)"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    aria-label="Cancel registration"
                    title="Cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                    aria-label="Submit registration"
                    title="Register"
                  >
                    Register
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reminder Modal */}
      <AnimatePresence>
        {showReminderModal && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Set Event Reminder</h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close reminder modal"
                  title="Close reminder"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedEvent.title}</p>
              <form onSubmit={handleSubmitReminder}>
                <div className="mb-4">
                  <label htmlFor="reminder-days" className="block text-sm font-semibold text-gray-700 mb-2">
                    Remind me before event
                  </label>
                  <select
                    id="reminder-days"
                    value={reminderDays}
                    onChange={(e) => setReminderDays(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    aria-label="Select reminder days before event"
                  >
                    <option value={1}>1 day before</option>
                    <option value={2}>2 days before</option>
                    <option value={3}>3 days before</option>
                    <option value={7}>1 week before</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="reminder-email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="reminder-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    aria-label="Email address for event reminder"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    aria-label="Cancel reminder"
                    title="Cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                    aria-label="Set reminder"
                    title="Set Reminder"
                  >
                    Set Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
