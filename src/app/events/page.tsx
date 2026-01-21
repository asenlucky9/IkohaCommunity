import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default function EventsPage() {
  const annualFestival = {
    title: 'Ikoha Annual Festival',
    month: 'January',
    fixedDate: '1st of January',
    period: 'The celebration continues within the month of January',
    description: 'Ikoha Community celebrates its annual cultural festival every January, with the main celebration held on the 1st of January each year. The festival brings together indigenes, residents, and visitors to celebrate unity, culture, tradition, and community development.',
    location: 'Ikoha Community, Ovia South-West, Edo State',
    type: 'Cultural Festival',
  }

  const upcomingEvents = [
    {
      title: 'Ikoha Annual Festival 2025',
      date: 'January 1, 2025',
      location: 'Ikoha Community',
      type: 'Festival',
      description: 'Annual cultural celebration',
    },
  ]

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-primary">
            Events & Festivals
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-1">
            Join us in celebrating our culture, traditions, and community spirit
          </p>
        </div>

        {/* Annual Festival - Featured */}
        <section className="mb-10 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-5 sm:mb-8">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-secondary sm:mr-3 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Ikoha Annual Festival</h2>
          </div>

          <Card className="p-5 sm:p-6 md:p-8 border-2 border-secondary bg-gradient-to-br from-secondary-light to-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              {/* Festival Details */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-secondary bg-opacity-20 p-3 rounded-lg mr-4">
                    <Calendar className="w-8 h-8 text-secondary-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {annualFestival.title}
                    </h3>
                    <p className="text-gray-600">{annualFestival.type}</p>
                  </div>
                </div>

                {/* Festival Period */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Festival Period</p>
                      <p className="text-gray-700">
                        <strong>Month:</strong> {annualFestival.month}
                      </p>
                      <p className="text-gray-700">
                        <strong>Fixed Date:</strong> {annualFestival.fixedDate} every year
                      </p>
                      <p className="text-gray-700 text-sm mt-2">
                        {annualFestival.period}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Location</p>
                      <p className="text-gray-700">{annualFestival.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Festival Description */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Festival Description</h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {annualFestival.description}
                </p>
                <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-secondary border-opacity-20">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-secondary mr-2" />
                    <p className="font-semibold text-gray-900">Who Attends</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Indigenes, residents, and visitors from across the region come together 
                    to celebrate unity, culture, tradition, and community development.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Clock className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-primary">Upcoming Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      <span className="text-xs px-2 py-1 bg-primary-light bg-opacity-20 text-primary rounded">
                        {event.type}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3">{event.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us for the Next Celebration</h2>
          <p className="text-lg mb-6 text-white/90">
            Experience the rich culture and traditions of Ikoha Community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors"
            >
              View News
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
