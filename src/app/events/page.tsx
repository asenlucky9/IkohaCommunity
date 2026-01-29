'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Users, Plus, Bell, CheckCircle, X } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
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

export default function EventsPage() {
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

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split('T')[0]
      return eventDate === dateStr
    })
  }

  const getEventsForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.startDate)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
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

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setShowRegistrationModal(true)
  }

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      alert(`Registration successful! You've been registered for ${selectedEvent?.title}`)
      setShowRegistrationModal(false)
      setRegistrationData({ name: '', email: '', phone: '' })
      // Update event registration count
      if (selectedEvent) {
        const updatedEvent = { ...selectedEvent, isRegistered: true, registeredCount: (selectedEvent.registeredCount || 0) + 1 }
        // Update in state
      }
    }, 500)
  }

  const handleSetReminder = (event: Event) => {
    setSelectedEvent(event)
    setShowReminderModal(true)
  }

  const handleSubmitReminder = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
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
        title="Events & Festivals"
        description="Join us in celebrating our culture, traditions, and community spirit. Register for events and set reminders."
        icon={<Calendar className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              aria-label="Switch to calendar view"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
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
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
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
    </div>
  )
}
